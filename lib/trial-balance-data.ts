export interface TrialBalanceAccount {
  label: string
  type: "asset" | "liability" | "equity" | "revenue" | "expense"
  debit: number
  credit: number
  isContra?: boolean
}

export interface TrialBalanceDiscrepancy {
  id: string
  type: "imbalance" | "negative_asset" | "negative_liability" | "unusual_balance"
  severity: "high" | "medium" | "low"
  description: string
  account?: string
  amount?: number
  suggestion: string
}

export const trialBalanceData = {
  asOf: "Feb 17, 2026",
  accounts: [
    { label: "Cash & Cash Equivalents", type: "asset", debit: 284500, credit: 0 },
    { label: "Accounts Receivable", type: "asset", debit: 67800, credit: 0 },
    { label: "Inventory", type: "asset", debit: 23400, credit: 0 },
    { label: "Prepaid Expenses", type: "asset", debit: 8900, credit: 0 },
    { label: "Property & Equipment", type: "asset", debit: 125000, credit: 0 },
    { label: "Accumulated Depreciation", type: "asset", debit: 0, credit: 42000, isContra: true },
    { label: "Intangible Assets", type: "asset", debit: 35000, credit: 0 },
    { label: "Long-Term Investments", type: "asset", debit: 50000, credit: 0 },
    { label: "Accounts Payable", type: "liability", debit: 0, credit: 34200 },
    { label: "Accrued Expenses", type: "liability", debit: 0, credit: 18500 },
    { label: "Current Portion of Debt", type: "liability", debit: 0, credit: 12000 },
    { label: "Taxes Payable", type: "liability", debit: 0, credit: 15800 },
    { label: "Long-Term Debt", type: "liability", debit: 0, credit: 85000 },
    { label: "Deferred Revenue", type: "liability", debit: 0, credit: 22400 },
    { label: "Common Stock", type: "equity", debit: 0, credit: 100000 },
    { label: "Retained Earnings", type: "equity", debit: 0, credit: 218030 },
    { label: "Current Period Net Income", type: "equity", debit: 0, credit: 46670 },
    { label: "Product Sales", type: "revenue", debit: 0, credit: 145200 },
    { label: "Service Revenue", type: "revenue", debit: 0, credit: 82500 },
    { label: "Subscription Revenue", type: "revenue", debit: 0, credit: 38400 },
    { label: "Other Income", type: "revenue", debit: 0, credit: 4800 },
    { label: "Cost of Goods Sold", type: "expense", debit: 52300, credit: 0 },
    { label: "Service Delivery Costs", type: "expense", debit: 18700, credit: 0 },
    { label: "Salaries & Wages", type: "expense", debit: 85500, credit: 0 },
    { label: "Rent & Utilities", type: "expense", debit: 12400, credit: 0 },
    { label: "Marketing & Advertising", type: "expense", debit: 14200, credit: 0 },
    { label: "Insurance", type: "expense", debit: 3700, credit: 0 },
    { label: "Professional Services", type: "expense", debit: 5600, credit: 0 },
    { label: "Office Supplies", type: "expense", debit: 1890, credit: 0 },
    { label: "Depreciation", type: "expense", debit: 4200, credit: 0 },
    { label: "Interest Expense", type: "expense", debit: 2100, credit: 0 },
    { label: "Tax Expense", type: "expense", debit: 15800, credit: 0 },
  ] as TrialBalanceAccount[],
}

export function formatTBCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function findTrialBalanceDiscrepancies(accounts: TrialBalanceAccount[]): TrialBalanceDiscrepancy[] {
  const discrepancies: TrialBalanceDiscrepancy[] = []
  const totalDebits = accounts.reduce((sum, acc) => sum + acc.debit, 0)
  const totalCredits = accounts.reduce((sum, acc) => sum + acc.credit, 0)
  const difference = Math.abs(totalDebits - totalCredits)

  if (difference > 0) {
    discrepancies.push({
      id: "imbalance-1",
      type: "imbalance",
      severity: difference > 1 ? "high" : "low",
      description: "Trial Balance does not balance. Debits: " + formatTBCurrency(totalDebits) + " vs Credits: " + formatTBCurrency(totalCredits),
      amount: difference,
      suggestion: difference > 1 ? "Review all account postings for errors." : "Possible round-off error.",
    })
  }

  accounts.forEach(acc => {
    if (acc.type === "asset" && !acc.isContra) {
      const balance = acc.debit - acc.credit
      if (balance < 0) {
        discrepancies.push({
          id: "neg-asset-" + acc.label.replace(/\s/g, "-"),
          type: "negative_asset",
          severity: "high",
          description: "Asset account \"" + acc.label + "\" has negative balance",
          account: acc.label,
          amount: balance,
          suggestion: "Assets should normally have debit balances.",
        })
      }
    }
    if (acc.type === "liability") {
      const balance = acc.credit - acc.debit
      if (balance < 0) {
        discrepancies.push({
          id: "neg-liability-" + acc.label.replace(/\s/g, "-"),
          type: "negative_liability",
          severity: "high",
          description: "Liability account \"" + acc.label + "\" has negative balance",
          account: acc.label,
          amount: balance,
          suggestion: "Liabilities should normally have credit balances.",
        })
      }
    }
    if (acc.type === "expense" && acc.credit > acc.debit) {
      discrepancies.push({
        id: "unusual-expense-" + acc.label.replace(/\s/g, "-"),
        type: "unusual_balance",
        severity: "medium",
        description: "Expense account \"" + acc.label + "\" has unusual credit balance",
        account: acc.label,
        amount: acc.credit - acc.debit,
        suggestion: "Expense accounts should normally have debit balances.",
      })
    }
    if (acc.type === "revenue" && acc.debit > acc.credit) {
      discrepancies.push({
        id: "unusual-revenue-" + acc.label.replace(/\s/g, "-"),
        type: "unusual_balance",
        severity: "medium",
        description: "Revenue account \"" + acc.label + "\" has unusual debit balance",
        account: acc.label,
        amount: acc.debit - acc.credit,
        suggestion: "Revenue accounts should normally have credit balances.",
      })
    }
  })

  return discrepancies
}
