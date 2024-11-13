"use client";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
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

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

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
  const [loader, setLoader] = useState(false);

  // Local API Calls
  const fetchMedicines = async () => {
    setLoader(true);
    const response = await fetch("/api/medicines", {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    setFetchedMedicines(data);
    setLoader(false);
  };

  const updateMedicineTaken = async (value: string, id: string) => {
    const response = await fetch(`/api/medicines/${id}`, {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ taken: value }),
    });
    const data = await response.json();
    console.log(data);
    fetchMedicines();
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const handleMedicineTaken = (value: string, id: string) => {
    updateMedicineTaken(value, id);
  };
  const handleDelete = async (id: string) => {
    const response = await fetch(`/api/medicines/${id}`, {
      method: "DELETE",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    fetchMedicines();
  };
  return (
    <div className="container mx-auto lg:px-0 px-2 ">
      <Input
        placeholder="Search medicines..."
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
        className="mt-5 mb-10 lg:block mx-auto"
      />
      {loader && (
        <div className="text-center top-2/4 left-2/4 fixed h-screen w-full">
          <AiOutlineLoading3Quarters className="animate-spin text-2xl block" />
        </div>
      )}
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
          {fetchedMedicines
            .filter((medicine) =>
              medicine.medicineName
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            )
            .map((medicine) => (
              <TableRow key={medicine.medicineName}>
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
                      onValueChange={(e) =>
                        handleMedicineTaken(e, medicine._id)
                      }
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
