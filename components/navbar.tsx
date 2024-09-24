import Link from "next/link";

export default function Navbar() {
  return (
    <div className="h-14 flex items-center justify-center bg-zinc-100">
      <Link href={"/"} className="font-semibold text-xl text-zinc-500">
        Medicine Management
      </Link>
    </div>
  );
}
