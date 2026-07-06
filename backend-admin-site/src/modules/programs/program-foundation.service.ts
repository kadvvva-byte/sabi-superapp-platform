import {
  SABI_PROGRAM_FOUNDATIONS,
  SABI_PROGRAM_ORDER,
  isSabiProgramCode,
} from "./program-foundation.registry";
import type {
  SabiProgramCode,
  SabiProgramFoundation,
  SabiProgramFoundationStatus,
} from "./program-foundation.types";

export class SabiProgramFoundationService {
  listPrograms(): SabiProgramFoundation[] {
    return SABI_PROGRAM_ORDER.map((code) => SABI_PROGRAM_FOUNDATIONS[code]);
  }

  getProgram(code: string): SabiProgramFoundation | null {
    if (!isSabiProgramCode(code)) return null;
    return SABI_PROGRAM_FOUNDATIONS[code];
  }

  getProgramStatus(code: string): SabiProgramFoundationStatus | null {
    const program = this.getProgram(code);
    if (!program) return null;

    return {
      ok: true,
      version: "HOME-100.17",
      generatedAt: new Date().toISOString(),
      program,
    };
  }

  getHomePrograms(): SabiProgramFoundation[] {
    return this.listPrograms().filter((program) => program.enabledOnHome);
  }

  resolveProgramForRoute(route: string): SabiProgramFoundation | null {
    const rawRoute = route.trim();
    const normalizedRoute = rawRoute === "/home" ? "/" : rawRoute;
    return (
      this.listPrograms().find((program) => program.mobileRoute === normalizedRoute) ??
      null
    );
  }

  isEnabled(code: SabiProgramCode): boolean {
    return SABI_PROGRAM_FOUNDATIONS[code].enabledOnHome;
  }
}

export const sabiProgramFoundationService = new SabiProgramFoundationService();
