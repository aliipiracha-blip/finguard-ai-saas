"use client"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { BudgetVsActual } from "@/components/dashboard/budget-vs-actual"

export default function BudgetPage() {
  return (
    <>
      <DashboardHeader title="Budget vs Actual" />
      <div className="p-6">
        <BudgetVsActual />
      </div>
    </>
  )
}
