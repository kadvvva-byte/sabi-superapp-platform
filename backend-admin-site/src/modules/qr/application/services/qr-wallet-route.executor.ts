import type {
  QrExecuteWalletRouteInput,
  QrExecuteWalletRouteResult,
} from "./qr-module-bridges.service";

export interface QrWalletRouteExecutor {
  execute(input: QrExecuteWalletRouteInput): Promise<QrExecuteWalletRouteResult>;
}
