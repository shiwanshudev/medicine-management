import { connectDB } from "@/lib/mongodb";
import Image from "next/image";

export default function Home() {
  connectDB();
  return <div></div>;
}
