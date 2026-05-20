"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2, Send } from "lucide-react";
import { useForm, type UseFormRegisterReturn } from "react-hook-form";
import { RevealGroup, RevealItem } from "@/components/Reveal";
import { leadPayloadSchema, leadServiceOptions, preferredContactLabels, preferredContactOptions, type LeadPayload } from "@/lib/validators";

const defaultValues: LeadPayload = {
  name: "",
  phone: "",
  car: "",
  service: "Диагностика",
  message: "",
  preferredContact: "call",
  consentPersonalData: false,
  consentPrivacyPolicy: false,
  utmSource: "",
  utmMedium: "",
  utmCampaign: "",
  pageUrl: "",
  website: "",
};

type SubmitState =
  | { status: "idle"; message: "" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

export function LeadFormSection() {
  return (
    <section className="dark-workshop py-16 text-white md:py-24" id="lead">
      <RevealGroup className="container-page grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-start" stagger={0.14}>
        <RevealItem className="lg:sticky lg:top-28" direction="left">
          <p className="section-kicker text-orange-300">Запись</p>
          <h2 className="mt-4 text-3xl font-black tracking-normal md:text-5xl">Опишите проблему - подскажем, с чего начать</h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            Оставьте номер телефона, марку автомобиля и краткое описание неисправности. Мастер свяжется с вами и
            подскажет следующий шаг.
          </p>
          <div className="bolt-corners relative mt-8 rounded-[1.7rem] border border-white/10 bg-white/[0.06] p-6">
            <p className="font-black text-white">Что происходит после отправки</p>
            <RevealGroup as="ul" className="mt-4 space-y-3 text-sm leading-6 text-slate-300" stagger={0.08}>
              <RevealItem as="li" className="flex gap-3">
                <CheckCircle2 aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-orange-300" />
                Заявка сохраняется в базе сайта.
              </RevealItem>
              <RevealItem as="li" className="flex gap-3">
                <CheckCircle2 aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-orange-300" />
                Если уведомления настроены, владелец получает сообщение в Telegram, email или SMS.
              </RevealItem>
              <RevealItem as="li" className="flex gap-3">
                <CheckCircle2 aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-orange-300" />
                Стоимость работ согласуется до начала ремонта.
              </RevealItem>
            </RevealGroup>
          </div>
        </RevealItem>

        <RevealItem direction="right">
          <LeadForm />
        </RevealItem>
      </RevealGroup>
    </section>
  );
}

function LeadForm() {
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle", message: "" });
  const {
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
  } = useForm<LeadPayload>({
    resolver: zodResolver(leadPayloadSchema),
    defaultValues,
    mode: "onChange",
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setValue("utmSource", params.get("utm_source") ?? "");
    setValue("utmMedium", params.get("utm_medium") ?? "");
    setValue("utmCampaign", params.get("utm_campaign") ?? "");
    setValue("pageUrl", window.location.href);
  }, [setValue]);

  const consentPersonalData = watch("consentPersonalData");
  const consentPrivacyPolicy = watch("consentPrivacyPolicy");
  const submitDisabled = isSubmitting || !consentPersonalData || !consentPrivacyPolicy || !isValid;

  const onSubmit = async (values: LeadPayload) => {
    setSubmitState({ status: "idle", message: "" });

    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const result = (await response.json()) as { ok?: boolean; message?: string };

    if (!response.ok || !result.ok) {
      setSubmitState({
        status: "error",
        message: result.message ?? "Не удалось отправить заявку. Позвоните в сервис или попробуйте позже.",
      });
      return;
    }

    setSubmitState({
      status: "success",
      message: result.message ?? "Заявка отправлена. Мы свяжемся с вами по указанному номеру.",
    });
    reset({ ...defaultValues, pageUrl: window.location.href });
  };

  const contactOptions = useMemo(
    () =>
      preferredContactOptions.map((value) => ({
        value,
        label: preferredContactLabels[value],
      })),
    [],
  );

  return (
    <form className="industrial-panel rounded-[2rem] p-5 text-slate-900 md:p-8" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Имя" error={errors.name?.message}>
          <input
            className="min-h-12 w-full rounded-2xl border border-slate-200 bg-white/90 px-4 text-base text-ink outline-none transition focus:border-flame focus:ring-4 focus:ring-orange-100"
            placeholder="Как к вам обращаться"
            type="text"
            {...register("name")}
          />
        </Field>

        <Field label="Телефон *" error={errors.phone?.message}>
          <input
            autoComplete="tel"
            className="min-h-12 w-full rounded-2xl border border-slate-200 bg-white/90 px-4 text-base text-ink outline-none transition focus:border-flame focus:ring-4 focus:ring-orange-100"
            inputMode="tel"
            placeholder="+7 (___) ___-__-__"
            type="tel"
            {...register("phone")}
          />
        </Field>

        <Field label="Марка и модель автомобиля" error={errors.car?.message}>
          <input
            className="min-h-12 w-full rounded-2xl border border-slate-200 bg-white/90 px-4 text-base text-ink outline-none transition focus:border-flame focus:ring-4 focus:ring-orange-100"
            placeholder="Например, ŠKODA Octavia"
            type="text"
            {...register("car")}
          />
        </Field>

        <Field label="Услуга" error={errors.service?.message}>
          <select
            className="min-h-12 w-full rounded-2xl border border-slate-200 bg-white/90 px-4 text-base text-ink outline-none transition focus:border-flame focus:ring-4 focus:ring-orange-100"
            {...register("service")}
          >
            {leadServiceOptions.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field className="mt-5" label="Комментарий" error={errors.message?.message}>
        <textarea
          className="min-h-32 w-full resize-y rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-base text-ink outline-none transition focus:border-flame focus:ring-4 focus:ring-orange-100"
          placeholder="Что случилось, когда удобно приехать, есть ли срочность"
          {...register("message")}
        />
      </Field>

      <div className="mt-5">
        <p className="text-sm font-semibold text-ink">Удобный способ связи</p>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {contactOptions.map((option) => (
            <label key={option.value} className="flex min-h-12 cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 bg-white/70 px-4 text-sm font-bold transition has-[:checked]:border-flame has-[:checked]:bg-orange-50">
              <input className="size-4 accent-blue-600" type="radio" value={option.value} {...register("preferredContact")} />
              {option.label}
            </label>
          ))}
        </div>
      </div>

      <input aria-hidden="true" className="hidden" tabIndex={-1} type="text" {...register("website")} />
      <input type="hidden" {...register("utmSource")} />
      <input type="hidden" {...register("utmMedium")} />
      <input type="hidden" {...register("utmCampaign")} />
      <input type="hidden" {...register("pageUrl")} />

      <div className="mt-6 space-y-3">
        <ConsentCheckbox error={errors.consentPersonalData?.message} registerReturn={register("consentPersonalData")}>
          Я даю согласие на{" "}
          <Link className="font-semibold text-signal hover:text-blue-700" href="/personal-data-consent" target="_blank">
            обработку персональных данных
          </Link>
          .
        </ConsentCheckbox>

        <ConsentCheckbox error={errors.consentPrivacyPolicy?.message} registerReturn={register("consentPrivacyPolicy")}>
          Я согласен с{" "}
          <Link className="font-semibold text-signal hover:text-blue-700" href="/privacy" target="_blank">
            политикой обработки персональных данных
          </Link>
          .
        </ConsentCheckbox>
      </div>

      {submitState.status !== "idle" ? (
        <div
          className={`mt-5 flex gap-3 rounded-2xl p-4 text-sm font-semibold ${
            submitState.status === "success" ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-800"
          }`}
          role={submitState.status === "success" ? "status" : "alert"}
        >
          {submitState.status === "success" ? <CheckCircle2 aria-hidden="true" className="size-5 shrink-0" /> : <AlertCircle aria-hidden="true" className="size-5 shrink-0" />}
          {submitState.message}
        </div>
      ) : null}

      <button
        className="mt-6 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-flame px-6 text-base font-black text-white shadow-glow transition hover:bg-orange-600 focus-ring disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none"
        disabled={submitDisabled}
        type="submit"
      >
        <Send aria-hidden="true" className="size-5" />
        {isSubmitting ? "Отправляем..." : "Отправить заявку"}
      </button>
    </form>
  );
}

type FieldProps = {
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
};

function Field({ label, error, className = "", children }: FieldProps) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-sm font-black text-ink">{label}</span>
      {children}
      {error ? <span className="mt-2 block text-sm font-semibold text-red-600">{error}</span> : null}
    </label>
  );
}

type ConsentCheckboxProps = {
  error?: string;
  registerReturn: UseFormRegisterReturn;
  children: React.ReactNode;
};

function ConsentCheckbox({ children, error, registerReturn }: ConsentCheckboxProps) {
  return (
    <label className="flex cursor-pointer gap-3 rounded-2xl border border-slate-200 bg-white/70 p-4 text-sm leading-6 text-slate-700">
      <input className="mt-1 size-4 shrink-0 accent-blue-600" type="checkbox" {...registerReturn} />
      <span>
        {children}
        {error ? <span className="mt-1 block font-semibold text-red-600">{error}</span> : null}
      </span>
    </label>
  );
}
