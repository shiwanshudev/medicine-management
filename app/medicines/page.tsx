import MedicineTable from "@/components/medicine-table";
export default async function Home() {
  try {
    const res = await fetch(`${process.env.URL}/api/medicines`);
    if (!res.ok)
      throw new Error(`Error fetching medicines. Status Code: ${res.status}`);
    const medicines = await res.json();
    return <MedicineTable initialMedicines={medicines} />;
  } catch (error) {
    console.log(error, "Error fetching medicines.");
    return <div>Something went wrong!</div>;
  }
}
