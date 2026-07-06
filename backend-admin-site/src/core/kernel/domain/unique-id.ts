import { randomUUID } from "crypto";

export class UniqueId {
  private readonly value: string;

  constructor(value?: string) {
    const raw = value?.trim();

    if (raw && raw.length === 0) {
      throw new Error("UniqueId cannot be empty.");
    }

    this.value = raw ?? randomUUID();
  }

  public toString(): string {
    return this.value;
  }

  public toValue(): string {
    return this.value;
  }

  public equals(other?: UniqueId | null): boolean {
    if (!other) return false;
    return this.value === other.value;
  }

  public static create(value?: string): UniqueId {
    return new UniqueId(value);
  }
}