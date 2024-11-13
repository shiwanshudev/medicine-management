"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// export const searchQuery = async (formData: FormData) => {
//   const searchTerm = formData.get("search-term");
// };

export const updateMed = async (taken: string, id: string) => {
  try {
    const response = await fetch(`${process.env.URL}/api/medicines/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        taken: taken === "yes" ? true : false,
      }),
    });
    if (!response.ok)
      throw new Error(
        `Failed to update the medicine. Response Status: ${response.status}`
      );
    revalidatePath("/");
  } catch (error) {
    console.log(error, "Error updating the medicine.");
  }
};

export const addMedicine = async (formData: FormData) => {
  const medicineName = formData.get("medicine-name");
  const notes = formData.get("notes");
  try {
    const response = await fetch(`${process.env.URL}/api/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        medicineName,
        notes,
      }),
    });
    if (!response.ok)
      throw new Error(
        `Failed to add medicine. Response Status: ${response.status}`
      );

    revalidatePath("/");
  } catch (error) {
    console.log(error, "Error adding medicine.");
  } finally {
    redirect("/");
  }
};

export const deleteMed = async (id: string) => {
  try {
    const response = await fetch(`${process.env.URL}/api/medicines/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok)
      throw new Error(
        `Failed to delete the medicine. Response Status: ${response.status}`
      );
    revalidatePath("/");
  } catch (error) {
    console.log(error, "Error deleting the medicine.");
  }
};
