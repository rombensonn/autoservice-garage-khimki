"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { carGroups } from "@/lib/content";

export function Cars() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-white py-16 md:py-24" id="cars">
      <div className="container-page">
        <Reveal className="industrial-panel overflow-hidden rounded-[2rem]">
          <RevealGroup className="grid lg:grid-cols-[0.82fr_1.18fr]" stagger={0.14}>
            <RevealItem className="bg-slate-950 p-6 text-white md:p-10" direction="left">
              <p className="section-kicker text-orange-300">Автомобили</p>
              <h2 className="mt-4 text-3xl font-black tracking-normal md:text-5xl">Работаем с разными марками</h2>
              <p className="mt-5 text-lg leading-8 text-slate-300">
                Работаем с российскими, европейскими, японскими, корейскими и китайскими автомобилями.
              </p>
              <p className="mt-5 leading-7 text-slate-400">
                Если вашей марки нет в списке, оставьте заявку - мастер подскажет, сможем ли помочь по вашей задаче.
              </p>
            </RevealItem>

            <RevealGroup className="grid gap-0 bg-white" stagger={0.08}>
              {carGroups.map((group, index) => {
                const isOpen = openIndex === index;
                const panelId = `car-brands-${index}`;

                return (
                  <RevealItem as="article" key={group.title} className="border-b border-slate-200 last:border-b-0" direction="right">
                    <button
                      className="flex min-h-20 w-full cursor-pointer items-center justify-between gap-4 p-5 text-left text-lg font-black text-ink transition-colors hover:bg-slate-50 focus-ring md:p-7"
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                    >
                      <span className="flex items-center gap-3">
                        <span className="font-mono text-sm text-flame">{String(index + 1).padStart(2, "0")}</span>
                        {group.title}
                      </span>
                      <ChevronDown aria-hidden="true" className={`size-5 shrink-0 text-slate-500 transition duration-300 ${isOpen ? "rotate-180" : ""}`} />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.div
                          id={panelId}
                          key={panelId}
                          initial={shouldReduceMotion ? false : { height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                          transition={{ duration: shouldReduceMotion ? 0.01 : 0.28, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-wrap gap-2 px-5 pb-5 md:px-7 md:pb-7">
                            {group.brands.map((brand) => (
                              <span key={brand} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-bold text-slate-700">
                                {brand}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </RevealGroup>
        </Reveal>
      </div>
    </section>
  );
}
