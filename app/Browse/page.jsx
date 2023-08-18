"use client";
import Cards from "@/components/Cards";
import useFetch from "@/hooks/useFetch";
import usePagination from "@/hooks/usePagination";
import React, { useState } from "react";

const page = () => {
  const [offset, setoffset] = useState(1);
  const { data, loading, error } = useFetch(
    `https://explore-books.vercel.app/Browse/?limit=20&offset=${offset - 1}`
  );

  const handleClick = (e) => {
    setoffset(e);
  };

  const { pageNumberArray, firstIndex, lastIndex } = usePagination(20, offset);
  return (
    <div>
      <Cards items={data} type={"Books"} />
      <footer className=" px-4 flex items-center justify-between sm:px-0 bg-background">
        <div className="-mt-px w-0 flex-1 flex"></div>
        <div className="flex">
          {pageNumberArray.slice(firstIndex, lastIndex).map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleClick(item)}
              className={`hover:text-primary hover:border-primary border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium ${
                item === offset
                  ? "text-primary border-primary"
                  : "border-transparent text-accent"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="-mt-px w-0 flex-1 flex justify-end"></div>
      </footer>
    </div>
  );
};

export default page;
