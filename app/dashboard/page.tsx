import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { KPICards } from "@/components/dashboard/kpi-cards"
import { CashFlowChart } from "@/components/dashboard/cash-flow-chart"
import { RevenueChart } from "@/components/dashboard/revenue-chart"
import { AlertsPanel } from "@/components/dashboard/alerts-panel"
import { AIAssistant } from "@/components/dashboard/ai-assistant"

export default function DashboardPage() {
  return (
    <>
      <DashboardHeader title="Dashboard" />
      <div className="space-y-6 p-6">
        <KPICards />
        <div className="grid gap-6 xl:grid-cols-2">
          <CashFlowChart />
          <RevenueChart />
        </div>
        <div className="grid gap-6 xl:grid-cols-2">
          <AlertsPanel />
          <AIAssistant />
        </div>
      </div>
    </>
  )
}
