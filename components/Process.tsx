"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { processSteps } from "@/lib/content";

export function Process() {
  const shouldReduceMotion = useReducedMotion();

  const listVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.18,
        delayChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  const stepVariants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 34, y: 12, scale: 0.98 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.46,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="bg-[#f6f8fb] py-16 md:py-24" id="process">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          <Reveal direction="left">
            <p className="section-kicker">Как проходит обращение</p>
            <h2 className="mt-4 text-3xl font-black tracking-normal text-ink md:text-5xl">Без ремонта вслепую</h2>
            <p className="mt-5 leading-8 text-slate-600">
              Сначала задача и диагностика, потом согласование стоимости и сроков. Это снижает риск неприятных сюрпризов.
            </p>
          </Reveal>

          <div className="relative">
            <motion.div
              aria-hidden="true"
              className="absolute left-5 top-6 hidden h-[calc(100%-48px)] w-px origin-top bg-slate-300 md:block"
              initial={shouldReduceMotion ? false : { scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: shouldReduceMotion ? 0.01 : 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.div
              className="grid gap-4"
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.32 }}
            >
              {processSteps.map((step, index) => (
                <motion.article key={step.title} className="industrial-panel relative rounded-[1.6rem] p-5 md:ml-10 md:p-6" variants={stepVariants}>
                  <motion.span
                    className="absolute -left-10 top-6 hidden size-11 place-items-center rounded-full border-4 border-[#f6f8fb] bg-slate-950 text-sm font-black text-orange-300 md:grid"
                    initial={shouldReduceMotion ? false : { scale: 0.72, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: shouldReduceMotion ? 0.01 : 0.34, delay: shouldReduceMotion ? 0 : index * 0.18 + 0.14, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {index + 1}
                  </motion.span>
                  <div className="flex gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-slate-950 text-sm font-black text-orange-300 md:hidden">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="text-xl font-black text-ink">{step.title}</h3>
                      <p className="mt-2 leading-7 text-slate-600">{step.text}</p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
