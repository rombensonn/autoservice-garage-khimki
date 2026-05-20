import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkRateLimit } from "@/lib/rateLimit";
import { sendEmailLead } from "@/lib/emailNotifier";
import { sendSmsLead } from "@/lib/smsNotifier";
import { sendTelegramLead } from "@/lib/telegramNotifier";
import { leadPayloadSchema } from "@/lib/validators";

export const runtime = "nodejs";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const rateLimit = checkRateLimit(ip, {
    windowMs: RATE_LIMIT_WINDOW_MS,
    max: RATE_LIMIT_MAX,
  });

  if (!rateLimit.ok) {
    return NextResponse.json(
      { ok: false, message: "Слишком много заявок. Попробуйте позже." },
      {
        status: 429,
        headers: { "Retry-After": String(rateLimit.retryAfter) },
      },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Некорректный JSON." }, { status: 400 });
  }

  const parsed = leadPayloadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        message: "Проверьте поля формы.",
        errors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const data = parsed.data;

  if (data.website) {
    return NextResponse.json({ ok: false, message: "Заявка не принята." }, { status: 400 });
  }

  try {
    const lead = await prisma.lead.create({
      data: {
        name: normalizeOptional(data.name),
        phone: data.phone,
        car: normalizeOptional(data.car),
        service: data.service,
        message: normalizeOptional(data.message),
        preferredContact: data.preferredContact,
        consentPersonalData: data.consentPersonalData,
        consentPrivacyPolicy: data.consentPrivacyPolicy,
        utmSource: normalizeOptional(data.utmSource),
        utmMedium: normalizeOptional(data.utmMedium),
        utmCampaign: normalizeOptional(data.utmCampaign),
        pageUrl: normalizeOptional(data.pageUrl),
        ip,
        userAgent: request.headers.get("user-agent"),
      },
    });

    const notificationResults = await Promise.allSettled([
      sendTelegramLead(lead),
      sendEmailLead(lead),
      sendSmsLead(lead),
    ]);

    for (const result of notificationResults) {
      if (result.status === "rejected") {
        console.error("Lead notification failed:", result.reason);
      }
    }

    return NextResponse.json({
      ok: true,
      message: "Заявка отправлена. Мы свяжемся с вами по указанному номеру.",
    });
  } catch (error) {
    console.error("Lead creation failed:", error);
    return NextResponse.json(
      { ok: false, message: "Не удалось отправить заявку. Позвоните в сервис или попробуйте позже." },
      { status: 500 },
    );
  }
}

function normalizeOptional(value: string | undefined | null) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

function getClientIp(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return realIp ?? "unknown";
}
