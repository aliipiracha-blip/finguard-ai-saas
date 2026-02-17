"use client"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ShieldAlert, Brain, Activity } from "lucide-react"
import { cn } from "@/lib/utils"
import { flaggedTransactions } from "@/lib/mock-data"

const riskStyles = {
  low: "bg-primary/10 text-primary",
  medium: "bg-warning/20 text-warning-foreground",
  high: "bg-destructive/10 text-destructive",
  critical: "bg-destructive text-destructive-foreground",
}

export default function FraudMonitorPage() {
  const riskScore = 34

  return (
    <>
      <DashboardHeader title="Fraud Monitor" />
      <div className="space-y-6 p-6">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <Card className="border-border/50 bg-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">
                  Overall Risk Score
                </p>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-warning/20">
                  <Activity className="h-4.5 w-4.5 text-warning-foreground" />
                </div>
              </div>
              <div className="mt-4 flex items-end gap-3">
                <p className="text-4xl font-bold text-foreground">{riskScore}</p>
                <p className="mb-1 text-sm text-muted-foreground">/ 100</p>
              </div>
              <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-warning transition-all"
                  style={{ width: `${riskScore}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Moderate risk level - 4 flagged transactions require review
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">
                  Flagged Transactions
                </p>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-destructive/10">
                  <ShieldAlert className="h-4.5 w-4.5 text-destructive" />
                </div>
              </div>
              <p className="mt-3 text-2xl font-bold text-foreground">
                {flaggedTransactions.length}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                1 critical, 1 high, 2 medium risk
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card sm:col-span-2 xl:col-span-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">
                  AI Monitoring Status
                </p>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                  <Brain className="h-4.5 w-4.5 text-primary" />
                </div>
              </div>
              <p className="mt-3 text-2xl font-bold text-primary">Active</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Real-time anomaly detection running on all transactions
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border/50 bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold text-foreground">
              Flagged Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto rounded-lg border border-border/50">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Date
                    </TableHead>
                    <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Description
                    </TableHead>
                    <TableHead className="text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Amount
                    </TableHead>
                    <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Risk Level
                    </TableHead>
                    <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Reason
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {flaggedTransactions.map((tx) => (
                    <TableRow key={tx.id}>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(tx.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </TableCell>
                      <TableCell className="text-sm font-medium text-foreground">
                        {tx.description}
                      </TableCell>
                      <TableCell className="text-right text-sm font-medium font-mono text-foreground">
                        {tx.amount.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={cn(
                            "text-xs font-normal capitalize",
                            riskStyles[tx.riskLevel]
                          )}
                          variant="secondary"
                        >
                          {tx.riskLevel}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-xs text-sm text-muted-foreground">
                        {tx.reason}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base font-semibold text-foreground">
              <Brain className="h-4.5 w-4.5 text-primary" />
              Anomaly Detection Explained
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg bg-muted/30 p-5">
              <p className="text-sm leading-relaxed text-foreground">
                FinGuard AI analyzes your transaction patterns using behavioral
                modeling and statistical anomaly detection. Each transaction is
                scored against your historical data, including timing patterns,
                vendor relationships, amount distributions, and category norms.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Transactions that deviate significantly from established
                patterns are flagged for your review. The system continuously
                learns from your feedback to improve accuracy over time.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
