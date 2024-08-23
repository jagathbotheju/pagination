"use client";
import Image from "next/image";
import { Card } from "./ui/card";
import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import ClientPaginationCom from "./ClientPaginationCom";
import { Loader2 } from "lucide-react";

const ClientPagination = () => {
  const [data, setData] = useState<{ image: string }[]>([]);
  const [mount, setMount] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = data.slice(firstItemIndex, lastItemIndex);

  const generateFakeData = () => {
    const newImage = faker.image.urlPicsumPhotos();
    return { image: newImage };
  };

  const resetLocalStorage = () => {
    localStorage.removeItem("images");
    setData([]);
  };

  useEffect(() => {
    const storedData = localStorage.getItem("images");
    if (storedData) {
      setData(JSON.parse(storedData));
    } else {
      const newData = Array.from({ length: 30 }, generateFakeData);
      setData(newData);
      localStorage.setItem("images", JSON.stringify(newData));
    }
    setMount(true);
  }, []);

  if (!mount) {
    return (
      <div className="flex w-full mt-10 mx-auto justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <Button onClick={resetLocalStorage} className="my-8">
        Reset
      </Button>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-5">
        {currentItems.map((item, index) => (
          <Card
            key={index}
            className="items-start flex overflow-hidden text-black"
          >
            <div className="group">
              <Image
                src={item.image}
                alt="image"
                width={640}
                height={480}
                className="h-full w-full transform object-cover transition-all duration-200 group-hover:scale-105 rounded"
              />
            </div>
          </Card>
        ))}
      </div>

      <ClientPaginationCom
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={data.length}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};
export default ClientPagination;
