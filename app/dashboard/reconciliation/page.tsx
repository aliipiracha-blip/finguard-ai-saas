"use client"

import { useState, useMemo } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Landmark,
  BookOpen,
  ArrowRightLeft,
  CheckCircle2,
  AlertTriangle,
  Clock,
  CalendarCheck,
  ChevronDown,
  ChevronUp,
  Download,
} from "lucide-react"
import { reconciliationData } from "@/lib/mock-data"

function formatCurrency(val: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(val)
}

export default function ReconciliationPage() {
  const data = reconciliationData

  // Track which items the user has "cleared"
  const [clearedChecks, setClearedChecks] = useState<Set<string>>(new Set())
  const [clearedDeposits, setClearedDeposits] = useState<Set<string>>(new Set())
  const [clearedBankAdj, setClearedBankAdj] = useState<Set<string>>(new Set())
  const [clearedBookAdj, setClearedBookAdj] = useState<Set<string>>(new Set())
  const [showWorksheet, setShowWorksheet] = useState(true)

  function toggleItem(id: string, set: Set<string>, setter: (s: Set<string>) => void) {
    const next = new Set(set)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setter(next)
  }

  // Calculate the reconciliation
  const totalOutstandingChecks = useMemo(
    () =>
      data.outstandingChecks
        .filter((c) => !clearedChecks.has(c.id))
        .reduce((sum, c) => sum + c.amount, 0),
    [clearedChecks, data.outstandingChecks]
  )

  const totalDepositsInTransit = useMemo(
    () =>
      data.depositsInTransit
        .filter((d) => !clearedDeposits.has(d.id))
        .reduce((sum, d) => sum + d.amount, 0),
    [clearedDeposits, data.depositsInTransit]
  )

  const totalBankAdjustments = useMemo(
    () =>
      data.bankAdjustments
        .filter((a) => !clearedBankAdj.has(a.id))
        .reduce((sum, a) => sum + a.amount, 0),
    [clearedBankAdj, data.bankAdjustments]
  )

  const totalBookAdjustments = useMemo(
    () =>
      data.bookAdjustments
        .filter((a) => !clearedBookAdj.has(a.id))
        .reduce((sum, a) => sum + a.amount, 0),
    [clearedBookAdj, data.bookAdjustments]
  )

  // Adjusted balances
  const adjustedBankBalance =
    data.bankStatementBalance + totalDepositsInTransit + totalOutstandingChecks + totalBankAdjustments
  const adjustedBookBalance =
    data.bookBalance + totalBookAdjustments
  const difference = adjustedBankBalance - adjustedBookBalance
  const isReconciled = Math.abs(difference) < 0.01

  return (
    <>
      <DashboardHeader title="Bank Reconciliation" />
      <div className="p-6 space-y-6">
        {/* Top summary row */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Landmark className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Bank Statement</p>
                <p className="text-lg font-semibold text-foreground truncate">
                  {formatCurrency(data.bankStatementBalance)}
                </p>
                <p className="text-xs text-muted-foreground">{data.bankName}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-chart-2/10">
                <BookOpen className="h-5 w-5 text-chart-2" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Book Balance</p>
                <p className="text-lg font-semibold text-foreground truncate">
                  {formatCurrency(data.bookBalance)}
                </p>
                <p className="text-xs text-muted-foreground">GL Cash Account</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                isReconciled ? "bg-primary/10" : "bg-destructive/10"
              }`}>
                <ArrowRightLeft className={`h-5 w-5 ${isReconciled ? "text-primary" : "text-destructive"}`} />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Difference</p>
                <p className={`text-lg font-semibold truncate ${
                  isReconciled ? "text-primary" : "text-destructive"
                }`}>
                  {formatCurrency(difference)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {isReconciled ? "Balanced" : "Unreconciled"}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-chart-4/10">
                <CalendarCheck className="h-5 w-5 text-chart-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Last Reconciled</p>
                <p className="text-lg font-semibold text-foreground truncate">
                  {new Date(data.lastReconciled).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <p className="text-xs text-muted-foreground">Acct {data.accountNumber}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reconciliation status banner */}
        <div
          className={`rounded-lg px-4 py-3 flex items-center gap-3 ${
            isReconciled
              ? "bg-primary/10 text-primary"
              : "bg-destructive/10 text-destructive"
          }`}
        >
          {isReconciled ? (
            <CheckCircle2 className="h-5 w-5 shrink-0" />
          ) : (
            <AlertTriangle className="h-5 w-5 shrink-0" />
          )}
          <div className="flex-1">
            <p className="text-sm font-medium">
              {isReconciled
                ? "Accounts are reconciled! Adjusted bank and book balances match."
                : `Accounts are not yet reconciled. There is a ${formatCurrency(Math.abs(difference))} difference to resolve.`}
            </p>
            <p className="text-xs opacity-80 mt-0.5">
              Adjusted Bank: {formatCurrency(adjustedBankBalance)} | Adjusted Book: {formatCurrency(adjustedBookBalance)}
            </p>
          </div>
          {isReconciled && (
            <Button size="sm" variant="outline" className="shrink-0 border-primary/30 text-primary hover:bg-primary/10">
              <Download className="h-3.5 w-3.5 mr-1.5" />
              Export
            </Button>
          )}
        </div>

        {/* Main content: Worksheet + History */}
        <Tabs defaultValue="worksheet">
          <TabsList>
            <TabsTrigger value="worksheet">Reconciliation Worksheet</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          {/* WORKSHEET TAB */}
          <TabsContent value="worksheet" className="mt-4 space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Clear items as they are accounted for. The difference will update in real-time.
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowWorksheet(!showWorksheet)}
                className="text-muted-foreground"
              >
                {showWorksheet ? <ChevronUp className="h-4 w-4 mr-1" /> : <ChevronDown className="h-4 w-4 mr-1" />}
                {showWorksheet ? "Collapse" : "Expand"}
              </Button>
            </div>

            {showWorksheet && (
              <div className="grid gap-6 lg:grid-cols-2">
                {/* BANK SIDE */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                    Bank Side
                  </h3>

                  {/* Starting bank balance */}
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Bank Statement Balance</span>
                        <span className="text-sm font-semibold text-foreground font-mono">
                          {formatCurrency(data.bankStatementBalance)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Outstanding Checks */}
                  <Card>
                    <CardHeader className="p-4 pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-medium">
                          Outstanding Checks
                        </CardTitle>
                        <Badge variant="secondary" className="text-xs">
                          {data.outstandingChecks.length - clearedChecks.size} remaining
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 space-y-2">
                      {data.outstandingChecks.map((check) => (
                        <div
                          key={check.id}
                          className={`flex items-center gap-3 rounded-lg border border-border p-3 transition-colors ${
                            clearedChecks.has(check.id) ? "opacity-50 bg-muted/50" : ""
                          }`}
                        >
                          <Checkbox
                            checked={clearedChecks.has(check.id)}
                            onCheckedChange={() => toggleItem(check.id, clearedChecks, setClearedChecks)}
                          />
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-medium text-foreground truncate ${
                              clearedChecks.has(check.id) ? "line-through" : ""
                            }`}>
                              #{check.checkNo} - {check.payee}
                            </p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-xs text-muted-foreground">{check.date}</span>
                              <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" /> {check.daysOutstanding}d
                              </span>
                            </div>
                          </div>
                          <span className="text-sm font-mono font-medium text-destructive shrink-0">
                            {formatCurrency(check.amount)}
                          </span>
                        </div>
                      ))}
                      <div className="flex items-center justify-between pt-2 border-t border-border">
                        <span className="text-xs text-muted-foreground">Subtotal Outstanding</span>
                        <span className="text-sm font-semibold font-mono text-foreground">
                          {formatCurrency(totalOutstandingChecks)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Deposits in Transit */}
                  <Card>
                    <CardHeader className="p-4 pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-medium">
                          Deposits in Transit
                        </CardTitle>
                        <Badge variant="secondary" className="text-xs">
                          {data.depositsInTransit.length - clearedDeposits.size} remaining
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 space-y-2">
                      {data.depositsInTransit.map((dep) => (
                        <div
                          key={dep.id}
                          className={`flex items-center gap-3 rounded-lg border border-border p-3 transition-colors ${
                            clearedDeposits.has(dep.id) ? "opacity-50 bg-muted/50" : ""
                          }`}
                        >
                          <Checkbox
                            checked={clearedDeposits.has(dep.id)}
                            onCheckedChange={() => toggleItem(dep.id, clearedDeposits, setClearedDeposits)}
                          />
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-medium text-foreground truncate ${
                              clearedDeposits.has(dep.id) ? "line-through" : ""
                            }`}>
                              {dep.source}
                            </p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-xs text-muted-foreground">{dep.date}</span>
                              <span className="text-xs text-muted-foreground">
                                Clears ~{new Date(dep.expectedClear).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                              </span>
                            </div>
                          </div>
                          <span className="text-sm font-mono font-medium text-primary shrink-0">
                            {formatCurrency(dep.amount)}
                          </span>
                        </div>
                      ))}
                      <div className="flex items-center justify-between pt-2 border-t border-border">
                        <span className="text-xs text-muted-foreground">Subtotal in Transit</span>
                        <span className="text-sm font-semibold font-mono text-foreground">
                          {formatCurrency(totalDepositsInTransit)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Bank Adjustments */}
                  <Card>
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-sm font-medium">Bank Adjustments</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 space-y-2">
                      {data.bankAdjustments.map((adj) => (
                        <div
                          key={adj.id}
                          className={`flex items-center gap-3 rounded-lg border border-border p-3 transition-colors ${
                            clearedBankAdj.has(adj.id) ? "opacity-50 bg-muted/50" : ""
                          }`}
                        >
                          <Checkbox
                            checked={clearedBankAdj.has(adj.id)}
                            onCheckedChange={() => toggleItem(adj.id, clearedBankAdj, setClearedBankAdj)}
                          />
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-medium text-foreground truncate ${
                              clearedBankAdj.has(adj.id) ? "line-through" : ""
                            }`}>
                              {adj.description}
                            </p>
                            <span className="text-xs text-muted-foreground">{adj.date}</span>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <Badge variant="outline" className="text-xs capitalize">{adj.type}</Badge>
                            <span className={`text-sm font-mono font-medium ${
                              adj.amount < 0 ? "text-destructive" : "text-primary"
                            }`}>
                              {formatCurrency(adj.amount)}
                            </span>
                          </div>
                        </div>
                      ))}
                      <div className="flex items-center justify-between pt-2 border-t border-border">
                        <span className="text-xs text-muted-foreground">Subtotal Adjustments</span>
                        <span className="text-sm font-semibold font-mono text-foreground">
                          {formatCurrency(totalBankAdjustments)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Adjusted Bank Balance */}
                  <Card className="border-2 border-primary/30 bg-primary/5">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-foreground">Adjusted Bank Balance</span>
                        <span className="text-lg font-bold font-mono text-primary">
                          {formatCurrency(adjustedBankBalance)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* BOOK SIDE */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                    Book Side
                  </h3>

                  {/* Starting book balance */}
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Book Balance (GL)</span>
                        <span className="text-sm font-semibold text-foreground font-mono">
                          {formatCurrency(data.bookBalance)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Book Adjustments */}
                  <Card>
                    <CardHeader className="p-4 pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-medium">
                          Book Adjustments
                        </CardTitle>
                        <Badge variant="secondary" className="text-xs">
                          {data.bookAdjustments.length - clearedBookAdj.size} remaining
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 space-y-2">
                      {data.bookAdjustments.map((adj) => (
                        <div
                          key={adj.id}
                          className={`flex items-center gap-3 rounded-lg border border-border p-3 transition-colors ${
                            clearedBookAdj.has(adj.id) ? "opacity-50 bg-muted/50" : ""
                          }`}
                        >
                          <Checkbox
                            checked={clearedBookAdj.has(adj.id)}
                            onCheckedChange={() => toggleItem(adj.id, clearedBookAdj, setClearedBookAdj)}
                          />
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-medium text-foreground truncate ${
                              clearedBookAdj.has(adj.id) ? "line-through" : ""
                            }`}>
                              {adj.description}
                            </p>
                            <span className="text-xs text-muted-foreground">{adj.date}</span>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <Badge variant="outline" className="text-xs capitalize">{adj.type}</Badge>
                            <span className={`text-sm font-mono font-medium ${
                              adj.amount < 0 ? "text-destructive" : "text-primary"
                            }`}>
                              {formatCurrency(adj.amount)}
                            </span>
                          </div>
                        </div>
                      ))}
                      <div className="flex items-center justify-between pt-2 border-t border-border">
                        <span className="text-xs text-muted-foreground">Subtotal Adjustments</span>
                        <span className="text-sm font-semibold font-mono text-foreground">
                          {formatCurrency(totalBookAdjustments)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Adjusted Book Balance */}
                  <Card className="border-2 border-chart-2/30 bg-chart-2/5">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-foreground">Adjusted Book Balance</span>
                        <span className="text-lg font-bold font-mono text-chart-2">
                          {formatCurrency(adjustedBookBalance)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Reconciliation Summary */}
                  <Card className="border-border/50">
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-sm font-medium">Reconciliation Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="space-y-2.5 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Bank Statement Balance</span>
                          <span className="font-mono text-foreground">{formatCurrency(data.bankStatementBalance)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground pl-3">+ Deposits in Transit</span>
                          <span className="font-mono text-primary">{formatCurrency(totalDepositsInTransit)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground pl-3">- Outstanding Checks</span>
                          <span className="font-mono text-destructive">{formatCurrency(totalOutstandingChecks)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground pl-3">+/- Bank Adjustments</span>
                          <span className={`font-mono ${totalBankAdjustments < 0 ? "text-destructive" : "text-primary"}`}>
                            {formatCurrency(totalBankAdjustments)}
                          </span>
                        </div>
                        <div className="border-t border-border pt-2 flex justify-between font-semibold">
                          <span className="text-foreground">Adjusted Bank Balance</span>
                          <span className="font-mono text-foreground">{formatCurrency(adjustedBankBalance)}</span>
                        </div>
                        <div className="h-2" />
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Book Balance (GL)</span>
                          <span className="font-mono text-foreground">{formatCurrency(data.bookBalance)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground pl-3">+/- Book Adjustments</span>
                          <span className={`font-mono ${totalBookAdjustments < 0 ? "text-destructive" : "text-primary"}`}>
                            {formatCurrency(totalBookAdjustments)}
                          </span>
                        </div>
                        <div className="border-t border-border pt-2 flex justify-between font-semibold">
                          <span className="text-foreground">Adjusted Book Balance</span>
                          <span className="font-mono text-foreground">{formatCurrency(adjustedBookBalance)}</span>
                        </div>
                        <div className="h-2" />
                        <div className={`border-t-2 pt-2 flex justify-between font-bold ${
                          isReconciled ? "border-primary" : "border-destructive"
                        }`}>
                          <span className="text-foreground">Difference</span>
                          <span className={`font-mono ${isReconciled ? "text-primary" : "text-destructive"}`}>
                            {formatCurrency(difference)}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </TabsContent>

          {/* HISTORY TAB */}
          <TabsContent value="history" className="mt-4">
            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm font-medium">Reconciliation History</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="px-4 py-3 text-left font-medium text-muted-foreground">Period</th>
                        <th className="px-4 py-3 text-right font-medium text-muted-foreground">Bank Balance</th>
                        <th className="px-4 py-3 text-right font-medium text-muted-foreground">Book Balance</th>
                        <th className="px-4 py-3 text-right font-medium text-muted-foreground">Difference</th>
                        <th className="px-4 py-3 text-right font-medium text-muted-foreground">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.reconciledHistory.map((row, i) => (
                        <tr key={i} className="border-b border-border last:border-0">
                          <td className="px-4 py-3 font-medium text-foreground">{row.month}</td>
                          <td className="px-4 py-3 text-right font-mono text-foreground">
                            {formatCurrency(row.bankBalance)}
                          </td>
                          <td className="px-4 py-3 text-right font-mono text-foreground">
                            {formatCurrency(row.bookBalance)}
                          </td>
                          <td className={`px-4 py-3 text-right font-mono ${
                            row.difference === 0 ? "text-primary" : "text-destructive"
                          }`}>
                            {formatCurrency(row.difference)}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <Badge
                              variant={row.status === "reconciled" ? "default" : "secondary"}
                              className={`text-xs capitalize ${
                                row.status === "reconciled"
                                  ? "bg-primary/10 text-primary hover:bg-primary/10"
                                  : "bg-warning/20 text-warning-foreground hover:bg-warning/20"
                              }`}
                            >
                              {row.status === "reconciled" ? (
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                              ) : (
                                <AlertTriangle className="h-3 w-3 mr-1" />
                              )}
                              {row.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
