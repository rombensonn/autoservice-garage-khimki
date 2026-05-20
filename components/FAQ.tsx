import { ChevronDown } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { amenities, faq } from "@/lib/content";

export function FAQ() {
  return (
    <section className="bg-white py-16 md:py-24" id="faq">
      <div className="container-page grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <p className="section-kicker">Удобства и FAQ</p>
          <h2 className="mt-4 text-3xl font-black tracking-normal text-ink md:text-5xl">Оплата, запись и частые вопросы</h2>
          <RevealGroup className="mt-8 grid grid-cols-2 gap-3" stagger={0.08}>
            {amenities.map((item, index) => {
              const Icon = item.icon;

              return (
                <RevealItem key={item.title} className="relative overflow-hidden rounded-[1.3rem] border border-slate-200 bg-[#f6f8fb] p-4">
                  <span className="absolute right-3 top-2 font-mono text-3xl font-black text-slate-900/[0.04]">{index + 1}</span>
                  <Icon aria-hidden="true" className="size-5 text-signal" />
                  <p className="mt-3 text-sm font-black leading-5 text-slate-800">{item.title}</p>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </Reveal>

        <RevealGroup className="grid gap-3" stagger={0.08}>
          {faq.map((item, index) => (
            <RevealItem key={item.question}>
              <details className="group rounded-[1.5rem] border border-slate-200 bg-[#f6f8fb] p-5" open={index === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-black text-ink md:text-lg">
                  {item.question}
                  <ChevronDown aria-hidden="true" className="size-5 shrink-0 text-slate-500 transition group-open:rotate-180" />
                </summary>
                <p className="mt-4 leading-7 text-slate-600">{item.answer}</p>
              </details>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
