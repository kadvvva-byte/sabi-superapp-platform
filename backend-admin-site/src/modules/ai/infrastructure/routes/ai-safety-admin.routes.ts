import { Router } from "express"
import type { NextFunction, Request, Response } from "express"

import type { AiSafetyAdminApplicationService } from "../../application/services/ai-safety-admin.service"
import type {
  AiSafetyEvidenceKind,
  AiSafetyReportCategory,
  AiSafetyReportStatus,
  AiSafetySeverity,
} from "../../../../core/kernel/ai/ai-safety-admin.types"

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined
}

function asObject(value: unknown): Record<string, unknown> | undefined {
  return typeof value === "object" && value !== null ? (value as Record<string, unknown>) : undefined
}

function asNumber(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) return value
  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : undefined
  }
  return undefined
}

function requireString(value: unknown, errorCode: string): string {
  const normalized = asString(value)
  if (!normalized) throw new Error(errorCode)
  return normalized
}

const CATEGORIES: AiSafetyReportCategory[] = [
  "aml",
  "kyc_evasion",
  "sanctions_evasion",
  "suspicious_transfer",
  "fraud_or_scam",
  "merchant_abuse",
  "bot_financial_abuse",
  "business_account_abuse",
  "coin_abuse",
  "wallet_abuse",
  "qr_payment_abuse",
  "gift_monetization_abuse",
  "terrorism_or_extremism",
  "violent_harm",
  "assassination_or_attack",
  "child_exploitation",
  "dangerous_instructions",
  "self_harm_imminent",
  "narcotics_or_psychotropics",
  "account_takeover",
  "abuse_or_extortion",
]

const SEVERITIES: AiSafetySeverity[] = ["low", "medium", "high", "critical"]
const STATUSES: AiSafetyReportStatus[] = ["new", "admin_review", "hold_active", "emergency_escalated", "law_enforcement_review", "resolved_false_signal", "resolved_violation", "closed"]
const EVIDENCE_KINDS: AiSafetyEvidenceKind[] = ["assistant_prompt", "app_action", "wallet_event", "coin_event", "qr_event", "merchant_event", "bot_event", "message_signal", "voice_transcript", "admin_note", "system_signal"]

function asCategory(value: unknown): AiSafetyReportCategory | undefined {
  return CATEGORIES.includes(value as AiSafetyReportCategory) ? (value as AiSafetyReportCategory) : undefined
}

function asSeverity(value: unknown): AiSafetySeverity | undefined {
  return SEVERITIES.includes(value as AiSafetySeverity) ? (value as AiSafetySeverity) : undefined
}

function asStatus(value: unknown): AiSafetyReportStatus | undefined {
  return STATUSES.includes(value as AiSafetyReportStatus) ? (value as AiSafetyReportStatus) : undefined
}

function asEvidenceKind(value: unknown): AiSafetyEvidenceKind | undefined {
  return EVIDENCE_KINDS.includes(value as AiSafetyEvidenceKind) ? (value as AiSafetyEvidenceKind) : undefined
}

function asRelatedEntities(value: unknown) {
  return Array.isArray(value)
    ? value
        .map((item) => asObject(item))
        .filter((item): item is Record<string, unknown> => Boolean(item))
        .map((item) => ({
          type: requireString(item.type, "ai_safety_related_entity_type_required") as never,
          id: requireString(item.id, "ai_safety_related_entity_id_required"),
          label: asString(item.label),
        }))
    : undefined
}

export function createAiSafetyAdminRouter(aiSafetyAdminService: AiSafetyAdminApplicationService): Router {
  const router = Router()

  router.get("/safety/manifest", (_req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ ok: true, data: aiSafetyAdminService.getManifest() })
    } catch (error) {
      next(error)
    }
  })

  router.get("/safety/policies", (_req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ ok: true, data: aiSafetyAdminService.getPolicies() })
    } catch (error) {
      next(error)
    }
  })

  router.get("/safety/admin/monitor", (_req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ ok: true, data: aiSafetyAdminService.getAdminMonitor() })
    } catch (error) {
      next(error)
    }
  })

  router.get("/safety/admin/reports", (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({
        ok: true,
        data: aiSafetyAdminService.listReports({
          userId: asString(req.query.userId),
          category: asCategory(req.query.category),
          severity: asSeverity(req.query.severity),
          status: asStatus(req.query.status),
          limit: asNumber(req.query.limit),
        }),
      })
    } catch (error) {
      next(error)
    }
  })

  router.get("/safety/admin/reports/:reportId", (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ ok: true, data: aiSafetyAdminService.getReport(requireString(req.params.reportId, "ai_safety_report_id_required")) })
    } catch (error) {
      next(error)
    }
  })

  router.get("/safety/admin/users/:userId/reports", (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({
        ok: true,
        data: aiSafetyAdminService.listUserReports(
          requireString(req.params.userId, "ai_safety_user_id_required"),
          asNumber(req.query.limit),
        ),
      })
    } catch (error) {
      next(error)
    }
  })

  router.patch("/safety/admin/reports/:reportId/status", (req: Request, res: Response, next: NextFunction) => {
    try {
      const status = asStatus(req.body?.status)
      if (!status) throw new Error("ai_safety_report_status_invalid")
      res.json({
        ok: true,
        data: aiSafetyAdminService.updateReportStatus({
          reportId: requireString(req.params.reportId, "ai_safety_report_id_required"),
          status,
          adminUserId: requireString(req.body?.adminUserId, "ai_safety_admin_user_id_required"),
          note: asString(req.body?.note),
        }),
      })
    } catch (error) {
      next(error)
    }
  })

  router.post("/safety/admin/reports/:reportId/note", (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({
        ok: true,
        data: aiSafetyAdminService.addAdminNote({
          reportId: requireString(req.params.reportId, "ai_safety_report_id_required"),
          adminUserId: requireString(req.body?.adminUserId, "ai_safety_admin_user_id_required"),
          note: requireString(req.body?.note, "ai_safety_admin_note_required"),
        }),
      })
    } catch (error) {
      next(error)
    }
  })

  router.get("/safety/:userId/summary", (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ ok: true, data: aiSafetyAdminService.getUserSummary(requireString(req.params.userId, "ai_safety_user_id_required")) })
    } catch (error) {
      next(error)
    }
  })

  router.post("/safety/report", (req: Request, res: Response, next: NextFunction) => {
    try {
      const category = asCategory(req.body?.category)
      if (!category) throw new Error("ai_safety_category_invalid")
      const evidence = Array.isArray(req.body?.evidence)
        ? req.body.evidence.map((item: Record<string, unknown>) => {
            const kind = asEvidenceKind(item.kind)
            if (!kind) throw new Error("ai_safety_evidence_kind_invalid")
            return {
              kind,
              summary: requireString(item.summary, "ai_safety_evidence_summary_required"),
              excerpt: asString(item.excerpt),
              source: asString(item.source),
              metadata: asObject(item.metadata),
            }
          })
        : undefined
      res.json({
        ok: true,
        data: aiSafetyAdminService.createReport({
          userId: requireString(req.body?.userId, "ai_safety_user_id_required"),
          category,
          severity: asSeverity(req.body?.severity),
          title: asString(req.body?.title),
          summary: requireString(req.body?.summary, "ai_safety_summary_required"),
          signals: Array.isArray(req.body?.signals) ? req.body.signals.filter((item: unknown): item is string => typeof item === "string") : undefined,
          evidence,
          relatedEntities: asRelatedEntities(req.body?.relatedEntities),
          metadata: asObject(req.body?.metadata),
          createdBy: req.body?.createdBy === "admin" || req.body?.createdBy === "system" ? req.body.createdBy : "ai_safety_layer",
        }),
      })
    } catch (error) {
      next(error)
    }
  })

  router.post("/safety/:userId/signal", (req: Request, res: Response, next: NextFunction) => {
    try {
      const report = aiSafetyAdminService.reportFromTextSignal({
        userId: requireString(req.params.userId, "ai_safety_user_id_required"),
        text: requireString(req.body?.text, "ai_safety_signal_text_required"),
        source: asString(req.body?.source),
        evidenceKind: asEvidenceKind(req.body?.evidenceKind),
        relatedEntities: asRelatedEntities(req.body?.relatedEntities),
        metadata: asObject(req.body?.metadata),
      })
      res.json({ ok: true, data: { reportCreated: Boolean(report), report } })
    } catch (error) {
      next(error)
    }
  })

  return router
}
