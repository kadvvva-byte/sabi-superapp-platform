import type { SabiCallPresentationState } from "../../contracts";
export class SabiCallPresentationRelay { private state: SabiCallPresentationState | null = null; set(state: SabiCallPresentationState): void { this.state = state; } get(): SabiCallPresentationState | null { return this.state; } }
