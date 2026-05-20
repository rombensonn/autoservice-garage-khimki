# Автосервис-гараж - лендинг и прием заявок

Одностраничный сайт для автосервиса в Химках на ул. Репина, 1. Проект включает лендинг, форму заявки, backend на Next.js Route Handlers, сохранение заявок в SQLite через Prisma, уведомления и простую админку.

## Стек

- Next.js App Router
- TypeScript strict
- Tailwind CSS
- React Hook Form + Zod
- Framer Motion
- Lucide React
- Prisma + SQLite
- Telegram Bot API, SMTP email, заготовка под SMS-провайдера

## Быстрый запуск

```bash
npm install
npm run prisma:deploy
npm run dev
```

Сайт откроется на `http://localhost:3000`.

## Переменные окружения

Скопируйте `.env.example` в `.env` и заполните нужные значения.

Обязательные для локального запуска:

```env
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
ADMIN_LOGIN="admin"
ADMIN_PASSWORD="change-this-password"
```

Telegram-уведомления:

```env
TELEGRAM_BOT_TOKEN=""
TELEGRAM_CHAT_ID=""
```

Email через SMTP:

```env
SMTP_HOST=""
SMTP_PORT="465"
SMTP_USER=""
SMTP_PASS=""
LEAD_NOTIFY_EMAIL=""
```

SMS-заготовка:

```env
SMS_PROVIDER=""
SMS_API_KEY=""
SMS_FROM=""
SMS_TO=""
```

Если Telegram, email или SMS не настроены, заявка все равно сохранится в базе. В логах сервера будет видно, какие каналы пропущены.

## Где что находится

- Лендинг: `app/page.tsx`
- Форма заявки: `components/LeadForm.tsx`
- API приема заявок: `app/api/leads/route.ts`
- Prisma-схема: `prisma/schema.prisma`
- Админка: `/admin/leads`
- Политика: `/privacy`
- Согласие: `/personal-data-consent`
- Контент и цены: `lib/content.ts`

## Проверка отправки заявки

1. Запустите миграцию: `npm run prisma:deploy`
2. Запустите сайт: `npm run dev`
3. Откройте `http://localhost:3000`
4. Отправьте форму с телефоном и двумя согласиями.
5. Откройте `http://localhost:3000/admin/leads`
6. Введите `ADMIN_LOGIN` и `ADMIN_PASSWORD` из `.env`.

Также можно проверить API через curl:

```bash
curl -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Тест",
    "phone":"+7 916 000-00-00",
    "car":"Lada Vesta",
    "service":"Диагностика",
    "message":"Проверка формы",
    "preferredContact":"call",
    "consentPersonalData":true,
    "consentPrivacyPolicy":true,
    "website":"",
    "pageUrl":"http://localhost:3000"
  }'
```

## Настройка SMS

`lib/smsNotifier.ts` содержит общий интерфейс `SmsProviderClient`. Проект не привязан к конкретному SMS-провайдеру. Когда выбран провайдер, добавьте адаптер в `createSmsProvider` и используйте переменные `SMS_PROVIDER`, `SMS_API_KEY`, `SMS_FROM`, `SMS_TO`.

## Деплой

1. Укажите `NEXT_PUBLIC_SITE_URL` с публичным доменом.
2. Для SQLite убедитесь, что сервер сохраняет файл базы между релизами. Для production чаще удобнее PostgreSQL.
3. Чтобы перейти на PostgreSQL, замените provider в `prisma/schema.prisma` на `postgresql` и задайте `DATABASE_URL`.
4. Выполните миграции на сервере: `npx prisma migrate deploy`.
5. Запустите сборку: `npm run build`.
6. Запустите приложение: `npm run start`.

## Юридические страницы

На страницах `/privacy` и `/personal-data-consent` есть placeholders:

- `[Наименование оператора]`
- `[ИНН]`
- `[ОГРН/ОГРНИП]`
- `[Адрес]`
- `[Email]`

Перед публикацией замените их на фактические реквизиты владельца сайта.
