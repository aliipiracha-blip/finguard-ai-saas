"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  FileText,
  Plus,
  Send,
  Download,
  MoreHorizontal,
  DollarSign,
  Clock,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Mail,
  Trash2,
  Edit,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { invoices, invoiceStats, type Invoice } from "@/lib/mock-data"
import { useState } from "react"

const statusStyles = {
  draft: "bg-secondary/50 text-secondary-foreground",
  sent: "bg-primary/10 text-primary",
  paid: "bg-primary/10 text-primary",
  overdue: "bg-destructive/10 text-destructive",
  cancelled: "bg-muted text-muted-foreground",
}

const statusIcons = {
  draft: FileText,
  sent: Send,
  paid: CheckCircle2,
  overdue: AlertCircle,
  cancelled: XCircle,
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

function getDaysUntilDue(dueDate: string) {
  const due = new Date(dueDate)
  const now = new Date()
  const diff = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  return diff
}

export function InvoiceGeneration() {
  const [invoicesList, setInvoicesList] = useState(invoices)
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)

  const overdueInvoices = invoicesList.filter((i) => i.status === "overdue")
  const paidInvoices = invoicesList.filter((i) => i.status === "paid")

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border/50 bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">
                Total Outstanding
              </p>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                <DollarSign className="h-4.5 w-4.5 text-primary" />
              </div>
            </div>
            <p className="mt-3 text-2xl font-bold text-foreground">
              {formatCurrency(invoiceStats.totalOutstanding)}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {invoicesList.filter((i) => i.status !== "paid" && i.status !== "cancelled").length} active invoices
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">
                Overdue Amount
              </p>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-destructive/10">
                <AlertCircle className="h-4.5 w-4.5 text-destructive" />
              </div>
            </div>
            <p className="mt-3 text-2xl font-bold text-destructive">
              {formatCurrency(invoiceStats.overdueAmount)}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {overdueInvoices.length} overdue invoice{overdueInvoices.length !== 1 ? "s" : ""}
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">
                Paid This Month
              </p>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                <CheckCircle2 className="h-4.5 w-4.5 text-primary" />
              </div>
            </div>
            <p className="mt-3 text-2xl font-bold text-primary">
              {formatCurrency(invoiceStats.paidThisMonth)}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {paidInvoices.length} payment{paidInvoices.length !== 1 ? "s" : ""} received
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">
                Avg. Payment Time
              </p>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary/50">
                <Clock className="h-4.5 w-4.5 text-secondary-foreground" />
              </div>
            </div>
            <p className="mt-3 text-2xl font-bold text-foreground">
              {invoiceStats.averagePaymentTime} days
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Industry average: 21 days
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/50 bg-card">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-base font-semibold text-foreground">
              <FileText className="h-4.5 w-4.5 text-primary" />
              Invoices
            </CardTitle>
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              New Invoice
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border border-border/50">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Invoice
                  </TableHead>
                  <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Client
                  </TableHead>
                  <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Status
                  </TableHead>
                  <TableHead className="text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Amount
                  </TableHead>
                  <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Due Date
                  </TableHead>
                  <TableHead className="text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoicesList.map((invoice) => {
                  const StatusIcon = statusIcons[invoice.status]
                  const daysUntil = getDaysUntilDue(invoice.dueDate)
                  const isOverdue = invoice.status === "overdue" || (invoice.status === "sent" && daysUntil < 0)

                  return (
                    <TableRow key={invoice.id}>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-foreground">
                            {invoice.invoiceNumber}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            Issued {formatDate(invoice.issueDate)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-foreground">
                            {invoice.clientName}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {invoice.clientEmail}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={cn(
                            "gap-1 text-xs font-normal capitalize",
                            statusStyles[invoice.status]
                          )}
                          variant="secondary"
                        >
                          <StatusIcon className="h-3 w-3" />
                          {invoice.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="text-sm font-medium font-mono text-foreground">
                          {formatCurrency(invoice.total)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className={cn(
                            "text-sm",
                            isOverdue ? "text-destructive font-medium" : "text-muted-foreground"
                          )}>
                            {formatDate(invoice.dueDate)}
                          </span>
                          {invoice.status === "sent" && (
                            <span className={cn(
                              "text-xs",
                              daysUntil < 0 ? "text-destructive" : "text-muted-foreground"
                            )}>
                              {daysUntil < 0 ? `${Math.abs(daysUntil)} days overdue` : `${daysUntil} days left`}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          {invoice.status === "draft" && (
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit className="h-4 w-4" />
                            </Button>
                          )}
                          {invoice.status !== "paid" && invoice.status !== "cancelled" && (
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Send className="h-4 w-4" />
                            </Button>
                          )}
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Mail className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border/50 bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold text-foreground">
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Plus className="h-5 w-5" />
                <span className="text-xs">New Invoice</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Send className="h-5 w-5" />
                <span className="text-xs">Send Reminder</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Download className="h-5 w-5" />
                <span className="text-xs">Export CSV</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <FileText className="h-5 w-5" />
                <span className="text-xs">Invoice Report</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold text-foreground">
              Invoice Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3 rounded-lg bg-muted/30 p-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Get paid faster:</strong> Send invoices immediately after completing work
                </p>
              </div>
              <div className="flex items-start gap-3 rounded-lg bg-muted/30 p-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Clear terms:</strong> Include payment due date and late fees upfront
                </p>
              </div>
              <div className="flex items-start gap-3 rounded-lg bg-muted/30 p-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Recurring billing:</strong> Set up automatic invoices for retainer clients
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
