import MedicineTable from "@/components/medicine-table";
export default async function Home() {
  const res = await fetch(`${process.env.URL}/api/medicines`);
  const medicines = await res.json();

  return <MedicineTable initialMedicines={medicines} />;
}
