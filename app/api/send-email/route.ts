import { NextRequest, NextResponse } from "next/server"

interface EmailRequest {
  to: string
  subject: string
  html: string
  from?: string
  type: "invoice" | "document" | "general"
}

export async function POST(request: NextRequest) {
  try {
    const body: EmailRequest = await request.json()
    const { to, subject, html, type } = body

    if (!to || !subject || !html) {
      return NextResponse.json(
        { error: "Missing required fields: to, subject, html" },
        { status: 400 }
      )
    }

    const emailLog = {
      timestamp: new Date().toISOString(),
      to,
      subject,
      type,
      status: "sent",
      messageId: `mock-${Date.now()}@finguard.ai`,
    }

    console.log("=== EMAIL SENT ===")
    console.log("To:", to)
    console.log("Subject:", subject)
    console.log("Type:", type)
    console.log("Time:", emailLog.timestamp)
    console.log("====================")

    return NextResponse.json({
      success: true,
      message: `Email ${type === "invoice" ? "with invoice attached" : ""} sent successfully to ${to}`,
      messageId: emailLog.messageId,
      log: emailLog,
    })
  } catch (error) {
    console.error("Email send error:", error)
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Email API endpoint",
    usage: "POST with { to, subject, html, type }",
    types: ["invoice", "document", "general"],
  })
}
