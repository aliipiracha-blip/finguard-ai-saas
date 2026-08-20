"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
  Printer,
  X,
  FileDown,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { invoices as initialInvoices, invoiceStats, type Invoice, type InvoiceItem } from "@/lib/mock-data"

const statusStyles = {
  draft: "bg-secondary/50 text-secondary-foreground",
  sent: "bg-primary/10 text-primary",
  paid: "bg-emerald-500/10 text-emerald-600",
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

function generateInvoiceNumber() {
  const year = new Date().getFullYear()
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, "0")
  return `INV-${year}-${random}`
}

interface InvoiceFormData {
  clientName: string
  clientEmail: string
  clientAddress: string
  issueDate: string
  dueDate: string
  items: InvoiceItem[]
  notes: string
}

interface PrintableInvoiceProps {
  invoice: Invoice
  companyName?: string
  companyAddress?: string
}

function PrintableInvoice({ invoice, companyName = "Your Company", companyAddress = "123 Business St, City, State 12345" }: PrintableInvoiceProps) {
  return (
    <div className="bg-white p-8 text-black" id="invoice-printable">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold text-primary">{companyName}</h1>
          <p className="text-sm text-muted-foreground mt-1">{companyAddress}</p>
        </div>
        <div className="text-right">
          <h2 className="text-3xl font-bold text-primary">INVOICE</h2>
          <p className="text-sm mt-1">{invoice.invoiceNumber}</p>
        </div>
      </div>

      <div className="flex justify-between mb-8">
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-1">Bill To</h3>
          <p className="font-medium">{invoice.clientName}</p>
          <p className="text-sm text-muted-foreground">{invoice.clientAddress || invoice.clientEmail}</p>
        </div>
        <div className="text-right">
          <div className="mb-1">
            <span className="text-sm text-muted-foreground">Issue Date: </span>
            <span className="text-sm">{formatDate(invoice.issueDate)}</span>
          </div>
          <div className="mb-1">
            <span className="text-sm text-muted-foreground">Due Date: </span>
            <span className="text-sm font-medium">{formatDate(invoice.dueDate)}</span>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Status: </span>
            <Badge className={cn("ml-1 capitalize", statusStyles[invoice.status])} variant="secondary">
              {invoice.status}
            </Badge>
          </div>
        </div>
      </div>

      <table className="w-full mb-8">
        <thead>
          <tr className="border-b-2 border-primary">
            <th className="text-left py-3 text-sm font-semibold">Description</th>
            <th className="text-center py-3 text-sm font-semibold w-20">Qty</th>
            <th className="text-right py-3 text-sm font-semibold w-28">Rate</th>
            <th className="text-right py-3 text-sm font-semibold w-28">Amount</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item, index) => (
            <tr key={index} className="border-b border-border">
              <td className="py-3 text-sm">{item.description}</td>
              <td className="py-3 text-sm text-center">{item.quantity}</td>
              <td className="py-3 text-sm text-right">{formatCurrency(item.rate)}</td>
              <td className="py-3 text-sm text-right font-medium">{formatCurrency(item.amount)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end mb-8">
        <div className="w-64">
          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-sm text-muted-foreground">Subtotal</span>
            <span className="text-sm font-medium">{formatCurrency(invoice.subtotal)}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-sm text-muted-foreground">Tax</span>
            <span className="text-sm font-medium">{formatCurrency(invoice.tax)}</span>
          </div>
          <div className="flex justify-between py-3 bg-primary/5 rounded-lg px-3 mt-2">
            <span className="font-semibold">Total</span>
            <span className="font-bold text-lg">{formatCurrency(invoice.total)}</span>
          </div>
        </div>
      </div>

      {invoice.notes && (
        <div className="border-t border-border pt-4">
          <h4 className="text-sm font-semibold text-muted-foreground mb-1">Notes</h4>
          <p className="text-sm text-muted-foreground">{invoice.notes}</p>
        </div>
      )}

      <div className="border-t border-border pt-4 mt-8 text-center">
        <p className="text-xs text-muted-foreground">Thank you for your business!</p>
      </div>
    </div>
  )
}

export function InvoiceGeneration() {
  const [invoicesList, setInvoicesList] = useState<Invoice[]>(initialInvoices)
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isPrintDialogOpen, setIsPrintDialogOpen] = useState(false)
  const [formData, setFormData] = useState<InvoiceFormData>({
    clientName: "",
    clientEmail: "",
    clientAddress: "",
    issueDate: new Date().toISOString().split("T")[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    items: [{ description: "", quantity: 1, rate: 0, amount: 0 }],
    notes: "",
  })
  const printRef = useRef<HTMLDivElement>(null)

  const overdueInvoices = invoicesList.filter((i) => i.status === "overdue")
  const paidInvoices = invoicesList.filter((i) => i.status === "paid")

  const handleAddItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { description: "", quantity: 1, rate: 0, amount: 0 }],
    })
  }

  const handleRemoveItem = (index: number) => {
    const newItems = formData.items.filter((_, i) => i !== index)
    setFormData({ ...formData, items: newItems })
  }

  const handleItemChange = (index: number, field: keyof InvoiceItem, value: string | number) => {
    const newItems = [...formData.items]
    newItems[index] = { ...newItems[index], [field]: value }
    if (field === "quantity" || field === "rate") {
      newItems[index].amount = newItems[index].quantity * newItems[index].rate
    }
    setFormData({ ...formData, items: newItems })
  }

  const handleCreateInvoice = () => {
    const subtotal = formData.items.reduce((sum, item) => sum + item.amount, 0)
    const tax = subtotal * 0.08
    const total = subtotal + tax

    const newInvoice: Invoice = {
      id: `inv-${Date.now()}`,
      invoiceNumber: generateInvoiceNumber(),
      clientName: formData.clientName,
      clientEmail: formData.clientEmail,
      clientAddress: formData.clientAddress,
      issueDate: formData.issueDate,
      dueDate: formData.dueDate,
      items: formData.items,
      subtotal,
      tax,
      total,
      status: "draft",
      notes: formData.notes,
    }

    setInvoicesList([newInvoice, ...invoicesList])
    setIsCreateDialogOpen(false)
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      clientName: "",
      clientEmail: "",
      clientAddress: "",
      issueDate: new Date().toISOString().split("T")[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      items: [{ description: "", quantity: 1, rate: 0, amount: 0 }],
      notes: "",
    })
  }

  const handleSendInvoice = (invoice: Invoice) => {
    setInvoicesList(invoicesList.map((i) =>
      i.id === invoice.id ? { ...i, status: "sent" } : i
    ))
    alert(`Invoice ${invoice.invoiceNumber} sent to ${invoice.clientEmail}`)
  }

  const handleDeleteInvoice = (invoiceId: string) => {
    if (confirm("Are you sure you want to delete this invoice?")) {
      setInvoicesList(invoicesList.filter((i) => i.id !== invoiceId))
    }
  }

  const handleMarkAsPaid = (invoice: Invoice) => {
    setInvoicesList(invoicesList.map((i) =>
      i.id === invoice.id ? { ...i, status: "paid" } : i
    ))
  }

  const handlePrintInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice)
    setIsPrintDialogOpen(true)
  }

  const printInvoice = () => {
    const printContent = document.getElementById("invoice-printable")
    if (printContent) {
      const printWindow = window.open("", "_blank")
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Invoice ${selectedInvoice?.invoiceNumber}</title>
              <style>
                body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
                @media print { body { print: both; } }
              </style>
            </head>
            <body>${printContent.innerHTML}</body>
          </html>
        `)
        printWindow.document.close()
        printWindow.print()
      }
    }
  }

  const downloadPDF = () => {
    const printContent = document.getElementById("invoice-printable")
    if (printContent) {
      const printWindow = window.open("", "_blank")
      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Invoice ${selectedInvoice?.invoiceNumber}</title>
              <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { font-family: Arial, sans-serif; padding: 40px; color: #333; }
                .text-primary { color: #2563eb !important; }
                .text-muted-foreground { color: #666 !important; }
                table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
                th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
                th { background-color: #f5f5f5; font-weight: 600; }
                .border-b-2 { border-bottom: 2px solid #2563eb; }
                .bg-primary\/5 { background-color: #eff6ff; }
                .rounded-lg { border-radius: 8px; }
                .font-bold { font-weight: 700; }
                .text-lg { font-size: 18px; }
                .flex { display: flex; }
                .justify-between { justify-content: space-between; }
                .items-start { align-items: flex-start; }
                .mb-8 { margin-bottom: 32px; }
                .mb-1 { margin-bottom: 4px; }
                .mt-1 { margin-top: 4px; }
                .text-2xl { font-size: 24px; }
                .text-xl { font-size: 20px; }
                .text-sm { font-size: 14px; }
                .text-xs { font-size: 12px; }
                .uppercase { text-transform: uppercase; }
                .text-right { text-align: right; }
                .text-center { text-align: center; }
                .border-t { border-top: 1px solid #ddd; }
                .border-border { border-color: #ddd; }
                .pt-4 { padding-top: 16px; }
                .mt-8 { margin-top: 32px; }
                .py-3 { padding-top: 12px; padding-bottom: 12px; }
                .py-2 { padding-top: 8px; padding-bottom: 8px; }
                .px-3 { padding-left: 12px; padding-right: 12px; }
                .w-64 { width: 256px; }
                .text-center { text-align: center; }
                h1 { font-size: 24px; margin-bottom: 4px; }
                h2 { font-size: 20px; }
                h3 { font-size: 14px; text-transform: uppercase; color: #666; margin-bottom: 4px; }
                p { margin-bottom: 4px; }
                @media print {
                  body { padding: 20px; }
                  .no-print { display: none; }
                }
              </style>
            </head>
            <body>${printContent.innerHTML}</body>
          </html>
        `)
        printWindow.document.close()
        setTimeout(() => {
          printWindow.focus()
          printWindow.print()
        }, 250)
      }
    }
  }

  const viewInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice)
    setIsViewDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border/50 bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">Total Outstanding</p>
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
              <p className="text-sm font-medium text-muted-foreground">Overdue Amount</p>
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
              <p className="text-sm font-medium text-muted-foreground">Paid This Month</p>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10">
                <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600" />
              </div>
            </div>
            <p className="mt-3 text-2xl font-bold text-emerald-600">
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
              <p className="text-sm font-medium text-muted-foreground">Avg. Payment Time</p>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary/50">
                <Clock className="h-4.5 w-4.5 text-secondary-foreground" />
              </div>
            </div>
            <p className="mt-3 text-2xl font-bold text-foreground">
              {invoiceStats.averagePaymentTime} days
            </p>
            <p className="mt-1 text-xs text-muted-foreground">Industry average: 21 days</p>
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
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  New Invoice
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create New Invoice</DialogTitle>
                  <DialogDescription>Fill in the details to create a new invoice.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="clientName">Client Name</Label>
                      <Input
                        id="clientName"
                        value={formData.clientName}
                        onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                        placeholder="Acme Corporation"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="clientEmail">Client Email</Label>
                      <Input
                        id="clientEmail"
                        type="email"
                        value={formData.clientEmail}
                        onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                        placeholder="billing@acme.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="clientAddress">Client Address</Label>
                    <Input
                      id="clientAddress"
                      value={formData.clientAddress}
                      onChange={(e) => setFormData({ ...formData, clientAddress: e.target.value })}
                      placeholder="123 Business Ave, Suite 100, City, State 12345"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="issueDate">Issue Date</Label>
                      <Input
                        id="issueDate"
                        type="date"
                        value={formData.issueDate}
                        onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dueDate">Due Date</Label>
                      <Input
                        id="dueDate"
                        type="date"
                        value={formData.dueDate}
                        onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Line Items</Label>
                      <Button type="button" variant="outline" size="sm" onClick={handleAddItem}>
                        <Plus className="h-4 w-4 mr-1" /> Add Item
                      </Button>
                    </div>
                    {formData.items.map((item, index) => (
                      <div key={index} className="flex gap-2 items-end">
                        <div className="flex-1 space-y-1">
                          <Input
                            placeholder="Description"
                            value={item.description}
                            onChange={(e) => handleItemChange(index, "description", e.target.value)}
                          />
                        </div>
                        <div className="w-16 space-y-1">
                          <Label className="text-xs">Qty</Label>
                          <Input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => handleItemChange(index, "quantity", parseInt(e.target.value) || 1)}
                          />
                        </div>
                        <div className="w-24 space-y-1">
                          <Label className="text-xs">Rate ($)</Label>
                          <Input
                            type="number"
                            min="0"
                            step="0.01"
                            value={item.rate}
                            onChange={(e) => handleItemChange(index, "rate", parseFloat(e.target.value) || 0)}
                          />
                        </div>
                        <div className="w-24 space-y-1">
                          <Label className="text-xs">Amount</Label>
                          <div className="h-9 px-3 flex items-center border border-input rounded-md bg-muted text-sm">
                            {formatCurrency(item.amount)}
                          </div>
                        </div>
                        {formData.items.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveItem(index)}
                            className="text-destructive"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes (Optional)</Label>
                    <Input
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Thank you for your business!"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleCreateInvoice} disabled={!formData.clientName || formData.items.every(i => !i.description)}>
                    Create Invoice
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border border-border/50">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Invoice</TableHead>
                  <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Client</TableHead>
                  <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Status</TableHead>
                  <TableHead className="text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">Amount</TableHead>
                  <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Due Date</TableHead>
                  <TableHead className="text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">Actions</TableHead>
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
                          <span className="text-sm font-medium text-foreground">{invoice.invoiceNumber}</span>
                          <span className="text-xs text-muted-foreground">Issued {formatDate(invoice.issueDate)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-foreground">{invoice.clientName}</span>
                          <span className="text-xs text-muted-foreground">{invoice.clientEmail}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={cn("gap-1 text-xs font-normal capitalize", statusStyles[invoice.status])} variant="secondary">
                          <StatusIcon className="h-3 w-3" />
                          {invoice.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="text-sm font-medium font-mono text-foreground">{formatCurrency(invoice.total)}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className={cn("text-sm", isOverdue ? "text-destructive font-medium" : "text-muted-foreground")}>
                            {formatDate(invoice.dueDate)}
                          </span>
                          {invoice.status === "sent" && (
                            <span className={cn("text-xs", daysUntil < 0 ? "text-destructive" : "text-muted-foreground")}>
                              {daysUntil < 0 ? `${Math.abs(daysUntil)} days overdue` : `${daysUntil} days left`}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => viewInvoice(invoice)} title="View">
                            <FileText className="h-4 w-4" />
                          </Button>
                          {invoice.status === "draft" && (
                            <Button variant="ghost" size="icon" className="h-8 w-8" title="Send" onClick={() => handleSendInvoice(invoice)}>
                              <Send className="h-4 w-4" />
                            </Button>
                          )}
                          {invoice.status === "sent" && (
                            <Button variant="ghost" size="icon" className="h-8 w-8" title="Mark as Paid" onClick={() => handleMarkAsPaid(invoice)}>
                              <CheckCircle2 className="h-4 w-4" />
                            </Button>
                          )}
                          <Button variant="ghost" size="icon" className="h-8 w-8" title="Print" onClick={() => handlePrintInvoice(invoice)}>
                            <Printer className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8" title="Email" onClick={() => handleSendInvoice(invoice)}>
                            <Mail className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" title="Delete" onClick={() => handleDeleteInvoice(invoice.id)}>
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
            <CardTitle className="text-base font-semibold text-foreground">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <Plus className="h-5 w-5" />
                    <span className="text-xs">New Invoice</span>
                  </Button>
                </DialogTrigger>
              </Dialog>
              <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => {
                const overdueInvoice = invoicesList.find(i => i.status === "sent" || i.status === "overdue")
                if (overdueInvoice) handleSendInvoice(overdueInvoice)
                else alert("No outstanding invoices to send reminders for")
              }}>
                <Send className="h-5 w-5" />
                <span className="text-xs">Send Reminder</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => {
                const csvContent = [
                  ["Invoice #", "Client", "Status", "Amount", "Due Date"].join(","),
                  ...invoicesList.map(inv => [
                    inv.invoiceNumber,
                    `"${inv.clientName}"`,
                    inv.status,
                    inv.total,
                    inv.dueDate
                  ].join(","))
                ].join("\n")
                const blob = new Blob([csvContent], { type: "text/csv" })
                const url = URL.createObjectURL(blob)
                const a = document.createElement("a")
                a.href = url
                a.download = "invoices.csv"
                a.click()
              }}>
                <Download className="h-5 w-5" />
                <span className="text-xs">Export CSV</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => {
                if (invoicesList.length > 0) {
                  handlePrintInvoice(invoicesList[0])
                }
              }}>
                <FileText className="h-5 w-5" />
                <span className="text-xs">Invoice Report</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold text-foreground">Invoice Tips</CardTitle>
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

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Invoice Details - {selectedInvoice?.invoiceNumber}</DialogTitle>
          </DialogHeader>
          {selectedInvoice && (
            <div className="py-4">
              <PrintableInvoice invoice={selectedInvoice} />
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>Close</Button>
            <Button variant="outline" onClick={printInvoice}>
              <Printer className="h-4 w-4 mr-2" /> Print
            </Button>
            <Button onClick={downloadPDF}>
              <FileDown className="h-4 w-4 mr-2" /> Download PDF
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isPrintDialogOpen} onOpenChange={setIsPrintDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Print Invoice - {selectedInvoice?.invoiceNumber}</DialogTitle>
            <DialogDescription>Click Print to save as PDF or print directly.</DialogDescription>
          </DialogHeader>
          <div className="py-4" ref={printRef}>
            {selectedInvoice && <PrintableInvoice invoice={selectedInvoice} />}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPrintDialogOpen(false)}>Close</Button>
            <Button variant="outline" onClick={printInvoice}>
              <Printer className="h-4 w-4 mr-2" /> Print
            </Button>
            <Button onClick={downloadPDF}>
              <FileDown className="h-4 w-4 mr-2" /> Download PDF
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
