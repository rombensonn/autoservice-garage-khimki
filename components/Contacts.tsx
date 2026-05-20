import { CalendarCheck, ExternalLink, MapPin, Navigation, Phone } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { business, contactCards } from "@/lib/content";

export function Contacts() {
  return (
    <section className="bg-[#f6f8fb] py-16 md:py-24" id="contacts">
      <div className="container-page">
        <Reveal className="industrial-panel overflow-hidden rounded-[2rem]">
          <RevealGroup className="grid lg:grid-cols-[0.95fr_1.05fr]" stagger={0.14}>
            <RevealItem className="p-6 md:p-10" direction="left">
              <p className="section-kicker text-signal">Контакты</p>
              <h2 className="mt-4 text-3xl font-black tracking-normal text-ink md:text-5xl">{business.name}</h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                Адрес: {business.address}. График работы указан ниже, приезд лучше согласовать заранее.
              </p>

              <RevealGroup className="mt-8 grid gap-3" stagger={0.08}>
                {contactCards.map((card) => {
                  const Icon = card.icon;

                  return (
                    <RevealItem key={card.title} className="flex gap-4 rounded-[1.4rem] border border-slate-200 bg-white/70 p-5">
                      <div className="grid size-12 shrink-0 place-items-center rounded-full bg-slate-950 text-orange-300 shadow-sm">
                        <Icon aria-hidden="true" className="size-6" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-500">{card.title}</p>
                        {card.title === "Телефон" ? (
                          <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 font-black leading-6 text-ink">
                            {business.phones.map((phone, index) => (
                              <span key={phone} className="inline-flex items-center gap-2">
                                {index > 0 ? <span aria-hidden="true" className="text-slate-400">/</span> : null}
                                <a className="rounded-md transition hover:text-flame hover:underline focus-ring" href={business.telLinks[index]} aria-label={`Позвонить ${phone}`}>
                                  {phone}
                                </a>
                              </span>
                            ))}
                          </p>
                        ) : card.title === "График" ? (
                          <div className="mt-3 grid gap-2">
                            {business.workSchedule.map((item, index) => (
                              <div key={item.days} className="flex min-h-10 items-center justify-between gap-3 border-l-2 border-orange-300/70 bg-slate-50/80 py-2 pl-3 pr-4">
                                <span className="flex items-center gap-2">
                                  <span className={`grid h-7 min-w-10 place-items-center rounded-full px-2 text-xs font-black ${index === 0 ? "bg-flame text-white" : "bg-slate-950 text-orange-300"}`}>
                                    {item.days}
                                  </span>
                                  <span className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">{item.tone}</span>
                                </span>
                                <time className="whitespace-nowrap font-black leading-6 text-ink">{item.time}</time>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="mt-1 font-black leading-6 text-ink">{card.value}</p>
                        )}
                      </div>
                    </RevealItem>
                  );
                })}
              </RevealGroup>

              <RevealGroup className="mt-8 grid gap-3 sm:grid-cols-[minmax(136px,0.75fr)_minmax(220px,1.25fr)]" stagger={0.07}>
                <RevealItem>
                  <a className="inline-flex min-h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-full bg-flame px-4 text-[13px] font-black text-white shadow-glow transition hover:bg-orange-600 focus-ring sm:text-sm" href={business.telLinks[0]}>
                    <Phone aria-hidden="true" className="size-4 shrink-0" />
                    Позвонить
                  </a>
                </RevealItem>
                <RevealItem>
                  <a className="inline-flex min-h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-full border border-slate-300 bg-white px-4 text-[13px] font-black text-slate-900 transition hover:bg-slate-50 focus-ring sm:text-sm" href={business.yandexMapsUrl} rel="noreferrer" target="_blank">
                    <ExternalLink aria-hidden="true" className="size-4 shrink-0" />
                    Открыть в Яндекс.Картах
                  </a>
                </RevealItem>
                <RevealItem className="sm:col-span-2">
                  <a className="inline-flex min-h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-full bg-slate-900 px-4 text-[13px] font-black text-white transition hover:bg-slate-800 focus-ring sm:text-sm" href="#lead">
                    <CalendarCheck aria-hidden="true" className="size-4 shrink-0" />
                    Записаться на ремонт
                  </a>
                </RevealItem>
              </RevealGroup>
            </RevealItem>

            <RevealItem className="dark-workshop relative min-h-[460px] overflow-hidden text-white lg:min-h-0" direction="right">
              <iframe
                className="absolute inset-0 h-full w-full border-0"
                src={business.yandexMapEmbedUrl}
                title={`Яндекс.Карта: ${business.address}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/58 via-slate-950/8 to-slate-950/62" />
              <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-slate-950/70 to-transparent" />
              <div className="absolute left-4 right-4 top-4 rounded-[1.35rem] border border-white/15 bg-slate-950/78 p-4 text-white shadow-[0_18px_50px_rgba(0,0,0,0.28)] backdrop-blur md:left-6 md:right-auto md:max-w-[360px]">
                <div className="flex items-center gap-3">
                  <div className="grid size-11 shrink-0 place-items-center rounded-full bg-flame text-white shadow-glow">
                    <MapPin aria-hidden="true" className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-orange-200">{business.name}</p>
                    <h3 className="mt-1 text-xl font-black leading-6">{business.address}</h3>
                  </div>
                </div>
              </div>

              <a className="absolute bottom-4 left-4 right-4 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-black text-slate-950 shadow-[0_18px_45px_rgba(0,0,0,0.26)] transition hover:bg-slate-100 focus-ring sm:left-6 sm:right-auto" href={business.yandexMapsUrl} rel="noreferrer" target="_blank">
                <Navigation aria-hidden="true" className="size-4" />
                Открыть маршрут
              </a>
            </RevealItem>
          </RevealGroup>
        </Reveal>
      </div>
    </section>
  );
}
