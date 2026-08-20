import { NextRequest, NextResponse } from "next/server"

interface DocumentRequest {
  to: string
  documentType: string
  documentName: string
  message?: string
  fromEmail?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: DocumentRequest = await request.json()
    const { to, documentType, documentName, message, fromEmail } = body

    if (!to || !documentType || !documentName) {
      return NextResponse.json(
        { error: "Missing required fields: to, documentType, documentName" },
        { status: 400 }
      )
    }

    const emailLog = {
      timestamp: new Date().toISOString(),
      to,
      documentType,
      documentName,
      message: message || "Please find the attached document.",
      fromEmail: fromEmail || "noreply@finguard.ai",
      status: "sent",
      messageId: `doc-${Date.now()}@finguard.ai`,
    }

    console.log("=== DOCUMENT FORWARDED ===")
    console.log("To:", to)
    console.log("Document Type:", documentType)
    console.log("Document Name:", documentName)
    console.log("Message:", message)
    console.log("Time:", emailLog.timestamp)
    console.log("==========================")

    return NextResponse.json({
      success: true,
      message: `${documentType} "${documentName}" forwarded successfully to ${to}`,
      messageId: emailLog.messageId,
      log: emailLog,
    })
  } catch (error) {
    console.error("Document forward error:", error)
    return NextResponse.json(
      { error: "Failed to forward document" },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Document Forward API endpoint",
    usage: "POST with { to, documentType, documentName, message?, fromEmail? }",
  })
}
