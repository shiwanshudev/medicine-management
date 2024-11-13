"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateMed, deleteMed } from "@/app/actions";

import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type FetchedMedsType = {
  _id: string;
  medicineName: string;
  notes: string;
  createdAt: string;
  taken: boolean;
}[];

export default function MedicineTable({
  initialMedicines,
}: {
  initialMedicines: FetchedMedsType;
}) {
  const [medicines, setMedicines] = useState(initialMedicines);
  const handleDelete = async (id: string) => {
    await deleteMed(id);
    setMedicines((prevMeds) => {
      return prevMeds.filter((medicine) => medicine._id !== id);
    });
  };
  return (
    <div className="container mx-auto lg:px-0 px-2 ">
      {/* <SearchMedicines /> */}
      <Table>
        {/* <TableCaption>A list of your recent medicines.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead>Created Date</TableHead>
            <TableHead>Medicine Name</TableHead>
            <TableHead>Taken</TableHead>
            <TableHead>Notes</TableHead>
            <TableHead>Options</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {medicines.map((medicine) => (
            <TableRow key={medicine._id}>
              <TableCell>
                {format(new Date(medicine.createdAt), "dd MMM yyyy")}
              </TableCell>
              <TableCell className="font-medium">
                {medicine.medicineName}
              </TableCell>
              <TableCell>
                {
                  <Select
                    defaultValue={medicine.taken ? "yes" : "no"}
                    onValueChange={(e) => updateMed(e, medicine._id)}
                    name="med-taken"
                  >
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
              <TableCell>{medicine.notes}</TableCell>
              <TableCell>
                <Button
                  variant={"destructive"}
                  onClick={() => handleDelete(medicine._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
