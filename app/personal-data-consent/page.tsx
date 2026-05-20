import Link from "next/link";

const operator = {
  name: "[Наименование оператора]",
  inn: "[ИНН]",
  ogrn: "[ОГРН/ОГРНИП]",
  address: "[Адрес]",
  email: "[Email]",
};

export const metadata = {
  title: "Согласие на обработку персональных данных",
  description: "Согласие пользователя на обработку персональных данных через форму заявки.",
};

export default function PersonalDataConsentPage() {
  return (
    <main className="bg-slate-50 pb-20 pt-28">
      <article className="container-page max-w-3xl rounded-3xl bg-white p-6 shadow-soft md:p-10">
        <Link className="text-sm font-semibold text-signal hover:text-blue-700" href="/">
          На главную
        </Link>
        <h1 className="mt-6 text-3xl font-bold tracking-normal text-ink md:text-4xl">
          Согласие на обработку персональных данных
        </h1>
        <p className="mt-4 text-slate-600">
          Заполняя форму на сайте, пользователь дает согласие оператору на обработку персональных данных на условиях,
          указанных ниже. Перед публикацией замените реквизиты на фактические.
        </p>

        <div className="mt-8 space-y-6 text-sm leading-7 text-slate-700 md:text-base">
          <section>
            <h2 className="text-xl font-semibold text-ink">1. Оператор</h2>
            <p className="mt-2">
              {operator.name}, ИНН {operator.inn}, ОГРН/ОГРНИП {operator.ogrn}, адрес {operator.address}, email{" "}
              {operator.email}.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-ink">2. Данные</h2>
            <p className="mt-2">
              Пользователь соглашается на обработку имени, телефона, сведений об автомобиле, выбранной услуги,
              комментария, предпочтительного способа связи, страницы отправки и UTM-меток.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-ink">3. Цель</h2>
            <p className="mt-2">
              Цель обработки - обработка заявки, обратная связь, консультация по диагностике, ремонту, техническому
              обслуживанию или стоимости работ.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-ink">4. Действия с данными</h2>
            <p className="mt-2">
              Оператор вправе собирать, записывать, систематизировать, хранить, уточнять, использовать, передавать
              сервисам уведомлений, блокировать и удалять персональные данные.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-ink">5. Срок действия согласия</h2>
            <p className="mt-2">
              Согласие действует до достижения целей обработки или до его отзыва пользователем путем обращения к
              оператору.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-ink">6. Отзыв согласия</h2>
            <p className="mt-2">
              Пользователь может отозвать согласие, направив оператору письменное обращение по адресу или email,
              указанным в настоящем согласии.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
