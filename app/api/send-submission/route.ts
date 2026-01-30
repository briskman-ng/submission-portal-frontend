// app/api/send-submission/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log("Received submission:", data);

    // send to ZeptoMail
    const response = await fetch("https://api.zeptomail.com/v1.1/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Zoho-enczapikey ${process.env.ZEPTOMAIL_API_KEY}`, 
      },
      body: JSON.stringify({
        from: { address: "noreply@nddcautomation.ng", name: "Submission Portal" },
        to: [{ email_address: { address: "mitchelokorie@gmail.com", name: "NDDC Automation" } }],
        subject: `New Submission: ${data.subject}`,
        htmlbody: `
          <p><strong>Type:</strong> ${data.type}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <p><strong>Description:</strong></p>
          <p>${data.description}</p>
        `,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("ZeptoMail error:", errorText);
      return NextResponse.json({ error: "Email failed" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// GET handler for testing in browser
export async function GET() {
  return NextResponse.json({
    message: "Send a POST request to this endpoint",
    example: {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ test: "data" }),
    },
  });
}
