"use client";
import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const [searchTerm, setSearchTerm] = useState<string>("");
  return (
    <div className="container mx-auto">
      <Input
        placeholder="Search medicines..."
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
        className="mt-5 mb-10 lg:w-3/4 lg:block mx-auto"
      />
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
          {medicines
            .filter((medicine) => medicine.name.includes(searchTerm))
            .map((medicine) => (
              <TableRow key={medicine.name}>
                <TableCell>{medicine.date}</TableCell>
                <TableCell className="font-medium">{medicine.name}</TableCell>
                <TableCell>
                  {
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Took medicine?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  }
                </TableCell>
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
