import {
  type AiBusinessAccountingRecord,
  type AiBusinessAnalysisRequest,
  type AiBusinessAnalysisResponse,
  type AiBusinessCategorySummary,
  type AiBusinessCurrencyTotals,
  type AiBusinessInsight,
} from "./ai.types"

function roundAmount(value: number) {
  return Number(value.toFixed(2))
}

function sortByAbsoluteAmountDesc<T extends { amount: number }>(items: T[]): T[] {
  return [...items].sort((a, b) => Math.abs(b.amount) - Math.abs(a.amount))
}

export class AiBusinessAssistantService {
  analyze(request: AiBusinessAnalysisRequest): AiBusinessAnalysisResponse {
    if (!request.userId?.trim()) {
      throw new Error("AI business assistant requires userId")
    }

    if (!Array.isArray(request.records) || request.records.length === 0) {
      throw new Error("AI business assistant requires at least one accounting record")
    }

    const validRecords = request.records.filter((record) => Number.isFinite(record.amount) && record.amount >= 0)
    if (validRecords.length === 0) {
      throw new Error("AI business assistant received no valid accounting records")
    }

    const totalsByCurrency = this.buildCurrencyTotals(validRecords)
    const categoryBreakdown = this.buildCategoryBreakdown(validRecords)
    const topExpenseCategories = sortByAbsoluteAmountDesc(
      categoryBreakdown.filter((item) => item.kind === "expense" || item.kind === "tax"),
    ).slice(0, 5)
    const topIncomeCategories = sortByAbsoluteAmountDesc(
      categoryBreakdown.filter((item) => item.kind === "income" || item.kind === "refund"),
    ).slice(0, 5)

    const aggregated = totalsByCurrency.reduce(
      (acc, item) => {
        acc.income += item.income
        acc.expense += item.expense
        acc.tax += item.tax
        acc.refund += item.refund
        acc.transfer += item.transfer
        acc.net += item.net
        return acc
      },
      {
        income: 0,
        expense: 0,
        tax: 0,
        refund: 0,
        transfer: 0,
        net: 0,
      },
    )

    const expenseRatio = aggregated.income > 0 ? roundAmount(aggregated.expense / aggregated.income) : 0
    const taxRatio = aggregated.income > 0 ? roundAmount(aggregated.tax / aggregated.income) : 0

    const insights = this.buildInsights({
      totalsByCurrency,
      topExpenseCategories,
      topIncomeCategories,
      expenseRatio,
      taxRatio,
      monthlyTargetRevenue: request.monthlyTargetRevenue,
      monthlyTargetNet: request.monthlyTargetNet,
    })

    const recommendedActions = this.buildRecommendedActions({
      totalsByCurrency,
      topExpenseCategories,
      topIncomeCategories,
      expenseRatio,
      monthlyTargetRevenue: request.monthlyTargetRevenue,
      monthlyTargetNet: request.monthlyTargetNet,
    })

    const narrative = this.buildNarrative({
      recordCount: validRecords.length,
      currencies: totalsByCurrency.map((item) => item.currency),
      totalsByCurrency,
      topExpenseCategories,
      expenseRatio,
      taxRatio,
      periodLabel: request.periodLabel,
    })

    return {
      periodLabel: request.periodLabel,
      recordCount: validRecords.length,
      currencies: totalsByCurrency.map((item) => item.currency),
      totalsByCurrency,
      topExpenseCategories,
      topIncomeCategories,
      expenseRatio,
      taxRatio,
      insights,
      recommendedActions,
      narrative,
    }
  }

  private buildCurrencyTotals(records: AiBusinessAccountingRecord[]): AiBusinessCurrencyTotals[] {
    const byCurrency = new Map<string, AiBusinessCurrencyTotals>()

    records.forEach((record) => {
      const currency = record.currency.trim().toUpperCase() || "UNKNOWN"
      const current =
        byCurrency.get(currency) ??
        ({
          currency,
          income: 0,
          expense: 0,
          tax: 0,
          refund: 0,
          transfer: 0,
          net: 0,
        } satisfies AiBusinessCurrencyTotals)

      switch (record.type) {
        case "income":
          current.income = roundAmount(current.income + record.amount)
          current.net = roundAmount(current.net + record.amount)
          break
        case "refund":
          current.refund = roundAmount(current.refund + record.amount)
          current.income = roundAmount(current.income + record.amount)
          current.net = roundAmount(current.net + record.amount)
          break
        case "expense":
          current.expense = roundAmount(current.expense + record.amount)
          current.net = roundAmount(current.net - record.amount)
          break
        case "tax":
          current.tax = roundAmount(current.tax + record.amount)
          current.expense = roundAmount(current.expense + record.amount)
          current.net = roundAmount(current.net - record.amount)
          break
        case "transfer":
          current.transfer = roundAmount(current.transfer + record.amount)
          break
      }

      byCurrency.set(currency, current)
    })

    return [...byCurrency.values()].sort((a, b) => a.currency.localeCompare(b.currency))
  }

  private buildCategoryBreakdown(records: AiBusinessAccountingRecord[]): AiBusinessCategorySummary[] {
    const byKey = new Map<string, AiBusinessCategorySummary>()

    records.forEach((record) => {
      const category = record.category?.trim() || "uncategorized"
      const currency = record.currency.trim().toUpperCase() || "UNKNOWN"
      const key = `${record.type}::${category}::${currency}`
      const current =
        byKey.get(key) ??
        ({
          category,
          currency,
          kind: record.type,
          amount: 0,
          count: 0,
        } satisfies AiBusinessCategorySummary)

      current.amount = roundAmount(current.amount + record.amount)
      current.count += 1
      byKey.set(key, current)
    })

    return [...byKey.values()]
  }

  private buildInsights(input: {
    totalsByCurrency: AiBusinessCurrencyTotals[]
    topExpenseCategories: AiBusinessCategorySummary[]
    topIncomeCategories: AiBusinessCategorySummary[]
    expenseRatio: number
    taxRatio: number
    monthlyTargetRevenue?: number
    monthlyTargetNet?: number
  }): AiBusinessInsight[] {
    const insights: AiBusinessInsight[] = []

    if (input.totalsByCurrency.some((item) => item.net < 0)) {
      insights.push({
        severity: "high",
        code: "negative_net",
        title: "Negative net result detected",
        description: "At least one currency bucket is running at a net loss for the analyzed period.",
      })
    }

    if (input.expenseRatio > 0.8) {
      insights.push({
        severity: input.expenseRatio > 1 ? "high" : "medium",
        code: "expense_ratio_high",
        title: "Expense ratio is high",
        description: `Expenses currently consume ${(input.expenseRatio * 100).toFixed(0)}% of income.`,
      })
    }

    if (input.taxRatio > 0.3) {
      insights.push({
        severity: "medium",
        code: "tax_ratio_high",
        title: "Tax burden is elevated",
        description: `Taxes currently represent ${(input.taxRatio * 100).toFixed(0)}% of income.`,
      })
    }

    const biggestExpense = input.topExpenseCategories[0]
    if (biggestExpense) {
      insights.push({
        severity: "low",
        code: "largest_expense_category",
        title: "Largest expense category identified",
        description: `${biggestExpense.category} is currently the biggest expense category in ${biggestExpense.currency}.`,
      })
    }

    const biggestIncome = input.topIncomeCategories[0]
    if (biggestIncome) {
      insights.push({
        severity: "low",
        code: "largest_income_category",
        title: "Strongest income category identified",
        description: `${biggestIncome.category} is currently the strongest income category in ${biggestIncome.currency}.`,
      })
    }

    if (typeof input.monthlyTargetRevenue === "number") {
      const combinedIncome = input.totalsByCurrency.reduce((sum, item) => sum + item.income, 0)
      if (combinedIncome < input.monthlyTargetRevenue) {
        insights.push({
          severity: "medium",
          code: "revenue_target_gap",
          title: "Revenue target is not yet reached",
          description: `Current income is below the target by ${roundAmount(input.monthlyTargetRevenue - combinedIncome)}.`,
        })
      }
    }

    if (typeof input.monthlyTargetNet === "number") {
      const combinedNet = input.totalsByCurrency.reduce((sum, item) => sum + item.net, 0)
      if (combinedNet < input.monthlyTargetNet) {
        insights.push({
          severity: "medium",
          code: "net_target_gap",
          title: "Net target is not yet reached",
          description: `Current net result is below the target by ${roundAmount(input.monthlyTargetNet - combinedNet)}.`,
        })
      }
    }

    if (insights.length === 0) {
      insights.push({
        severity: "low",
        code: "stable_snapshot",
        title: "Business snapshot looks stable",
        description: "No immediate financial stress signals were detected in the analyzed records.",
      })
    }

    return insights
  }

  private buildRecommendedActions(input: {
    totalsByCurrency: AiBusinessCurrencyTotals[]
    topExpenseCategories: AiBusinessCategorySummary[]
    topIncomeCategories: AiBusinessCategorySummary[]
    expenseRatio: number
    monthlyTargetRevenue?: number
    monthlyTargetNet?: number
  }): string[] {
    const actions: string[] = []

    if (input.totalsByCurrency.some((item) => item.net < 0)) {
      actions.push("Review recurring expenses and cash gaps in the currency buckets that are running negative.")
    }

    if (input.expenseRatio > 0.8) {
      actions.push("Reduce or renegotiate the top expense categories before scaling new spending.")
    }

    const biggestExpense = input.topExpenseCategories[0]
    if (biggestExpense) {
      actions.push(`Audit the ${biggestExpense.category} expense category first, because it has the largest impact.`)
    }

    const biggestIncome = input.topIncomeCategories[0]
    if (biggestIncome) {
      actions.push(`Protect and expand the ${biggestIncome.category} income channel, because it is your strongest source right now.`)
    }

    if (typeof input.monthlyTargetRevenue === "number") {
      actions.push("Compare current income against the monthly revenue target and plan a recovery action if the gap is growing.")
    }

    if (typeof input.monthlyTargetNet === "number") {
      actions.push("Track net profitability separately from revenue so growth does not hide margin erosion.")
    }

    if (actions.length === 0) {
      actions.push("Keep categorizing new records consistently so the business assistant can produce stronger reports.")
    }

    return actions.slice(0, 5)
  }

  private buildNarrative(input: {
    recordCount: number
    currencies: string[]
    totalsByCurrency: AiBusinessCurrencyTotals[]
    topExpenseCategories: AiBusinessCategorySummary[]
    expenseRatio: number
    taxRatio: number
    periodLabel?: string
  }) {
    const periodSegment = input.periodLabel ? ` for ${input.periodLabel}` : ""
    const currencySegment = input.currencies.length > 0 ? input.currencies.join(", ") : "the provided currencies"
    const leadCurrency = input.totalsByCurrency[0]
    const leadExpenseCategory = input.topExpenseCategories[0]?.category

    const core = `Business assistant analyzed ${input.recordCount} records${periodSegment} across ${currencySegment}.`
    const finance = leadCurrency
      ? ` In ${leadCurrency.currency}, income is ${leadCurrency.income}, expenses are ${leadCurrency.expense}, and net is ${leadCurrency.net}.`
      : ""
    const ratio = ` Expense ratio is ${(input.expenseRatio * 100).toFixed(0)}% and tax ratio is ${(input.taxRatio * 100).toFixed(0)}%.`
    const category = leadExpenseCategory
      ? ` The largest expense pressure is currently in ${leadExpenseCategory}.`
      : ""

    return `${core}${finance}${ratio}${category}`.trim()
  }
}
