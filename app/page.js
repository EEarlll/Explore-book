"use client";
import About from "@/components/About";
import Cards from "@/components/Cards";
import Feature from "@/components/Feature";
import Hero from "@/components/Hero";
import Recent from "@/components/Recent";
import useFetch from "@/hooks/useFetch";
import React, { useEffect, useState } from "react";
import { resources } from "@/config/category";

export default function Home() {
  const [filteredItems, setfilteredItems] = useState([]);
  const { data, loading, error } = useFetch(
    "https://explore-books.vercel.app/Browse/Categories/"
  );

  useEffect(() => {
    if (data) {
      // asign Categories to data
      const res = resources.map((resource, idx) => {
        return data[resource.name];
      });
      setfilteredItems(res);
    }
  }, [data]);

  return (
    <div className="">
      <Hero />
      <Feature />
      {filteredItems[0] &&
        resources.map((resource, idx) => (
          <React.Fragment key={idx}>
            <Cards items={filteredItems[idx]} type={resource.name} key={idx} />
          </React.Fragment>
        ))}
      <Recent />
      <About />
    </div>
  );
}
