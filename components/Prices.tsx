"use client";

import { useMemo, useState } from "react";
import { Info } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/Reveal";
import { priceCategories, prices, type PriceCategory } from "@/lib/content";

export function Prices() {
  const [activeCategory, setActiveCategory] = useState<PriceCategory>("Все");
  const visiblePrices = useMemo(
    () => prices.filter((item) => activeCategory === "Все" || item.category === activeCategory),
    [activeCategory],
  );

  return (
    <section className="dark-workshop diagonal-split py-16 text-white md:py-24" id="prices">
      <div className="container-page">
        <RevealGroup className="grid min-w-0 gap-9 lg:grid-cols-[0.75fr_1.25fr] lg:items-start" stagger={0.14}>
          <RevealItem className="min-w-0 lg:sticky lg:top-28" direction="left">
            <p className="section-kicker text-orange-300">Цены</p>
            <h2 className="mt-4 text-3xl font-black tracking-normal md:text-5xl">Ориентиры по базовым работам</h2>
            <div className="mt-7 rounded-[1.6rem] border border-orange-300/20 bg-orange-400/10 p-5 text-orange-50">
              <div className="flex gap-3">
                <Info aria-hidden="true" className="mt-1 size-5 shrink-0 text-orange-300" />
                <p className="leading-7">
                  Цены указаны как ориентир. Итоговая стоимость зависит от марки автомобиля, сложности доступа,
                  состояния деталей и необходимости запчастей. Перед началом работ стоимость согласуется с клиентом.
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-300">
              Точную стоимость мастер согласует после осмотра или диагностики. Работы начинаются только после согласования.
            </p>
          </RevealItem>

          <RevealItem className="min-w-0" direction="right">
            <RevealGroup aria-label="Фильтр категорий цен" className="price-scrollbar flex max-w-full gap-2 overflow-x-auto pb-3" role="tablist" stagger={0.04}>
              {priceCategories.map((category) => (
                <RevealItem key={category} className="shrink-0">
                  <button
                    aria-selected={activeCategory === category}
                    className={`min-h-11 rounded-full border px-4 text-sm font-black transition focus-ring ${
                      activeCategory === category
                        ? "border-orange-300 bg-flame text-white shadow-glow"
                        : "border-white/20 bg-white/[0.08] text-slate-100 hover:bg-white/[0.14]"
                    }`}
                    onClick={() => setActiveCategory(category)}
                    role="tab"
                    type="button"
                  >
                    {category}
                  </button>
                </RevealItem>
              ))}
            </RevealGroup>

            <RevealItem className="mt-4 hidden overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/[0.06] shadow-[0_24px_80px_rgba(0,0,0,0.22)] backdrop-blur md:block">
              <table className="w-full border-collapse text-left">
                <thead className="bg-white/[0.08] text-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-sm font-black">Услуга</th>
                    <th className="px-6 py-4 text-sm font-black">Категория</th>
                    <th className="px-6 py-4 text-sm font-black">Стоимость</th>
                  </tr>
                </thead>
                <tbody>
                  {visiblePrices.map((item) => (
                    <tr key={`${item.category}-${item.service}`} className="border-b border-white/10 last:border-0">
                      <td className="px-6 py-4 font-bold text-white">
                        {item.service}
                        {item.note ? <span className="ml-2 text-sm font-normal text-slate-300">({item.note})</span> : null}
                      </td>
                      <td className="px-6 py-4 text-slate-300">{item.category}</td>
                      <td className="px-6 py-4 font-black text-orange-200">{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </RevealItem>

            <RevealGroup className="mt-4 grid gap-3 md:hidden" stagger={0.06}>
              {visiblePrices.map((item) => (
                <RevealItem as="article" key={`${item.category}-${item.service}`} className="rounded-[1.4rem] border border-white/10 bg-white/[0.08] p-5 backdrop-blur">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="font-black text-white">{item.service}</h3>
                      <p className="mt-1 text-sm text-slate-300">{item.category}</p>
                      {item.note ? <p className="mt-1 text-sm text-slate-300">{item.note}</p> : null}
                    </div>
                    <p className="shrink-0 rounded-full bg-flame px-3 py-1 text-sm font-black text-white">{item.price}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
