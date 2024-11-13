"use server";

import { connectDB } from "@/lib/mongodb";
import Medicine from "@/models/Medicine";

import { NextResponse } from "next/server";
interface RequestParamType {
  params: {
    id: string;
  };
}

export async function POST(req: Request, { params }: RequestParamType) {
  //   console.log("API route hit with id: ", params.id);
  try {
    const data = await req.json();
    const updateVal = data.taken === "yes" ? true : false;
    await connectDB();

    const medicneUpdated = await Medicine.findByIdAndUpdate(
      params.id,
      {
        taken: updateVal,
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

export async function DELETE(req: Request, { params }: RequestParamType) {
  try {
    await connectDB();
    const deletedMed = await Medicine.findByIdAndDelete(params.id);
    if (deletedMed)
      return NextResponse.json(
        { message: "Succesfully deleted the medicine!" },
        { status: 200 }
      );
    else
      return NextResponse.json(
        { message: "Error deleting the medicine!" },
        { status: 400 }
      );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error in request" }, { status: 400 });
  }
}
