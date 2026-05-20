"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { CalendarCheck, CheckCircle2, MapPin, Phone, ShieldCheck, Star } from "lucide-react";
import { business, trustItems } from "@/lib/content";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

export function Hero() {
  return (
    <section className="hero-surface relative overflow-hidden pt-[calc(var(--header-height)+34px)] text-white md:pt-[calc(var(--header-height)+64px)]">
      <div className="container-page relative grid min-h-[760px] items-center gap-10 pb-24 md:grid-cols-[0.94fr_1.06fr] md:pb-32">
        <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: 0.08 }}>
          <motion.p variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold text-orange-100 backdrop-blur">
            <MapPin aria-hidden="true" className="size-4" />
            Автосервис в Химках • ул. Репина, 1
          </motion.p>

          <motion.h1 variants={fadeUp} className="mt-7 max-w-4xl text-4xl font-black leading-[1.02] tracking-normal md:text-7xl">
            Диагностика, ТО и ремонт автомобиля в Химках
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 md:text-xl">
            Запишитесь в Автосервис-гараж: проверим проблему, согласуем стоимость до начала работ и подскажем
            оптимальное решение по ремонту.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 grid gap-2 sm:grid-cols-2">
            {trustItems.map((item, index) => (
              <div
                key={item}
                className={`flex min-h-14 items-center gap-3 border border-white/10 bg-white/[0.08] px-4 text-sm font-semibold text-white backdrop-blur ${
                  index === 0 ? "rounded-tl-3xl rounded-tr-lg" : ""
                } ${index === 1 ? "rounded-tr-3xl" : ""} ${index === 3 ? "rounded-bl-3xl" : ""} ${
                  index === 4 ? "rounded-br-3xl" : "rounded-xl"
                }`}
              >
                <CheckCircle2 aria-hidden="true" className="size-5 shrink-0 text-orange-300" />
                <span>{item}</span>
              </div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-flame px-7 text-base font-black text-white shadow-glow transition hover:bg-orange-600 focus-ring"
              href="#lead"
            >
              <CalendarCheck aria-hidden="true" className="size-5" />
              Записаться на ремонт
            </a>
            <a
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 text-base font-bold text-white transition hover:bg-white/20 focus-ring"
              href={business.telLinks[0]}
            >
              <Phone aria-hidden="true" className="size-5" />
              Позвонить в сервис
            </a>
          </motion.div>

          <motion.p variants={fadeUp} className="mt-4 text-sm leading-6 text-slate-300">
            Ответим по телефону и подскажем ориентировочную стоимость по вашей ситуации.
          </motion.p>
        </motion.div>

        <motion.div
          aria-label="Сгенерированное изображение современной автомастерской"
          className="relative"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.12 }}
        >
          <div className="bolt-corners relative mx-auto w-full max-w-[560px] overflow-hidden rounded-[2.2rem] border border-white/20 bg-slate-950/60 p-3 shadow-[0_34px_110px_rgba(0,0,0,0.42)]">
            <div className="relative aspect-[5/6] overflow-hidden rounded-[1.65rem] bg-slate-900 sm:aspect-[6/7] lg:aspect-[5/6]">
              <Image
                src="/images/hero-garage.png"
                alt="Сгенерированная сцена автосервиса с автомобилем на подъемнике"
                fill
                priority
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 grid gap-3 sm:grid-cols-3">
                <HeroMetric icon={<Star aria-hidden="true" className="size-4 fill-current" />} label="Яндекс" value={`${business.rating} из 5`} />
                <HeroMetric label="Оценок" value={`${business.ratingCount}`} />
                <HeroMetric icon={<ShieldCheck aria-hidden="true" className="size-4" />} label="Работы" value="по записи" />
              </div>
            </div>
          </div>
          <div className="absolute -bottom-6 -left-4 hidden rounded-3xl border border-slate-200 bg-white p-5 text-slate-900 shadow-soft md:block">
            <p className="text-sm font-semibold text-slate-500">Адрес сервиса</p>
            <p className="mt-1 font-black">{business.address}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function HeroMetric({ icon, label, value }: { icon?: ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/20 bg-slate-950/60 p-3 text-white backdrop-blur">
      <p className="flex items-center gap-2 text-xs font-semibold text-slate-300">
        {icon}
        {label}
      </p>
      <p className="mt-1 text-lg font-black">{value}</p>
    </div>
  );
}
