import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { TransactionsTable } from "@/components/dashboard/transactions-table"

export default function TransactionsPage() {
  return (
    <>
      <DashboardHeader title="Transactions" />
      <div className="p-6">
        <TransactionsTable />
      </div>
    </>
  )
}
