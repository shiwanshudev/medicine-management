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

export default async function Home() {
  const res = await fetch(`http://localhost:3000/api/medicines`);
  const medicines = await res.json();

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
                {/* {
                  <form action={formAction}>
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
                  </form>
                } */}
              </TableCell>
              <TableCell>{medicine.notes}</TableCell>
              <TableCell>
                {/* <Button
                  variant={"destructive"}
                  onClick={() => handleDelete(medicine._id)}
                >
                  Delete
                </Button> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
