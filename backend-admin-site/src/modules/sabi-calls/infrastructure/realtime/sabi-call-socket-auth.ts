export function readSabiCallSocketUserId(query: Record<string, unknown>): string | null { const value = query.userId; return typeof value === "string" && value.trim() ? value.trim() : null; }
