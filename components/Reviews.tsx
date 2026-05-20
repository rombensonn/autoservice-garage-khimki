import { ExternalLink, Quote, Star } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { business, reviewCards } from "@/lib/content";

export function Reviews() {
  return (
    <section className="bg-[#f6f8fb] py-16 md:py-24" id="reviews">
      <div className="container-page">
        <RevealGroup className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <RevealItem className="max-w-3xl">
            <p className="section-kicker text-signal">Отзывы и доверие</p>
            <h2 className="mt-4 text-3xl font-black tracking-normal text-ink md:text-5xl">Отзывы без приукрашивания</h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Короткие смысловые фрагменты из карточки сервиса: аккуратно, без выдуманных цитат и громких обещаний.
            </p>
          </RevealItem>
          <RevealItem className="rounded-[1.6rem] bg-slate-950 p-5 text-white shadow-soft">
            <div className="flex items-center gap-2 text-orange-300">
              <Star aria-hidden="true" className="size-5 fill-current" />
              <span className="text-2xl font-black">{business.rating} из 5</span>
            </div>
            <p className="mt-1 text-sm text-slate-300">на Яндекс.Картах • {business.ratingCount} оценок</p>
          </RevealItem>
        </RevealGroup>

        <RevealGroup className="mt-10 grid gap-4 md:grid-cols-6" stagger={0.09}>
          {reviewCards.map((review, index) => (
            <RevealItem
              as="article"
              key={review}
              className={`industrial-panel relative overflow-hidden rounded-[1.6rem] p-6 ${
                index === 0 || index === 3 ? "md:col-span-3" : "md:col-span-2"
              }`}
            >
              <Quote aria-hidden="true" className="size-7 text-flame" />
              <p className="mt-5 text-lg font-bold leading-8 text-slate-800">“{review}”</p>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-8 inline-flex" direction="up">
          <a
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-slate-900 px-6 text-sm font-black text-white transition hover:bg-flame focus-ring"
            href={business.yandexMapsUrl}
            rel="noreferrer"
            target="_blank"
          >
            Смотреть отзывы на Яндекс.Картах
            <ExternalLink aria-hidden="true" className="size-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
