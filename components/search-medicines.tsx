"use client";
import { Input } from "@/components/ui/input";
import { searchQuery } from "../app/actions";

export default function SearchMedicines() {
  return (
    <form action={searchQuery}>
      <Input
        placeholder="Search medicines..."
        className="mt-5 mb-10 lg:block mx-auto"
        name="search-term"
      />
    </form>
  );
}
