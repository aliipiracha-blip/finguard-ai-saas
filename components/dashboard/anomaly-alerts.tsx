"use client"

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
import {
  ShieldAlert,
  Bell,
  BellOff,
  AlertTriangle,
  Zap,
  Clock,
  MapPin,
  Repeat,
  CreditCard,
  CheckCircle2,
  XCircle,
  Copy,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { anomalyAlerts } from "@/lib/mock-data"
import { useState } from "react"

const severityStyles = {
  high: "bg-destructive/10 text-destructive",
  medium: "bg-warning/20 text-warning-foreground",
  low: "bg-primary/10 text-primary",
}

const categoryIcons = {
  wire_transfer: Zap,
  recurring: Repeat,
  duplicate: Copy,
  timing: Clock,
  location: MapPin,
  transaction: CreditCard,
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

function formatTimeAgo(timestamp: string) {
  const date = new Date(timestamp)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffHours / 24)

  if (diffDays > 0) return `${diffDays}d ago`
  if (diffHours > 0) return `${diffHours}h ago`
  return "Just now"
}

export function AnomalyAlerts() {
  const [alerts, setAlerts] = useState(anomalyAlerts)
  const [showDismissed, setShowDismissed] = useState(false)

  const activeAlerts = alerts.filter((a) => !a.dismissed)
  const highSeverity = activeAlerts.filter((a) => a.severity === "high")
  const actionRequired = activeAlerts.filter((a) => a.actionRequired)

  const dismissAlert = (id: string) => {
    setAlerts(alerts.map((a) => (a.id === id ? { ...a, dismissed: true } : a)))
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border/50 bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">
                Active Alerts
              </p>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-destructive/10">
                <Bell className="h-4.5 w-4.5 text-destructive" />
              </div>
            </div>
            <p className="mt-3 text-2xl font-bold text-foreground">
              {activeAlerts.length}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {highSeverity.length} high severity
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">
                Action Required
              </p>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-warning/20">
                <AlertTriangle className="h-4.5 w-4.5 text-warning" />
              </div>
            </div>
            <p className="mt-3 text-2xl font-bold text-warning">
              {actionRequired.length}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Require immediate attention
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">
                Total Flagged Amount
              </p>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary/50">
                <ShieldAlert className="h-4.5 w-4.5 text-secondary-foreground" />
              </div>
            </div>
            <p className="mt-3 text-2xl font-bold text-foreground">
              {formatCurrency(activeAlerts.reduce((sum, a) => sum + Math.abs(a.amount), 0))}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Across {activeAlerts.length} transactions
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">
                Detection Status
              </p>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                <Zap className="h-4.5 w-4.5 text-primary" />
              </div>
            </div>
            <p className="mt-3 text-2xl font-bold text-primary">Active</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Monitoring all accounts 24/7
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/50 bg-card">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-base font-semibold text-foreground">
              <ShieldAlert className="h-4.5 w-4.5 text-destructive" />
              Anomaly Detection Alerts
            </CardTitle>
            <button
              onClick={() => setShowDismissed(!showDismissed)}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
            >
              {showDismissed ? (
                <>
                  <BellOff className="h-3.5 w-3.5" />
                  Hide Dismissed
                </>
              ) : (
                <>
                  <Bell className="h-3.5 w-3.5" />
                  Show Dismissed
                </>
              )}
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeAlerts.map((alert) => (
              <div
                key={alert.id}
                className={cn(
                  "rounded-lg border p-4 transition-colors",
                  alert.severity === "high" && "border-destructive/50 bg-destructive/5",
                  alert.severity === "medium" && "border-warning/50 bg-warning/5",
                  alert.severity === "low" && "border-border/50 bg-card"
                )}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      "mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                      alert.severity === "high" && "bg-destructive/10",
                      alert.severity === "medium" && "bg-warning/20",
                      alert.severity === "low" && "bg-primary/10"
                    )}
                  >
                    {alert.severity === "high" ? (
                      <AlertTriangle className="h-5 w-5 text-destructive" />
                    ) : alert.severity === "medium" ? (
                      <Bell className="h-5 w-5 text-warning" />
                    ) : (
                      <ShieldAlert className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm font-semibold text-foreground">
                        {alert.title}
                      </h4>
                      <Badge
                        className={cn("text-xs font-normal", severityStyles[alert.severity])}
                        variant="secondary"
                      >
                        {alert.severity}
                      </Badge>
                      {alert.actionRequired && (
                        <Badge
                          className="bg-destructive/10 text-destructive text-xs font-normal"
                          variant="secondary"
                        >
                          Action Required
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {alert.description}
                    </p>
                    <div className="flex items-center gap-4 pt-2">
                      <span className="text-xs font-medium text-foreground">
                        Amount: {formatCurrency(alert.amount)}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatTimeAgo(alert.timestamp)}
                      </span>
                      <span className="rounded-md bg-muted/50 px-2 py-0.5 text-xs text-muted-foreground capitalize">
                        {alert.category.replace("_", " ")}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => dismissAlert(alert.id)}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    <XCircle className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}

            {activeAlerts.length === 0 && (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <CheckCircle2 className="h-12 w-12 text-primary/50" />
                <p className="mt-3 text-sm font-medium text-foreground">
                  All Clear
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  No anomaly alerts at this time
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base font-semibold text-foreground">
            <ShieldAlert className="h-4.5 w-4.5 text-primary" />
            Detection Rules Explained
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg bg-muted/30 p-5">
            <p className="text-sm leading-relaxed text-foreground">
              FinGuard AI monitors your transactions using multiple anomaly detection methods:
            </p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                <strong className="text-foreground">Amount Analysis:</strong> Flags transactions that deviate significantly from your historical spending patterns
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <strong className="text-foreground">Time Anomaly:</strong> Detects transactions outside your normal business hours
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <strong className="text-foreground">Location Tracking:</strong> Identifies impossible travel scenarios or unusual locations
              </li>
              <li className="flex items-center gap-2">
                <Repeat className="h-4 w-4 text-primary" />
                <strong className="text-foreground">Duplicate Detection:</strong> Catches potential duplicate charges or recurring payment anomalies
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
