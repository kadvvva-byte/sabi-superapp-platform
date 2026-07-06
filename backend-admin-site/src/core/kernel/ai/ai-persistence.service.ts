import {
  existsSync,
  mkdirSync,
  readFileSync,
  renameSync,
  unlinkSync,
  writeFileSync,
} from "node:fs"
import { join, resolve } from "node:path"
import type {
  AiConsentAuditEvent,
  AiHistoryEntry,
  AiLocaleBindingState,
  AiMemoryEntry,
  AiSessionConsentState,
  AiSessionContext,
  AiTaskEntry,
} from "./ai.types"
import type { AiPersistentPremiumGrant, AiPersistentUserState } from "./ai-persistence.types"
import type { AiPersonalizationProfile } from "./ai-personalization.types"
import type { AiSafetyAdminReport } from "./ai-safety-admin.types"

function sanitizeUserId(userId: string) {
  const safe = userId.trim().replace(/[^a-zA-Z0-9._-]+/g, "_")
  return safe || "unknown"
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

function createEmptyState(userId: string): AiPersistentUserState {
  return {
    version: 1,
    userId,
    savedAt: new Date().toISOString(),
    session: null,
    consent: null,
    consentAudit: [],
    memory: [],
    history: [],
    tasks: [],
    localeBinding: null,
    premiumGrant: null,
    personalizationProfile: null,
    safetyReports: [],
  }
}

export class AiPersistenceService {
  private readonly baseDir: string
  private readonly cache = new Map<string, AiPersistentUserState>()

  constructor(baseDir = process.env.AI_PERSISTENCE_DIR?.trim() || "var/ai-persistence") {
    this.baseDir = resolve(process.cwd(), baseDir)
    mkdirSync(this.baseDir, { recursive: true })
  }

  getBaseDir() {
    return this.baseDir
  }

  getStatus() {
    return {
      baseDir: this.baseDir,
      configured: true,
      cachedUsers: this.cache.size,
    }
  }

  getSession(userId: string): AiSessionContext | null {
    return clone(this.getState(userId).session)
  }

  saveSession(userId: string, session: AiSessionContext | null) {
    this.patchState(userId, (current) => ({ ...current, session: session ? clone(session) : null }))
  }

  getConsent(userId: string): AiSessionConsentState | null {
    return clone(this.getState(userId).consent)
  }

  saveConsent(userId: string, consent: AiSessionConsentState | null) {
    this.patchState(userId, (current) => ({ ...current, consent: consent ? clone(consent) : null }))
  }

  getConsentAudit(userId: string): AiConsentAuditEvent[] {
    return clone(this.getState(userId).consentAudit)
  }

  saveConsentAudit(userId: string, audit: AiConsentAuditEvent[]) {
    this.patchState(userId, (current) => ({ ...current, consentAudit: clone(audit) }))
  }

  getMemory(userId: string): AiMemoryEntry[] {
    return clone(this.getState(userId).memory)
  }

  saveMemory(userId: string, entries: AiMemoryEntry[]) {
    this.patchState(userId, (current) => ({ ...current, memory: clone(entries) }))
  }

  getHistory(userId: string): AiHistoryEntry[] {
    return clone(this.getState(userId).history)
  }

  saveHistory(userId: string, entries: AiHistoryEntry[]) {
    this.patchState(userId, (current) => ({ ...current, history: clone(entries) }))
  }

  getTasks(userId: string): AiTaskEntry[] {
    return clone(this.getState(userId).tasks)
  }

  saveTasks(userId: string, entries: AiTaskEntry[]) {
    this.patchState(userId, (current) => ({ ...current, tasks: clone(entries) }))
  }

  getLocaleBinding(userId: string): AiLocaleBindingState | null {
    return clone(this.getState(userId).localeBinding)
  }

  saveLocaleBinding(userId: string, localeBinding: AiLocaleBindingState | null) {
    this.patchState(userId, (current) => ({ ...current, localeBinding: localeBinding ? clone(localeBinding) : null }))
  }

  getPremiumGrant(userId: string): AiPersistentPremiumGrant | null {
    return clone(this.getState(userId).premiumGrant)
  }

  savePremiumGrant(userId: string, premiumGrant: AiPersistentPremiumGrant | null) {
    this.patchState(userId, (current) => ({ ...current, premiumGrant: premiumGrant ? clone(premiumGrant) : null }))
  }

  getPersonalizationProfile(userId: string): AiPersonalizationProfile | null {
    return clone(this.getState(userId).personalizationProfile)
  }

  savePersonalizationProfile(userId: string, personalizationProfile: AiPersonalizationProfile | null) {
    this.patchState(userId, (current) => ({
      ...current,
      personalizationProfile: personalizationProfile ? clone(personalizationProfile) : null,
    }))
  }

  getSafetyReports(userId: string): AiSafetyAdminReport[] {
    return clone(this.getState(userId).safetyReports)
  }

  saveSafetyReports(userId: string, reports: AiSafetyAdminReport[]) {
    this.patchState(userId, (current) => ({ ...current, safetyReports: clone(reports) }))
  }

  clearUserState(userId: string) {
    const fresh = createEmptyState(userId)
    this.cache.set(userId, fresh)
    this.writeState(userId, fresh)
    return clone(fresh)
  }

  private getState(userId: string): AiPersistentUserState {
    const cached = this.cache.get(userId)
    if (cached) {
      return cached
    }

    const loaded = this.readState(userId)
    this.cache.set(userId, loaded)
    return loaded
  }

  private patchState(
    userId: string,
    updater: (current: AiPersistentUserState) => AiPersistentUserState,
  ) {
    const current = this.getState(userId)
    const next = {
      ...updater(clone(current)),
      version: 1 as const,
      userId,
      savedAt: new Date().toISOString(),
    }
    this.cache.set(userId, next)
    this.writeState(userId, next)
  }

  private getFilePath(userId: string) {
    return join(this.baseDir, `${sanitizeUserId(userId)}.json`)
  }

  private readState(userId: string): AiPersistentUserState {
    const filePath = this.getFilePath(userId)
    if (!existsSync(filePath)) {
      return createEmptyState(userId)
    }

    try {
      const raw = readFileSync(filePath, "utf8")
      const parsed = JSON.parse(raw) as Partial<AiPersistentUserState>
      return {
        ...createEmptyState(userId),
        ...parsed,
        version: 1,
        userId,
        savedAt: typeof parsed.savedAt === "string" ? parsed.savedAt : new Date().toISOString(),
        consentAudit: Array.isArray(parsed.consentAudit) ? parsed.consentAudit : [],
        memory: Array.isArray(parsed.memory) ? parsed.memory : [],
        history: Array.isArray(parsed.history) ? parsed.history : [],
        tasks: Array.isArray(parsed.tasks) ? parsed.tasks : [],
        personalizationProfile: parsed.personalizationProfile ?? null,
        safetyReports: Array.isArray(parsed.safetyReports) ? parsed.safetyReports : [],
      }
    } catch {
      return createEmptyState(userId)
    }
  }

  private writeState(userId: string, state: AiPersistentUserState) {
    const filePath = this.getFilePath(userId)
    const tempPath = `${filePath}.tmp`
    mkdirSync(this.baseDir, { recursive: true })
    writeFileSync(tempPath, `${JSON.stringify(state, null, 2)}
`, "utf8")
    renameSync(tempPath, filePath)
    if (existsSync(tempPath)) {
      unlinkSync(tempPath)
    }
  }
}
