import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { SiteChrome } from "@/components/SiteChrome";
import { business } from "@/lib/content";
import { getSiteUrl } from "@/lib/site";

const siteUrl = getSiteUrl();
const title = "Автосервис в Химках на ул. Репина, 1 — ремонт, диагностика и ТО автомобиля";
const description =
  "Автосервис-гараж в Химках: диагностика, ТО, замена масла, ремонт ходовой, тормозов, двигателя, КПП, автоэлектрики, кузовные и сварочные работы. Запись по телефону.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: business.name,
  icons: {
    icon: "/favicon.svg",
  },
  alternates: {
    canonical: siteUrl,
  },
  keywords: [
    "автосервис Химки",
    "автосервис на Репина Химки",
    "ремонт авто Химки",
    "автотехцентр Химки",
    "замена масла Химки",
    "диагностика авто Химки",
    "ремонт ходовой Химки",
    "ремонт тормозной системы Химки",
    "ремонт двигателя Химки",
    "шиномонтаж Химки",
  ],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: siteUrl,
    title,
    description,
    siteName: business.name,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0F172A",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
