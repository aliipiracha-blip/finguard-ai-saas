"use client"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { AnomalyAlerts } from "@/components/dashboard/anomaly-alerts"

export default function AnomalyAlertsPage() {
  return (
    <>
      <DashboardHeader title="Anomaly Detection Alerts" />
      <div className="p-6">
        <AnomalyAlerts />
      </div>
    </>
  )
}
