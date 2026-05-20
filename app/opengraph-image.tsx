import { ImageResponse } from "next/og";
import { business } from "@/lib/content";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0F172A",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, color: "#FDBA74" }}>Автосервис в Химках • ул. Репина, 1</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 700, lineHeight: 1.05 }}>
            Диагностика, ТО и ремонт автомобиля
          </div>
          <div style={{ display: "flex", fontSize: 32, color: "#CBD5E1" }}>
            {business.name} • согласование стоимости до начала работ
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#BFDBFE" }}>{business.phones.join("  |  ")}</div>
      </div>
    ),
    size,
  );
}
