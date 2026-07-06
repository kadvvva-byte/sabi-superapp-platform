import type { AiAppActionKey, AiAppActionModule } from "./ai-app-actions.types"
import type {
  AiSafetyApprovalActionCategory,
  AiSafetyApprovalDecision,
  AiSafetyApprovalRequest,
  AiSafetyApprovalRiskLevel,
} from "./ai-safety-approval.types"

const MESSAGE_ACTIONS = new Set<AiAppActionKey>(["prepare_send_message"])
const MONEY_ACTIONS = new Set<AiAppActionKey>(["prepare_send_money"])
const COIN_ACTIONS = new Set<AiAppActionKey>(["prepare_coin_transfer"])
const ACCOUNT_DELETE_ACTIONS = new Set<AiAppActionKey>(["prepare_delete_account"])
const ACCOUNT_SECURITY_ACTIONS = new Set<AiAppActionKey>(["prepare_logout"])
const TASK_ACTIONS = new Set<AiAppActionKey>(["create_ai_task"])
const SETTINGS_MODULES = new Set<AiAppActionModule>(["settings", "profile", "premium", "admin"])

function normalize(value?: string) {
  return (value ?? "").toLowerCase().trim()
}

export class AiSafetyApprovalService {
  getPolicy() {
    return {
      area: "safety_approval",
      status: "ready" as const,
      version: "AI-29.2" as const,
      hardRules: {
        aiNeverSendsMessagesDirectly: true,
        aiNeverMovesMoneyDirectly: true,
        aiNeverConfirmsWalletOrMessengerActionsItself: true,
        accountDeletionCannotBeAutoExecutedByAi: true,
        mobileApiKeysForbidden: true,
        providerGatewaysRequired: true,
      },
    }
  }

  evaluate(input: AiSafetyApprovalRequest): AiSafetyApprovalDecision {
    const category = input.category ?? this.categoryFor(input.actionKey, input.module, input.prompt)
    const riskLevel = this.riskFor(category)
    const requiresTargetModuleConfirmation =
      category === "message_send" ||
      category === "money_movement" ||
      category === "coin_movement" ||
      category === "account_security" ||
      category === "account_delete"

    const blockedReason =
      category === "account_delete"
        ? "AI cannot delete accounts or execute account deletion. It may only open a manual account-deletion confirmation flow."
        : undefined

    const requiresConfirmation =
      Boolean(blockedReason) ||
      requiresTargetModuleConfirmation ||
      category === "settings_change" ||
      category === "task_create"

    return {
      userId: input.userId,
      policyVersion: "AI-29.2",
      category,
      riskLevel,
      allowed: !blockedReason || category === "account_delete",
      autoExecuteAllowed: !input.requestedAutoExecute ? false : riskLevel === "none" || riskLevel === "low",
      requiresConfirmation,
      requiresTargetModuleConfirmation,
      blockedReason,
      confirmationReason: this.confirmationReason(category, blockedReason),
      warnings: this.warningsFor(category, Boolean(input.requestedAutoExecute)),
    }
  }

  private categoryFor(
    actionKey?: AiAppActionKey,
    module?: AiAppActionModule,
    prompt?: string,
  ): AiSafetyApprovalActionCategory {
    if (actionKey && MESSAGE_ACTIONS.has(actionKey)) return "message_send"
    if (actionKey && MONEY_ACTIONS.has(actionKey)) return "money_movement"
    if (actionKey && COIN_ACTIONS.has(actionKey)) return "coin_movement"
    if (actionKey && ACCOUNT_DELETE_ACTIONS.has(actionKey)) return "account_delete"
    if (actionKey && ACCOUNT_SECURITY_ACTIONS.has(actionKey)) return "account_security"
    if (actionKey && TASK_ACTIONS.has(actionKey)) return "task_create"

    const text = normalize(prompt)
    if (/(send|отправ|напиши).*(message|сообщ|чат)/.test(text)) return "message_send"
    if (/(send|transfer|pay|переведи|оплат|отправ).*(money|деньг|сум|wallet|кошел|валет)/.test(text)) return "money_movement"
    if (/(send|transfer|переведи|отправ).*(coin|коин)/.test(text)) return "coin_movement"
    if (/(delete|remove|удал).*(account|аккаунт)/.test(text)) return "account_delete"
    if (/(logout|sign out|выйти|выход)/.test(text)) return "account_security"

    if (module && SETTINGS_MODULES.has(module)) return "settings_change"
    if (module && ["wallet", "coin_wallet"].includes(module)) return "money_movement"
    if (module === "messenger") return "navigation"
    if (module) return "navigation"

    return "read_only"
  }

  private riskFor(category: AiSafetyApprovalActionCategory): AiSafetyApprovalRiskLevel {
    if (category === "money_movement" || category === "coin_movement" || category === "account_delete") return "high"
    if (category === "message_send" || category === "account_security" || category === "settings_change" || category === "task_create") return "medium"
    if (category === "navigation") return "low"
    if (category === "read_only") return "none"
    return "medium"
  }

  private confirmationReason(category: AiSafetyApprovalActionCategory, blockedReason?: string) {
    if (blockedReason) return blockedReason
    if (category === "message_send") return "AI may prepare text, but the user must confirm sending inside Messenger."
    if (category === "money_movement") return "AI may prepare a transfer, but the user must confirm inside Wallet. AI never moves money by itself."
    if (category === "coin_movement") return "AI may prepare a COIN transfer, but the user must confirm inside Coin Wallet."
    if (category === "account_security") return "Account security actions require explicit user confirmation."
    if (category === "settings_change") return "Settings changes require explicit user confirmation."
    if (category === "task_create") return "Task creation is prepared first and waits for user confirmation."
    return "Read-only and safe navigation actions do not need extra approval."
  }

  private warningsFor(category: AiSafetyApprovalActionCategory, requestedAutoExecute: boolean) {
    const warnings: string[] = []
    if (requestedAutoExecute && category !== "read_only" && category !== "navigation") {
      warnings.push("auto_execute_denied_for_sensitive_action")
    }
    if (category === "message_send") warnings.push("messenger_send_must_be_user_confirmed")
    if (category === "money_movement" || category === "coin_movement") warnings.push("wallet_movement_must_be_user_confirmed")
    if (category === "account_delete") warnings.push("account_deletion_blocked_for_ai_auto_run")
    return warnings
  }
}
