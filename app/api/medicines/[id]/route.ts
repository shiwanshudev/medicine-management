"use server";

import { connectDB } from "@/lib/mongodb";
import Medicine from "@/models/Medicine";

import { NextResponse } from "next/server";

type Params = Promise<{ id: string }>;

export async function POST(req: Request, segmentData: { params: Params }) {
  const params = await segmentData.params;
  const id = params.id;
  try {
    const data = await req.json();
    await connectDB();

    const medicneUpdated = await Medicine.findByIdAndUpdate(
      id,
      {
        taken: data.taken,
      },
      { new: true }
    );

    if (!medicneUpdated)
      return NextResponse.json(
        { message: "Error updating the medicine taken status!" },
        { status: 404 }
      );
    return NextResponse.json(
      { message: "Successfully updated the medicine taken status!" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error in request" }, { status: 400 });
  }
}

export async function DELETE(req: Request, segmentData: { params: Params }) {
  const params = await segmentData.params;
  const id = params.id;
  try {
    await connectDB();
    const deletedMed = await Medicine.findByIdAndDelete(id);
    console.log(deletedMed);
    return NextResponse.json(
      { message: "Succesfully deleted the medicine!" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error in request" }, { status: 400 });
  }
}
