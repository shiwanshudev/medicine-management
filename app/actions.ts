"use server";

import { revalidatePath } from "next/cache";

export const searchQuery = async (formData: FormData) => {
  const searchTerm = formData.get("search-term");
};

export const updateMed = async (taken: string, id: string) => {
  const updatedMed = await fetch(`http://localhost:3000/api/medicines/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      taken: taken === "yes" ? true : false,
    }),
  });

  console.log("UPDATED", updateMed);
  revalidatePath("/");
};
