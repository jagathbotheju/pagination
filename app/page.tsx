import ClientPagination from "@/components/ClientPagination";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center w-full p-4">
      <span className="text-4xl font-bold">Gallery</span>
      <ClientPagination />
    </main>
  );
}
