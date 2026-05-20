import { updateLeadStatus } from "@/app/admin/leads/actions";
import { prisma } from "@/lib/prisma";
import { leadStatusLabels, leadStatusOptions, type LeadStatus } from "@/lib/validators";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Заявки - Автосервис-гараж",
};

function formatDate(date: Date) {
  return date.toLocaleString("ru-RU", {
    timeZone: "Europe/Moscow",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function statusLabel(status: string) {
  if (leadStatusOptions.includes(status as LeadStatus)) {
    return leadStatusLabels[status as LeadStatus];
  }

  return status;
}

export default async function AdminLeadsPage() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <main className="min-h-dvh bg-slate-100 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-signal">Админка</p>
            <h1 className="mt-2 text-3xl font-bold text-ink">Заявки с сайта</h1>
            <p className="mt-2 text-slate-600">Показаны последние 100 обращений. Доступ защищен ADMIN_LOGIN и ADMIN_PASSWORD.</p>
          </div>
          <div className="rounded-2xl bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
            Всего в списке: <span className="font-semibold text-ink">{leads.length}</span>
          </div>
        </div>

        <section className="mt-8 hidden overflow-hidden rounded-3xl bg-white shadow-soft lg:block">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-slate-900 text-white">
              <tr>
                <th className="px-5 py-4 font-semibold">Дата</th>
                <th className="px-5 py-4 font-semibold">Клиент</th>
                <th className="px-5 py-4 font-semibold">Авто</th>
                <th className="px-5 py-4 font-semibold">Услуга</th>
                <th className="px-5 py-4 font-semibold">Комментарий</th>
                <th className="px-5 py-4 font-semibold">Источник</th>
                <th className="px-5 py-4 font-semibold">Статус</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b border-slate-100 align-top last:border-0">
                  <td className="px-5 py-4 text-slate-600">{formatDate(lead.createdAt)}</td>
                  <td className="px-5 py-4">
                    <div className="font-semibold text-ink">{lead.name || "Без имени"}</div>
                    <a className="mt-1 block text-signal hover:text-blue-700" href={`tel:${lead.phone}`}>
                      {lead.phone}
                    </a>
                  </td>
                  <td className="px-5 py-4 text-slate-700">{lead.car || "-"}</td>
                  <td className="px-5 py-4 text-slate-700">{lead.service}</td>
                  <td className="max-w-xs px-5 py-4 text-slate-600">{lead.message || "-"}</td>
                  <td className="px-5 py-4 text-slate-600">
                    <div>{lead.utmSource || "-"}</div>
                    <div className="text-xs">{lead.utmMedium || ""}</div>
                    <div className="text-xs">{lead.utmCampaign || ""}</div>
                    {lead.pageUrl ? <div className="mt-2 max-w-[220px] break-words text-xs">{lead.pageUrl}</div> : null}
                  </td>
                  <td className="px-5 py-4">
                    <form action={updateLeadStatus} className="flex min-w-36 flex-col gap-2">
                      <input name="id" type="hidden" value={lead.id} />
                      <label className="sr-only" htmlFor={`status-${lead.id}`}>
                        Статус заявки
                      </label>
                      <select
                        className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-ink"
                        defaultValue={lead.status}
                        id={`status-${lead.id}`}
                        name="status"
                      >
                        {leadStatusOptions.map((status) => (
                          <option key={status} value={status}>
                            {leadStatusLabels[status]}
                          </option>
                        ))}
                      </select>
                      <button className="rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800" type="submit">
                        Сохранить
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="mt-8 grid gap-4 lg:hidden">
          {leads.map((lead) => (
            <article key={lead.id} className="rounded-3xl bg-white p-5 shadow-soft">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-500">{formatDate(lead.createdAt)}</p>
                  <h2 className="mt-1 text-lg font-semibold text-ink">{lead.name || "Без имени"}</h2>
                  <a className="mt-1 block font-semibold text-signal" href={`tel:${lead.phone}`}>
                    {lead.phone}
                  </a>
                </div>
                <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                  {statusLabel(lead.status)}
                </span>
              </div>
              <dl className="mt-4 grid gap-3 text-sm text-slate-700">
                <div>
                  <dt className="font-semibold text-ink">Авто</dt>
                  <dd>{lead.car || "-"}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">Услуга</dt>
                  <dd>{lead.service}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">Комментарий</dt>
                  <dd>{lead.message || "-"}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">UTM / страница</dt>
                  <dd className="break-words">
                    {[lead.utmSource, lead.utmMedium, lead.utmCampaign].filter(Boolean).join(", ") || "-"}
                    {lead.pageUrl ? <span className="mt-1 block text-xs text-slate-500">{lead.pageUrl}</span> : null}
                  </dd>
                </div>
              </dl>
              <form action={updateLeadStatus} className="mt-5 flex gap-2">
                <input name="id" type="hidden" value={lead.id} />
                <label className="sr-only" htmlFor={`mobile-status-${lead.id}`}>
                  Статус заявки
                </label>
                <select
                  className="min-h-11 flex-1 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-ink"
                  defaultValue={lead.status}
                  id={`mobile-status-${lead.id}`}
                  name="status"
                >
                  {leadStatusOptions.map((status) => (
                    <option key={status} value={status}>
                      {leadStatusLabels[status]}
                    </option>
                  ))}
                </select>
                <button className="min-h-11 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white" type="submit">
                  OK
                </button>
              </form>
            </article>
          ))}
        </section>

        {leads.length === 0 ? (
          <div className="mt-8 rounded-3xl bg-white p-8 text-center text-slate-600 shadow-soft">Заявок пока нет.</div>
        ) : null}
      </div>
    </main>
  );
}
