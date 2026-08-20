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
    <div style={{ backgroundColor: "#ffffff", padding: "40px", fontFamily: "Arial, sans-serif", color: "#333333" }} id="invoice-printable">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "40px" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: "bold", color: "#2563eb", marginBottom: "8px", margin: "0 0 8px 0" }}>{companyName}</h1>
          <p style={{ fontSize: "14px", color: "#666666", margin: 0 }}>{companyAddress}</p>
        </div>
        <div style={{ textAlign: "right" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "bold", color: "#2563eb", margin: 0 }}>INVOICE</h2>
          <p style={{ fontSize: "14px", marginTop: "8px", marginBottom: 0 }}>{invoice.invoiceNumber}</p>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "40px", borderBottom: "2px solid #2563eb", paddingBottom: "20px" }}>
        <div>
          <h3 style={{ fontSize: "12px", fontWeight: "600", color: "#666666", textTransform: "uppercase", marginBottom: "8px", margin: 0 }}>Bill To</h3>
          <p style={{ fontWeight: "600", fontSize: "16px", margin: "0 0 4px 0" }}>{invoice.clientName}</p>
          <p style={{ fontSize: "14px", color: "#666666", margin: 0, lineHeight: "1.4" }}>{invoice.clientAddress || invoice.clientEmail}</p>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ marginBottom: "8px" }}>
            <span style={{ fontSize: "14px", color: "#666666" }}>Issue Date: </span>
            <span style={{ fontSize: "14px" }}>{formatDate(invoice.issueDate)}</span>
          </div>
          <div style={{ marginBottom: "8px" }}>
            <span style={{ fontSize: "14px", color: "#666666" }}>Due Date: </span>
            <span style={{ fontSize: "14px", fontWeight: "600" }}>{formatDate(invoice.dueDate)}</span>
          </div>
          <div>
            <span style={{ fontSize: "14px", color: "#666666" }}>Status: </span>
            <span style={{ 
              display: "inline-block",
              padding: "4px 12px",
              borderRadius: "4px",
              fontSize: "12px",
              fontWeight: "500",
              textTransform: "capitalize",
              backgroundColor: invoice.status === "paid" ? "#dcfce7" : invoice.status === "overdue" ? "#fee2e2" : "#dbeafe",
              color: invoice.status === "paid" ? "#166534" : invoice.status === "overdue" ? "#dc2626" : "#2563eb"
            }}>
              {invoice.status}
            </span>
          </div>
        </div>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "40px" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #2563eb" }}>
            <th style={{ textAlign: "left", padding: "16px 8px", fontSize: "14px", fontWeight: "600", color: "#333333" }}>Description</th>
            <th style={{ textAlign: "center", padding: "16px 8px", fontSize: "14px", fontWeight: "600", color: "#333333", width: "80px" }}>Qty</th>
            <th style={{ textAlign: "right", padding: "16px 8px", fontSize: "14px", fontWeight: "600", color: "#333333", width: "120px" }}>Rate</th>
            <th style={{ textAlign: "right", padding: "16px 8px", fontSize: "14px", fontWeight: "600", color: "#333333", width: "120px" }}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item, index) => (
            <tr key={index} style={{ borderBottom: "1px solid #e5e7eb" }}>
              <td style={{ padding: "16px 8px", fontSize: "14px" }}>{item.description}</td>
              <td style={{ padding: "16px 8px", fontSize: "14px", textAlign: "center" }}>{item.quantity}</td>
              <td style={{ padding: "16px 8px", fontSize: "14px", textAlign: "right" }}>{formatCurrency(item.rate)}</td>
              <td style={{ padding: "16px 8px", fontSize: "14px", textAlign: "right", fontWeight: "500" }}>{formatCurrency(item.amount)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "40px" }}>
        <div style={{ width: "280px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #e5e7eb" }}>
            <span style={{ fontSize: "14px", color: "#666666" }}>Subtotal</span>
            <span style={{ fontSize: "14px", fontWeight: "500" }}>{formatCurrency(invoice.subtotal)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #e5e7eb" }}>
            <span style={{ fontSize: "14px", color: "#666666" }}>Tax (8%)</span>
            <span style={{ fontSize: "14px", fontWeight: "500" }}>{formatCurrency(invoice.tax)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "16px", backgroundColor: "#eff6ff", borderRadius: "8px", marginTop: "8px" }}>
            <span style={{ fontWeight: "600", fontSize: "16px" }}>Total</span>
            <span style={{ fontWeight: "700", fontSize: "20px", color: "#2563eb" }}>{formatCurrency(invoice.total)}</span>
          </div>
        </div>
      </div>

      {invoice.notes && (
        <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: "20px" }}>
          <h4 style={{ fontSize: "14px", fontWeight: "600", color: "#666666", marginBottom: "8px", margin: 0 }}>Notes</h4>
          <p style={{ fontSize: "14px", color: "#666666", margin: 0 }}>{invoice.notes}</p>
        </div>
      )}

      <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: "20px", marginTop: "40px", textAlign: "center" }}>
        <p style={{ fontSize: "12px", color: "#666666", margin: 0 }}>Thank you for your business!</p>
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
          <!DOCTYPE html>
          <html>
            <head>
              <title>Invoice ${selectedInvoice?.invoiceNumber}</title>
              <style>
                @page { margin: 10mm; size: A4; }
                body { 
                  print-color-adjust: exact; 
                  -webkit-print-color-adjust: exact; 
                  transform: scale(0.85);
                  transform-origin: top left;
                  width: 117%;
                }
              </style>
            </head>
            <body>${printContent.innerHTML}</body>
          </html>
        `)
        printWindow.document.close()
        printWindow.focus()
        setTimeout(() => { printWindow.print() }, 250)
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
                @page { margin: 10mm; size: A4; }
                body { 
                  print-color-adjust: exact; 
                  -webkit-print-color-adjust: exact; 
                  transform: scale(0.85);
                  transform-origin: top left;
                  width: 117%;
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
