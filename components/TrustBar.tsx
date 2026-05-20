import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { reasons } from "@/lib/content";

export function TrustBar() {
  return (
    <section className="relative -mt-10 z-10 pb-16">
      <div className="container-page">
        <Reveal className="industrial-panel trust-glass-panel overflow-hidden rounded-[2rem]">
          <RevealGroup className="grid md:grid-cols-2 xl:grid-cols-4" stagger={0.1}>
            {reasons.map((reason, index) => {
              const Icon = reason.icon;

              return (
                <RevealItem as="article" key={reason.title} className="group relative min-h-[230px] border-b border-slate-200/80 p-6 last:border-b-0 md:border-r md:last:border-r-0 xl:border-b-0">
                  <span className="absolute right-5 top-4 font-mono text-6xl font-black leading-none text-slate-900/[0.045]">
                    0{index + 1}
                  </span>
                  <div className="grid size-12 place-items-center rounded-full bg-slate-950 text-orange-300 shadow-[0_12px_30px_rgba(15,23,42,0.18)] transition group-hover:bg-flame group-hover:text-white">
                    <Icon aria-hidden="true" className="size-6" />
                  </div>
                  <h2 className="mt-8 max-w-64 text-xl font-black leading-tight text-ink">{reason.title}</h2>
                  <p className="mt-3 leading-7 text-slate-600">{reason.text}</p>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </Reveal>
      </div>
    </section>
  );
}
