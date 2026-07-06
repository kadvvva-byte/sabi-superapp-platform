import type { SabiCallFailureCode } from "../contracts/sabi-call.types";
export class SabiCallDomainError extends Error {
  readonly code: SabiCallFailureCode | string;
  constructor(code: SabiCallFailureCode | string, message = code) {
    super(message);
    this.name = "SabiCallDomainError";
    this.code = code;
  }
}
export class SabiCallNotFoundError extends SabiCallDomainError {
  constructor(callId: string) { super("not_found", `Sabi call was not found: ${callId}`); }
}
export class SabiCallPolicyError extends SabiCallDomainError {}
export function callNotFound(callId: string): SabiCallNotFoundError { return new SabiCallNotFoundError(callId); }
export function callPolicyError(code: string, message = code): SabiCallPolicyError { return new SabiCallPolicyError(code, message); }
