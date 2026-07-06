export type SabiCallIceServer = { urls: string | string[]; username?: string; credential?: string };
export function getSabiCallIceServers(): SabiCallIceServer[] { return [{ urls: "stun:stun.l.google.com:19302" }]; }
