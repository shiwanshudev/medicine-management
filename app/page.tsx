import MedicineTable from "@/components/medicine-table";
export default async function Home() {
  const res = await fetch(`http://localhost:3000/api/medicines`);
  const medicines = await res.json();

  return <MedicineTable initialMedicines={medicines} />;
}
