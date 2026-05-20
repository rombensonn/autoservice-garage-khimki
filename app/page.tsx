import { Cars } from "@/components/Cars";
import { Contacts } from "@/components/Contacts";
import { FAQ } from "@/components/FAQ";
import { Hero } from "@/components/Hero";
import { LeadFormSection } from "@/components/LeadForm";
import { Prices } from "@/components/Prices";
import { Process } from "@/components/Process";
import { Reviews } from "@/components/Reviews";
import { Services } from "@/components/Services";
import { TrustBar } from "@/components/TrustBar";
import { business } from "@/lib/content";
import { getSiteUrl } from "@/lib/site";

const serviceTypes = [
  "диагностика авто",
  "техническое обслуживание",
  "замена масла",
  "ремонт ходовой части",
  "ремонт тормозной системы",
  "ремонт двигателя",
  "ремонт КПП",
  "ремонт автоэлектрики",
  "кузовной ремонт",
  "шиномонтаж",
  "сварочные работы",
];

function JsonLd() {
  const siteUrl = getSiteUrl();
  const schema = {
    "@context": "https://schema.org",
    "@type": ["AutoRepair", "LocalBusiness"],
    name: business.name,
    url: siteUrl,
    telephone: business.phones,
    address: {
      "@type": "PostalAddress",
      streetAddress: "ул. Репина, 1",
      addressLocality: "Химки",
      addressCountry: "RU",
    },
    areaServed: "Химки",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: business.ratingValue,
      ratingCount: business.ratingCount,
      bestRating: 5,
      worstRating: 1,
    },
    paymentAccepted: ["Наличные", "Банковская карта", "Безналичный расчет", "Онлайн-оплата"],
    serviceType: serviceTypes,
    sameAs: [business.yandexMapsUrl],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export default function Home() {
  return (
    <>
      <JsonLd />
      <main id="main">
        <Hero />
        <TrustBar />
        <Services />
        <Prices />
        <Process />
        <Cars />
        <Reviews />
        <FAQ />
        <LeadFormSection />
        <Contacts />
      </main>
    </>
  );
}
