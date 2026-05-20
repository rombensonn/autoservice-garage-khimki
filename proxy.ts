import { NextResponse, type NextRequest } from "next/server";
import { isAdminAuthorized, isAdminConfigured } from "@/lib/auth";

export function proxy(request: NextRequest) {
  if (!isAdminConfigured()) {
    return new NextResponse("Админка не настроена: задайте ADMIN_LOGIN и ADMIN_PASSWORD.", {
      status: 503,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  if (!isAdminAuthorized(request.headers.get("authorization"))) {
    return new NextResponse("Требуется авторизация.", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Leads admin", charset="UTF-8"',
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
