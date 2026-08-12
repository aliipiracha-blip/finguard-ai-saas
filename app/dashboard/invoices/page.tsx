"use client"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { InvoiceGeneration } from "@/components/dashboard/invoice-generation"

export default function InvoicesPage() {
  return (
    <>
      <DashboardHeader title="Invoice Generation" />
      <div className="p-6">
        <InvoiceGeneration />
      </div>
    </>
  )
}
