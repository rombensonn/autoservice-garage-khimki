import Link from "next/link";
import { RevealGroup, RevealItem } from "@/components/Reveal";
import { business } from "@/lib/content";

export function Footer() {
  return (
    <footer className="bg-[#070b12] pb-28 pt-10 text-white md:pb-10">
      <RevealGroup className="container-page flex flex-col justify-between gap-8 md:flex-row md:items-start">
        <RevealItem>
          <p className="text-lg font-bold">{business.name}</p>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">
            Автосервис в Химках на ул. Репина, 1. Диагностика, ТО и ремонт автомобиля с предварительным согласованием стоимости.
          </p>
        </RevealItem>
        <RevealItem className="grid gap-2 text-sm text-slate-300">
          <Link className="hover:text-white" href="/privacy">
            Политика обработки персональных данных
          </Link>
          <Link className="hover:text-white" href="/personal-data-consent">
            Согласие на обработку персональных данных
          </Link>
          <a className="hover:text-white" href={business.yandexMapsUrl} rel="noreferrer" target="_blank">
            Карточка на Яндекс.Картах
          </a>
        </RevealItem>
      </RevealGroup>
    </footer>
  );
}
