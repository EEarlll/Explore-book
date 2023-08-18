"use client";
import { Fragment, useEffect, useState } from "react";
import {
  PencilIcon,
  ArrowSmallLeftIcon,
  BookmarkIcon,
} from "@heroicons/react/24/solid";
import useFetch from "@/hooks/useFetch";
import Link from "next/link";
import { auth } from "@/config/firebase";
import { useRouter } from "next/navigation";
import Loading from "./Loading";
import { Dialog, Transition } from "@headlessui/react";
import useAuthorize from "@/hooks/useAuthorize";

const license = {
  summary:
    "You're free to use, modify, and share the PDF on this website for viewing books. Adapt it to your needs and include the original copyright notice. No warranties provided, and the developers aren't liable for any issues.",
};

function formatDate(dateStr) {
  const date = new Date(dateStr);
  const yyyy = date.getFullYear();
  let mm = date.getMonth() + 1;
  let dd = date.getDate();
  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  const formattedDate = dd + "/" + mm + "/" + yyyy;

  return formattedDate;
}

export default function Summary({ item_id }) {
  const router = useRouter();
  const [isOpen, setisOpen] = useState(false);
  const [isBookmarked, setisBookmarked] = useState(false);
  const [highlights, sethighlights] = useState([]);
  const isLoggedIn = useAuthorize(auth);
  const [userId, setuserId] = useState(null);

  const { data, loading, error } = useFetch(
    `https://explore-books.vercel.app/Browse/${item_id}`
  );
  const { data: favorites } = useFetch(
    `https://explore-books.vercel.app/Browse/Bookmark/${userId?.uid}?limit=100000`
  );
  const recommendations = useFetch(
    `https://explore-books.vercel.app/Browse/Category/${data.category}?limit=4&offset=0`
  );

  useEffect(() => {
    if (data) {
      sethighlights([
        "Uploaded by : " + data.creator,
        "Last updated : " + formatDate(data.updatedAt),
        "Category : " + data.category,
      ]);
    }
    if (favorites.length !== 0) {
      setisBookmarked(favorites.some((obj) => obj._id === data._id));
    }
    if (isLoggedIn) {
      setuserId(JSON.parse(localStorage.getItem("userId")));
    }
  }, [data, favorites, isLoggedIn]);

  const downloadPdf = async () => {
    const fileBlob = await fetch(data.fileLocation);
    const blob = await fileBlob.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = data.fileName;
    link.click();
  };

  const deleteData = async () => {
    try {
      const response = await fetch(
        `https://explore-books.vercel.app/Catalogue/${item_id}`,
        { method: "DELETE" }
      );
      router.push("/");
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  const closeModal = () => {
    setisOpen(false);
  };

  const openModal = () => {
    setisOpen(true);
  };

  const handleBookmark = async () => {
    try {
      if (!isBookmarked) {
        await fetch("https://explore-books.vercel.app/Catalogue/Bookmark/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: JSON.parse(localStorage.userId).uid,
            Bookmarks: data._id,
          }),
        });
      } else {
        await fetch(
          "https://explore-books.vercel.app/Catalogue/DeleteBookmark/",
          {
            method: "Delete",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: JSON.parse(localStorage.userId).uid,
              Bookmarks: data._id,
            }),
          }
        );
      }
      setisBookmarked(!isBookmarked);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-4xl px-4 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 min-h-screen">
      {/* Product */}
      <button
        className="text-primary px-4 md:px-8 mb-12"
        onClick={() => history.back()}
      >
        <ArrowSmallLeftIcon className="h-8 w-8 text-primary" />
      </button>
      <div className="lg:grid lg:grid-rows-1 lg:grid-cols-7 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
        {/* Product image */}

        <div className="lg:row-end-1 lg:col-span-4">
          <div className="aspect-w-4 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden">
            {!loading ? (
              <img src={data.Image} className="object-fill" />
            ) : (
              <Loading />
            )}
          </div>
        </div>

        {/* Product details Container*/}
        <div className="max-w-2xl mx-auto mt-14 sm:mt-16 lg:max-w-none lg:mt-0 lg:row-end-2 lg:row-span-2 lg:col-span-3">
          {/* product header container */}
          <div className="flex flex-col-reverse">
            <div className="mt-4">
              <div className="flex justify-between">
                <h1 className="text-2xl font-extrabold tracking-tight text-primary sm:text-3xl">
                  {data.title}
                </h1>
                <div className="flex space-x-4">
                  {userId && userId.uid === data.userId && (
                    <>
                      <Link
                        href={`/Catalogue/edit/${item_id}`}
                        className="flex justify-center items-center"
                      >
                        <PencilIcon className="h-6 w-6 text-primary" />
                      </Link>
                    </>
                  )}
                  {userId && (
                    <>
                      <button type="button" onClick={handleBookmark}>
                        <BookmarkIcon
                          className={`h-6 w-6 ${
                            isBookmarked ? "text-yellow-500" : "text-primary"
                          }`}
                        />
                      </button>
                    </>
                  )}
                </div>
              </div>

              <h2 id="information-heading" className="sr-only">
                Book information
              </h2>
              <p className="text-sm text-accent mt-2">
                {data._id} (Created{" "}
                <time dateTime={data.createdAt}>
                  {formatDate(data.createdAt)}
                </time>
                )
              </p>
            </div>
          </div>

          <p className="text-accent mt-6">{data.Description}</p>

          {/* product buttons */}
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
            <Link
              href={`/Read/${item_id}`}
              className="w-full bg-primary border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-secondary hover:bg-text"
            >
              Read
            </Link>

            <button
              type="button"
              onClick={downloadPdf}
              className="w-full bg-accent border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-secondary hover:bg-primary"
            >
              Download
            </button>
          </div>

          {/* 1st details container */}
          <div className="border-t border-primary mt-10 pt-10">
            <h3 className="text-sm font-medium text-primary">Details</h3>
            <div className="mt-4 prose prose-sm text-accent">
              <ul role="list">
                {highlights.map((highlight, idx) => (
                  <li key={idx} className="break-words">
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* license container */}
          <div className="border-t border-primary mt-10 pt-10">
            <h3 className="text-sm font-medium text-primary">License</h3>
            <p className="mt-4 text-sm text-accent">{license.summary} </p>
          </div>

          {/* share container */}
          <div className="border-t border-primary mt-10 pt-10">
            <h3 className="text-sm font-medium text-primary">View</h3>
            <ul
              role="list"
              className="flex items-center justify-between space-x-6 mt-4"
            >
              <li>
                <a
                  href={data.fileLocation}
                  target="_blank"
                  className="flex items-center justify-center w-6 h-6 text-accent hover:text-primary"
                >
                  <span className="sr-only">View Pdf</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.523 12.424c.14-.082.293-.162.459-.238a7.878 7.878 0 0 1-.45.606c-.28.337-.498.516-.635.572a.266.266 0 0 1-.035.012.282.282 0 0 1-.026-.044c-.056-.11-.054-.216.04-.36.106-.165.319-.354.647-.548zm2.455-1.647c-.119.025-.237.05-.356.078a21.148 21.148 0 0 0 .5-1.05 12.045 12.045 0 0 0 .51.858c-.217.032-.436.07-.654.114zm2.525.939a3.881 3.881 0 0 1-.435-.41c.228.005.434.022.612.054.317.057.466.147.518.209a.095.095 0 0 1 .026.064.436.436 0 0 1-.06.2.307.307 0 0 1-.094.124.107.107 0 0 1-.069.015c-.09-.003-.258-.066-.498-.256zM8.278 6.97c-.04.244-.108.524-.2.829a4.86 4.86 0 0 1-.089-.346c-.076-.353-.087-.63-.046-.822.038-.177.11-.248.196-.283a.517.517 0 0 1 .145-.04c.013.03.028.092.032.198.005.122-.007.277-.038.465z" />{" "}
                    <path
                      fillRule="evenodd"
                      d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm5.5 1.5v2a1 1 0 0 0 1 1h2l-3-3zM4.165 13.668c.09.18.23.343.438.419.207.075.412.04.58-.03.318-.13.635-.436.926-.786.333-.401.683-.927 1.021-1.51a11.651 11.651 0 0 1 1.997-.406c.3.383.61.713.91.95.28.22.603.403.934.417a.856.856 0 0 0 .51-.138c.155-.101.27-.247.354-.416.09-.181.145-.37.138-.563a.844.844 0 0 0-.2-.518c-.226-.27-.596-.4-.96-.465a5.76 5.76 0 0 0-1.335-.05 10.954 10.954 0 0 1-.98-1.686c.25-.66.437-1.284.52-1.794.036-.218.055-.426.048-.614a1.238 1.238 0 0 0-.127-.538.7.7 0 0 0-.477-.365c-.202-.043-.41 0-.601.077-.377.15-.576.47-.651.823-.073.34-.04.736.046 1.136.088.406.238.848.43 1.295a19.697 19.697 0 0 1-1.062 2.227 7.662 7.662 0 0 0-1.482.645c-.37.22-.699.48-.897.787-.21.326-.275.714-.08 1.103z"
                    />
                  </svg>
                </a>
              </li>
              {userId && userId?.uid === data.userId && (
                <>
                  <div className="">
                    <button
                      type="button"
                      onClick={openModal}
                      className="w-full mx-auto bg-[#25171C] border border-[#7A2E2F] rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-text hover:bg-[#803c3d] hover:text-accent"
                    >
                      Delete
                    </button>
                  </div>
                  <Transition appear show={isOpen} as={Fragment}>
                    <Dialog
                      as="div"
                      className="relative z-10"
                      onClose={closeModal}
                    >
                      <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                      </Transition.Child>

                      <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                          <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                          >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-text p-6 text-left align-middle shadow-xl transition-all">
                              <Dialog.Title
                                as="h3"
                                className="text-lg font-medium leading-6 text-secondary"
                              >
                                Confirmation: Delete Book
                              </Dialog.Title>
                              <div className="mt-2">
                                <p className="text-sm text-secondary">
                                  Are you sure you want to delete{" "}
                                  <span className="text-red-500">
                                    {data.title}
                                  </span>
                                  ? This action cannot be undone.
                                </p>
                              </div>

                              <div className="mt-4 flex space-x-4">
                                <button
                                  type="button"
                                  className="bg-[#553440] border border-[#7A2E2F] rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-text hover:bg-[#803c3d] hover:text-accent"
                                  onClick={deleteData}
                                >
                                  Delete
                                </button>
                                <button
                                  type="button"
                                  className="bg-blue-100 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-blue-900 hover:bg-blue-200 "
                                  onClick={closeModal}
                                >
                                  Cancel
                                </button>
                              </div>
                            </Dialog.Panel>
                          </Transition.Child>
                        </div>
                      </div>
                    </Dialog>
                  </Transition>
                </>
              )}
            </ul>
          </div>
        </div>

        {/*  bottom left list last feature */}
        <div className="w-full max-w-2xl mx-auto mt-16 lg:max-w-none lg:mt-0 lg:col-span-4">
          {/* Top tab container */}
          <section className="">
            <h1 className="text-lg font-medium text-primary ">Similar Books</h1>
            <div className="container flex flex-col justify-center pr-4 pt-4 mx-auto">
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {recommendations.data.map((item, idx) => (
                  <div
                    className="hover:bg-secondary rounded-lg relative"
                    key={idx}
                  >
                    <div className="aspect-w-3 aspect-h-5 rounded-lg overflow-hidden">
                      <img className="object-fill" src={item.Image} />
                    </div>
                    <h3 className="text-base font-medium text-text space-x-8 mt-4">
                      <Link href={`/Browse/${item._id}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {item.title}
                      </Link>
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
