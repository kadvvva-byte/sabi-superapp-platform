export function shouldStopSabiCallTone(status: string): boolean { return ["active", "declined", "cancelled", "ended", "missed", "failed"].includes(status); }
