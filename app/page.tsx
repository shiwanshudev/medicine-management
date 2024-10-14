"use client";
import { useEffect, useState } from "react";
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

type FetchedMedsType = {
  _id: string;
  medicineName: string;
  notes: string;
  createdAt: string;
  taken: boolean;
}[];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [fetchedMedicines, setFetchedMedicines] = useState<FetchedMedsType>([]);

  useEffect(() => {
    const fetchMedicines = async () => {
      const response = await fetch("/api/medicines", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setFetchedMedicines(data);
    };

    fetchMedicines();
  }, []);

  return (
    <div className="container mx-auto lg:px-0 px-2 ">
      <Input
        placeholder="Search medicines..."
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
        className="mt-5 mb-10 lg:block mx-auto"
      />
      <Table>
        {/* <TableCaption>A list of your recent medicines.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead>Created Date</TableHead>
            <TableHead>Medicine Name</TableHead>
            <TableHead>Taken</TableHead>
            <TableHead className="text-right">Notes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fetchedMedicines
            .filter((medicine) => medicine.medicineName.includes(searchTerm))
            .map((medicine) => (
              <TableRow key={medicine.medicineName}>
                <TableCell>{medicine.createdAt}</TableCell>
                <TableCell className="font-medium">
                  {medicine.medicineName}
                </TableCell>
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
