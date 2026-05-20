import Link from "next/link";
import { MapPin, Phone, Wrench } from "lucide-react";
import { business } from "@/lib/content";

const nav = [
  { label: "Услуги", href: "#services" },
  { label: "Цены", href: "#prices" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Контакты", href: "#contacts" },
];

export function Header() {
  return (
    <header className="site-header fixed inset-x-0 top-0 z-50 text-white">
      <a className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-xl focus:bg-white focus:px-4 focus:py-2 focus:text-slate-900" href="#main">
        Перейти к содержимому
      </a>
      <div className="container-page relative flex h-[var(--header-height)] items-center gap-3">
        <Link aria-label="Автосервис-гараж - на главную" className="brand-chip group flex min-w-0 items-center gap-3 focus-ring" href="/">
          <span className="brand-chip-icon grid size-11 place-items-center rounded-full text-white">
            <Wrench aria-hidden="true" className="size-5" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-base font-bold leading-tight">{business.name}</span>
            <span className="mt-0.5 flex items-center gap-1 text-xs text-slate-300 transition group-hover:text-orange-100">
              <MapPin aria-hidden="true" className="size-3.5" />
              ул. Репина, 1
            </span>
          </span>
        </Link>

        <nav aria-label="Основная навигация" className="nav-dock mx-auto hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <a key={item.href} className="nav-dock-link focus-ring" href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <a
            className="header-phone hidden min-h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold text-white focus-ring md:inline-flex"
            href={business.telLinks[0]}
          >
            <Phone aria-hidden="true" className="size-4 text-orange-200" />
            {business.phones[0]}
          </a>
          <a
            className="header-cta inline-flex min-h-11 items-center rounded-full px-5 text-sm font-black text-white focus-ring"
            href="#lead"
          >
            Записаться
          </a>
        </div>
      </div>
    </header>
  );
}
