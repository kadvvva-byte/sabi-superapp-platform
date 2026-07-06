import type { AdminApiConfig } from "./api";
import type { AdminLanguage } from "./admin-i18n";

export const TAXI_FINANCE_028A_FIX12_RETIRED_BY_FIX14 = "TAXI-FINANCE-028A-FIX12-RETIRED-BY-FIX14";

type Props = Readonly<{
  language: AdminLanguage;
  config?: AdminApiConfig;
  setNotice?: (notice: string) => void;
}>;

export function TaxiFinanceAgentChat028AFix12Panel(_props: Props) {
  return null;
}
