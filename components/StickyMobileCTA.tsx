import { CalendarCheck, Phone } from "lucide-react";
import { business } from "@/lib/content";

export function StickyMobileCTA() {
  return (
    <div className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-4 pt-3 shadow-[0_-12px_35px_rgba(15,23,42,0.12)] backdrop-blur md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-2 gap-3">
        <a
          aria-label="Позвонить в Автосервис-гараж"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-slate-900 px-4 text-sm font-black text-white"
          href={business.telLinks[0]}
        >
          <Phone aria-hidden="true" className="size-4" />
          Позвонить
        </a>
        <a
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-flame px-4 text-sm font-black text-white"
          href="#lead"
        >
          <CalendarCheck aria-hidden="true" className="size-4" />
          Записаться
        </a>
      </div>
    </div>
  );
}
