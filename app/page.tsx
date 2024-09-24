import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const medicines = [
  {
    name: "Medicine001",
    taken: "Yes",
    date: "24/09/2024",
    notes: "Before bed",
  },
  {
    name: "Medicine002",
    taken: "No",
    date: "24/09/2024",
    notes: "After breakfast",
  },
  {
    name: "Medicine003",
    taken: "No",
    date: "24/09/2024",
    notes: "Bank Transfer",
  },
  {
    name: "Medicine004",
    taken: "Yes",
    date: "24/09/2024",
    notes: "Before bed",
  },
  {
    name: "Medicine005",
    taken: "Yes",
    date: "24/09/2024",
    notes: "After breakfast",
  },
  {
    name: "Medicine006",
    taken: "No",
    date: "24/09/2024",
    notes: "Bank Transfer",
  },
  {
    name: "Medicine007",
    taken: "No",
    date: "24/09/2024",
    notes: "Before bed",
  },
];

export default function Home() {
  return (
    <div className="container mx-auto">
      <Table>
        <TableCaption>A list of your recent medicines.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Medicine Name</TableHead>
            <TableHead>Taken</TableHead>
            <TableHead className="text-right">Notes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {medicines.map((medicine) => (
            <TableRow key={medicine.name}>
              <TableCell>{medicine.date}</TableCell>
              <TableCell className="font-medium">{medicine.name}</TableCell>
              <TableCell>{medicine.taken}</TableCell>
              <TableCell className="text-right">{medicine.notes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Today's Status</TableCell>
            <TableCell className="text-right">All Taken</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
