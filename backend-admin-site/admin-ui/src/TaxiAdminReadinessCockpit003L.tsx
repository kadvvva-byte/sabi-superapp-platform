import type { CSSProperties } from "react";

type TaxiState = "complete" | "ready" | "blocked";

type TaxiItem = {
  key: string;
  label: string;
  state: TaxiState;
  detail: string;
};

const items: TaxiItem[] = [
  { key: "backend", label: "Backend/API foundation", state: "complete", detail: "Taxi backend foundation is visible through the Admin readiness flow." },
  { key: "routes", label: "Route catalog", state: "complete", detail: "Taxi route catalog remains visible while runtime activation stays locked." },
  { key: "db", label: "DB read/write proof", state: "complete", detail: "Read and isolated write smoke proofs are recorded; this panel does not execute DB work." },
  { key: "provider", label: "Provider boundary", state: "blocked", detail: "Provider dispatch and credential lookup remain blocked until exact owner approval." },
  { key: "wallet", label: "Wallet/payment/payout", state: "blocked", detail: "No wallet mutation, payment capture, payout, refund or money movement is enabled here." },
  { key: "production", label: "Production activation", state: "blocked", detail: "Production runtime activation remains blocked until a separate controlled approval chain." }
];

const shellStyle: CSSProperties = {
  border: "1px solid rgba(56, 189, 248, 0.36)",
  borderRadius: 22,
  padding: 18,
  margin: "18px 0",
  background: "linear-gradient(135deg, rgba(2, 6, 23, 0.94), rgba(12, 74, 110, 0.78))",
  color: "#f8fafc"
};

const cardStyle: CSSProperties = {
  border: "1px solid rgba(226, 232, 240, 0.16)",
  borderRadius: 16,
  padding: 12,
  background: "rgba(15, 23, 42, 0.58)"
};

function label(state: TaxiState): string {
  if (state === "complete") return "complete";
  if (state === "ready") return "ready";
  return "blocked until exact approval";
}

export function TaxiAdminReadinessCockpit003L() {
  return (
    <section data-sabi-taxi-admin-readiness-cockpit="003L" style={shellStyle} aria-label="Taxi admin readiness cockpit">
      <h2 style={{ marginTop: 0 }}>Taxi admin readiness cockpit</h2>
      <p style={{ color: "#cbd5e1" }}>
        Taxi foundation status is visible in Admin UI. This component does not read secrets, execute providers, mutate Wallet or move money.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10 }}>
        {items.map((item) => (
          <article key={item.key} style={cardStyle}>
            <strong>{item.label}</strong>
            <p style={{ margin: "6px 0", color: "#bae6fd" }}>{label(item.state)}</p>
            <p style={{ margin: 0, color: "#cbd5e1" }}>{item.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
