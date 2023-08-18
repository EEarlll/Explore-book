"use client";
import Cards from "@/components/Cards";
import useFetch from "@/hooks/useFetch";
import React from "react";

const page = ({ searchParams }) => {
  const { data, loading, error } = useFetch(
    `https://explore-books.vercel.app/Browse/Query?search=${searchParams.search}`
  );
  return (
    <div className="text-primary">
      <Cards items={data} type={searchParams.search} />
    </div>
  );
};

export default page;
