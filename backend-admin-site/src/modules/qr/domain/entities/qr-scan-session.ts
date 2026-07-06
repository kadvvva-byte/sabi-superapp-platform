export interface QrScanSession {
  id: string;
  rawValue: string;
  scannerRailHint?: "sabi_wallet" | "coin_wallet";
  createdAt: string;
}
