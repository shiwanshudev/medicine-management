import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default async function Home() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center justify-center space-y-4 mt-48">
        <Image
          width={200}
          height={200}
          src={"/images/med.svg"}
          alt="medicine image"
        />
        <h2 className="text-2xl font-semibold">Sign In</h2>

        <Input type="email" placeholder="Email" className="w-full max-w-md" />
        <Input
          type="password"
          placeholder="Password"
          className="w-full max-w-md"
        />
        <Button className="w-full max-w-md">Login</Button>
      </div>
    </div>
  );
}
