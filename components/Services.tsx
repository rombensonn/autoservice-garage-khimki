import { ArrowRight } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/Reveal";
import { services } from "@/lib/content";

export function Services() {
  return (
    <section className="bg-[#f6f8fb] py-16 md:py-24" id="services">
      <div className="container-page">
        <RevealGroup className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <RevealItem>
            <p className="section-kicker">Услуги</p>
            <h2 className="mt-4 text-3xl font-black tracking-normal text-ink md:text-5xl">Работы, с которыми чаще всего приезжают</h2>
          </RevealItem>
          <RevealItem className="max-w-3xl text-lg leading-8 text-slate-600 lg:justify-self-end">
            Беремся за диагностику, ТО, ходовую, тормоза, двигатель, КПП, электрику, кузовные и сварочные работы.
            По конкретной задаче мастер уточнит детали при записи.
          </RevealItem>
        </RevealGroup>

        <RevealGroup className="mt-12 grid gap-4 lg:grid-cols-4" stagger={0.07}>
          {services.map((service, index) => {
            const Icon = service.icon;
            const featured = index === 0 || index === 1 || index === 2;

            return (
              <RevealItem
                as="article"
                key={service.title}
                className={`group relative overflow-hidden border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft ${
                  featured ? "min-h-[320px] rounded-[2rem] lg:col-span-2" : "min-h-[260px] rounded-[1.4rem]"
                }`}
              >
                <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-flame via-signal to-transparent" />
                <span className="absolute right-5 top-5 font-mono text-5xl font-black text-slate-900/[0.045]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="relative flex h-full flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div className="grid size-12 place-items-center rounded-full bg-slate-950 text-orange-300 transition group-hover:bg-flame group-hover:text-white">
                      <Icon aria-hidden="true" className="size-6" />
                    </div>
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-black text-slate-800">
                      {service.price}
                    </span>
                  </div>
                  <h3 className="mt-8 text-2xl font-black leading-tight text-ink">{service.title}</h3>
                  <p className="mt-3 flex-1 leading-7 text-slate-600">{service.description}</p>
                  <a className="mt-6 inline-flex min-h-11 items-center gap-2 self-start rounded-full bg-slate-900 px-5 text-sm font-black text-white transition group-hover:bg-flame focus-ring" href="#lead">
                    Уточнить стоимость
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </a>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
