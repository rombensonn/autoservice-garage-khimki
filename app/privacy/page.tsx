import Link from "next/link";

const operator = {
  name: "[Наименование оператора]",
  inn: "[ИНН]",
  ogrn: "[ОГРН/ОГРНИП]",
  address: "[Адрес]",
  email: "[Email]",
};

export const metadata = {
  title: "Политика обработки персональных данных",
  description: "Политика обработки персональных данных сайта Автосервис-гараж.",
};

export default function PrivacyPage() {
  return (
    <main className="bg-slate-50 pb-20 pt-28">
      <article className="container-page max-w-3xl rounded-3xl bg-white p-6 shadow-soft md:p-10">
        <Link className="text-sm font-semibold text-signal hover:text-blue-700" href="/">
          На главную
        </Link>
        <h1 className="mt-6 text-3xl font-bold tracking-normal text-ink md:text-4xl">
          Политика обработки персональных данных
        </h1>
        <p className="mt-4 text-slate-600">
          Настоящая политика описывает, как оператор обрабатывает персональные данные пользователей сайта.
          Перед публикацией замените реквизиты оператора на фактические данные владельца сайта.
        </p>

        <div className="mt-8 space-y-6 text-sm leading-7 text-slate-700 md:text-base">
          <section>
            <h2 className="text-xl font-semibold text-ink">1. Оператор</h2>
            <p className="mt-2">
              Оператор: {operator.name}. ИНН: {operator.inn}. ОГРН/ОГРНИП: {operator.ogrn}. Адрес: {operator.address}.
              Email для обращений по персональным данным: {operator.email}.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-ink">2. Какие данные обрабатываются</h2>
            <p className="mt-2">
              Через форму заявки могут обрабатываться имя, номер телефона, марка и модель автомобиля, выбранная услуга,
              комментарий, предпочтительный способ связи, сведения о странице и UTM-метках.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-ink">3. Цели обработки</h2>
            <p className="mt-2">
              Данные используются для обработки заявки, связи с пользователем, уточнения задачи по ремонту или
              обслуживанию автомобиля, ведения учета обращений и улучшения работы сайта.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-ink">4. Правовые основания</h2>
            <p className="mt-2">
              Обработка выполняется на основании согласия пользователя, которое он предоставляет при отправке формы на
              сайте.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-ink">5. Срок хранения</h2>
            <p className="mt-2">
              Данные хранятся столько, сколько необходимо для обработки заявки и выполнения требований законодательства,
              если пользователь не отозвал согласие раньше.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-ink">6. Передача третьим лицам</h2>
            <p className="mt-2">
              Данные могут передаваться сервисам уведомлений и хостинг-провайдеру только в объеме, необходимом для
              работы сайта и обработки заявки.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-ink">7. Права пользователя</h2>
            <p className="mt-2">
              Пользователь может запросить сведения об обработке данных, уточнение, блокирование, удаление данных или
              отзыв согласия, направив обращение оператору.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
