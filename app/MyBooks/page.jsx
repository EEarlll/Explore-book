"use client";
import Cards from "@/components/Cards";
import { auth } from "@/config/firebase";
import useAuthorize from "@/hooks/useAuthorize";
import useFetch from "@/hooks/useFetch";
import usePagination from "@/hooks/usePagination";
import { Tab } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";

const page = () => {
  const [offset, setoffset] = useState(1);
  const isLoggedIn = useAuthorize(auth);
  const [userId, setuserId] = useState(null);
  useEffect(() => {
    if (!isLoggedIn) {
      window.location.href = "/SignIn";
    }
    setuserId(JSON.parse(localStorage.getItem("userId")));
  }, [isLoggedIn]);

  const { data: item } = useFetch(
    `https://explore-books.vercel.app/Browse/UserBook/${
      userId?.uid
    }?limit=20&offset=${offset - 1}`
  );

  const { data: favorites } = useFetch(
    `https://explore-books.vercel.app/Browse/Bookmark/${
      userId?.uid
    }?limit=20&offset=${offset - 1}`
  );

  const { pageNumberUser, pageNumberBookmarked, firstIndex, lastIndex } =
    usePagination(20, offset, `User/${userId?.uid}`);

  const handleClick = (e) => {
    setoffset(e);
  };

  return (
    <div>
      <Tab.Group>
        {/* Tab List*/}
        <Tab.List className="max-w-4xl mx-auto  px-24 sm:pt-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="flex items-center  bg-background border-[#131c2b] border w-fit rounded-lg">
            <Tab
              as={Fragment}
              className="w-full rounded-lg py-2.5 text-sm font-medium leading-5 px-4"
            >
              {({ selected }) => (
                <button
                  className={
                    selected
                      ? "bg-primary"
                      : "bg-background text-text hover:bg-secondary"
                  }
                >
                  My Books
                </button>
              )}
            </Tab>
            <Tab
              as={Fragment}
              className="w-full rounded-lg py-2.5 text-sm font-medium leading-5 px-4"
            >
              {({ selected }) => (
                <button
                  onClick={() => handleClick(1)}
                  className={
                    selected
                      ? "bg-primary"
                      : "bg-background text-text hover:bg-secondary"
                  }
                >
                  Bookmarked
                </button>
              )}
            </Tab>
          </div>
        </Tab.List>
        {/* Tab Items */}
        <Tab.Panels className=" bg-primary">
          <Tab.Panel className="">
            <Cards items={item} type={`My Books - ${userId?.email}`} />

            <footer className=" px-4 flex items-center justify-between sm:px-0 bg-background">
              <div className="-mt-px w-0 flex-1 flex"></div>
              <div className="flex">
                {pageNumberUser
                  .slice(firstIndex, lastIndex)
                  .map((item, idx) => (
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
          </Tab.Panel>
          <Tab.Panel className="">
            <Cards
              items={favorites}
              type={`Bookmarked Books - ${userId?.email}`}
            />
            <footer className=" px-4 flex items-center justify-between sm:px-0 bg-background">
              <div className="-mt-px w-0 flex-1 flex"></div>
              <div className="flex">
                {pageNumberBookmarked
                  .slice(firstIndex, lastIndex)
                  .map((item, idx) => (
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
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default page;
