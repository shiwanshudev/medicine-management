import Link from "next/link";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <div className="h-14 flex items-center justify-center bg-zinc-900">
      <div className="flex items-center justify-between w-full container px-2 lg:px-0">
        <Link href={"/"} className="font-semibold lg:text-xl text-white">
          Medicine Management
        </Link>
        <Link href="/add-medicine">
          <Button variant={"outline"}>Add Medicine</Button>
        </Link>
      </div>
    </div>
  );
}
