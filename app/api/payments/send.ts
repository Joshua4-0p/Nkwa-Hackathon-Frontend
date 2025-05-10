import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { amount, phoneNumber } = req.body;

  // Validate phone number format
  if (!/^237\d{9}$/.test(phoneNumber)) {
    return res.status(400).json({
      success: false,
      message: "Phone number must be in format 237XXXXXXXXX (12 digits total)",
    });
  }

  // Validate amount
  if (isNaN(Number(amount)) || Number(amount) <= 0) {
    return res.status(400).json({
      success: false,
      message: "Amount must be a positive number",
    });
  }

  try {
    // Call NkwaPay API
    const response = await fetch(
      "https://api.pay.staging.mynkwa.com/disburse",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": process.env.NKWAPAY_API_KEY || "C2MRhhJlcUF_aVV9AR5-p",
        },
        body: JSON.stringify({
          amount: Math.round(Number(amount) * 100), // Convert to cents
          phoneNumber,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Payment failed");
    }

    return res.status(200).json({
      success: true,
      reference: data.id,
      message: "Payment processed successfully",
    });
  } catch (error) {
    console.error("Payment error:", error);
    return res.status(500).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Payment processing failed",
    });
  }
}
