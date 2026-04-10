export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import {
  initializePaystackTransaction,
  generatePaystackReference,
} from "@/lib/paystack-server";
import {
  getViciPackageById,
  getIncludesForPackageId,
  VICI_EXPERIENCE_SLUG,
} from "@/lib/vici-reservation-pricing";

export async function POST(req: NextRequest) {
  const { email, fullName, phone, guests, selectedPackage } = await req.json();

  if (!email || !fullName || !selectedPackage) {
    return NextResponse.json(
      { error: "Missing required fields: email, fullName, and selectedPackage are required" },
      { status: 400 }
    );
  }

  const pkg = getViciPackageById(selectedPackage);
  if (!pkg) {
    return NextResponse.json({ error: "Invalid table package" }, { status: 400 });
  }

  try {
    const reference = generatePaystackReference();
    const base =
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const callbackUrl = `${base}/book-experience/${VICI_EXPERIENCE_SLUG}?session_id=${reference}`;

    const paystackResponse = await initializePaystackTransaction({
      email,
      amount: pkg.amountGhs,
      reference,
      callbackUrl,
      currency: "GHS",
      metadata: {
        type: "vici_table",
        experienceSlug: VICI_EXPERIENCE_SLUG,
        selectedPackage,
        packageTitle: pkg.title,
        amountGhs: pkg.amountGhs.toString(),
        fullName: fullName || "",
        phone: phone || "",
        guests: guests?.toString() ?? "",
        email: email || "",
        packageIncludes: JSON.stringify(getIncludesForPackageId(selectedPackage)),
      },
    });

    if (!paystackResponse.status) {
      throw new Error(paystackResponse.message);
    }

    return NextResponse.json({
      url: paystackResponse.data?.authorization_url,
      reference: paystackResponse.data?.reference,
    });
  } catch (err) {
    console.error("Vici table Paystack error:", err);
    return NextResponse.json(
      {
        error: "Payment initialization failed",
        details: err instanceof Error ? err.message : err,
      },
      { status: 500 }
    );
  }
}
