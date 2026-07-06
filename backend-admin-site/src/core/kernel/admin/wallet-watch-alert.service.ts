import { randomUUID } from "crypto";
import type { WalletWatchAlert } from "./admin.types";

export class WalletWatchAlertService {
  private readonly storage: WalletWatchAlert[] = [];

  create(input: Omit<WalletWatchAlert, "id" | "createdAt" | "status">) {
    const entity: WalletWatchAlert = {
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      status: "open",
      ...input,
    };

    this.storage.unshift(entity);
    return entity;
  }

  list() {
    return [...this.storage];
  }
}
