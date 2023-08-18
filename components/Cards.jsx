import Link from "next/link";
import { useEffect, useState } from "react";

function truncateString(str, num) {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
}

export default function Cards({ items, type }) {
  const [isHomepage, setisHomepage] = useState(false);
  const [currentPath, setcurrentPath] = useState("/");
  const [isMyBookpage, setisMyBookpage] = useState(false);

  useEffect(() => {
    const browseurl = window.location.origin + "/Browse/";
    setcurrentPath(window.location.href);

    if (window.location.pathname === "/") {
      setisHomepage(!isHomepage);
      setcurrentPath(browseurl);
    } else if (window.location.pathname.split("/")[1] === "Category") {
      setcurrentPath(browseurl);
    } else if (window.location.pathname === "/MyBooks") {
      setisMyBookpage(!isMyBookpage);
      setcurrentPath(browseurl);
    } else if (window.location.pathname === "/Query") {
      setcurrentPath(browseurl);
    }
  }, []);

  return (
    <div className="bg-background">
      {/* parent container */}
      <div className="max-w-4xl mx-auto py-16 px-24 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 min-h-screen">
        {/* title container */}
        <div className="flex items-center justify-between space-x-4">
          <Link
            href={isHomepage ? `Category/${type}` : ""}
            className={
              isHomepage
                ? `text-lg font-medium text-primary hover:text-accent`
                : `text-lg font-medium text-primary `
            }
          >
            <h1>{/%20/.test(type) ? type.replace(/%20/g, " ") : type}</h1>
          </Link>
          {isHomepage && (
            <Link
              href={`Category/${type}`}
              className="whitespace-nowrap text-sm font-medium text-text hover:text-accent"
            >
              View all <span aria-hidden="true"> &rarr;</span>
            </Link>
          )}
          {isMyBookpage && (
            <Link
              href={"Catalogue/add"}
              className="inline-flex items-center p-3 border border-transparent rounded-full shadow-sm text-secondary bg-primary hover:bg-text focus:outline-none"
            >
              <svg
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                ></path>
              </svg>
            </Link>
          )}
        </div>
        {/* main container */}
        <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={item._id}
              className="relative group hover:bg-secondary rounded-lg p-4"
            >
              <div className="aspect-w-3 aspect-h-3 rounded-lg overflow-hidden">
                <img src={item.Image} className="object-fill" />
              </div>
              <div className="mt-4 items-center justify-between text-base font-medium text-text ">
                <h3>
                  <Link href={`${currentPath}/${item._id}`}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {item.title}
                  </Link>
                </h3>
                <p className="text-sm text-primary">{item.category}</p>
              </div>
              <p className="mt-1 text-sm text-accent">
                {truncateString(item.Description, 177)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
