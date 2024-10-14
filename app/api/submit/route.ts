"use server";

import { connectDB } from "@/lib/mongodb";
import Medicine from "@/models/Medicine";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("API route hit");
  try {
    const data = await req.json();
    console.log(data); // Log the received data

    await connectDB();

    const { medicineName, notes } = data;
    const newMedicine = new Medicine({ medicineName, notes });

    await newMedicine.save();

    return NextResponse.json(
      { message: "Medicine added successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error in request" }, { status: 400 });
  }
}
