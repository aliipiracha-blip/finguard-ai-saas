"use client"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { SpendingInsights } from "@/components/dashboard/spending-insights"

export default function SpendingInsightsPage() {
  return (
    <>
      <DashboardHeader title="Spending Insights" />
      <div className="p-6">
        <SpendingInsights />
      </div>
    </>
  )
}
