import { connectDB } from "@/lib/mongodb";
import Medicine from "@/models/Medicine";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB(); // Await the database connection
    const medicines = await Medicine.find();
    console.log(medicines);
    return NextResponse.json(medicines); // Return the response correctly
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "Error in request" }, { status: 400 });
  }
}
