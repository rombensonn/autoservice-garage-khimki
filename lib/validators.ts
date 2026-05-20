import { z } from "zod";

export const leadServiceOptions = [
  "Диагностика",
  "Компьютерная диагностика",
  "Техническое обслуживание",
  "Замена масла",
  "Ходовая часть",
  "Тормозная система",
  "Ремонт двигателя",
  "Ремонт КПП / DSG",
  "Автоэлектрика",
  "Кузовной ремонт",
  "Шиномонтаж",
  "Сварочные работы",
  "Антикор",
  "Эвакуация автомобиля",
  "Запчасти под заказ",
  "Другое",
] as const;

export const preferredContactOptions = ["call", "whatsapp", "telegram"] as const;
export type PreferredContact = (typeof preferredContactOptions)[number];

export const preferredContactLabels: Record<PreferredContact, string> = {
  call: "Звонок",
  whatsapp: "WhatsApp",
  telegram: "Telegram",
};

export const leadStatusOptions = ["new", "in_progress", "closed"] as const;
export type LeadStatus = (typeof leadStatusOptions)[number];

export const leadStatusLabels: Record<LeadStatus, string> = {
  new: "новая",
  in_progress: "в работе",
  closed: "закрыта",
};

const optionalText = (maxLength: number) =>
  z
    .string()
    .trim()
    .max(maxLength, `Не более ${maxLength} символов`)
    .optional()
    .or(z.literal(""));

export const leadPayloadSchema = z
  .object({
    name: optionalText(80),
    phone: z
      .string()
      .trim()
      .min(7, "Укажите телефон")
      .max(30, "Телефон слишком длинный")
      .regex(/^[+\d\s()\-]+$/u, "Проверьте формат телефона"),
    car: optionalText(120),
    service: z
      .string()
      .trim()
      .refine((value) => leadServiceOptions.includes(value as (typeof leadServiceOptions)[number]), {
        message: "Выберите услугу из списка",
      }),
    message: optionalText(1000),
    preferredContact: z.enum(preferredContactOptions),
    consentPersonalData: z.boolean().refine((value) => value, {
      message: "Нужно согласие на обработку персональных данных",
    }),
    consentPrivacyPolicy: z.boolean().refine((value) => value, {
      message: "Нужно согласие с политикой обработки персональных данных",
    }),
    utmSource: optionalText(120),
    utmMedium: optionalText(120),
    utmCampaign: optionalText(160),
    pageUrl: optionalText(500),
    website: z
      .string()
      .max(0, "Поле должно быть пустым")
      .optional()
      .or(z.literal("")),
  })
  .strict();

export type LeadPayload = z.infer<typeof leadPayloadSchema>;

export const leadStatusSchema = z.object({
  id: z.string().min(1),
  status: z.enum(leadStatusOptions),
});
