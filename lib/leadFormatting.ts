import { business } from "@/lib/content";
import { preferredContactLabels, type PreferredContact } from "@/lib/validators";

export type LeadForNotification = {
  name: string | null;
  phone: string;
  car: string | null;
  service: string;
  message: string | null;
  preferredContact: string;
  pageUrl: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  createdAt: Date;
};

function valueOrDash(value: string | null | undefined) {
  return value && value.trim().length > 0 ? value : "-";
}

function contactLabel(value: string) {
  if (value === "call" || value === "whatsapp" || value === "telegram") {
    return preferredContactLabels[value as PreferredContact];
  }

  return value;
}

export function formatUtm(lead: LeadForNotification) {
  const parts = [
    lead.utmSource ? `source=${lead.utmSource}` : "",
    lead.utmMedium ? `medium=${lead.utmMedium}` : "",
    lead.utmCampaign ? `campaign=${lead.utmCampaign}` : "",
  ].filter(Boolean);

  return parts.length > 0 ? parts.join(", ") : "-";
}

export function formatLeadMessage(lead: LeadForNotification) {
  return [
    `Новая заявка с сайта ${business.name}:`,
    `Имя: ${valueOrDash(lead.name)}`,
    `Телефон: ${lead.phone}`,
    `Авто: ${valueOrDash(lead.car)}`,
    `Услуга: ${lead.service}`,
    `Комментарий: ${valueOrDash(lead.message)}`,
    `Удобный способ связи: ${contactLabel(lead.preferredContact)}`,
    `Страница: ${valueOrDash(lead.pageUrl)}`,
    `UTM: ${formatUtm(lead)}`,
    `Дата: ${lead.createdAt.toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })}`,
  ].join("\n");
}

export function formatLeadSms(lead: LeadForNotification) {
  return `Новая заявка ${business.name}: ${valueOrDash(lead.name)}, ${lead.phone}, ${lead.service}, ${valueOrDash(lead.car)}`;
}
