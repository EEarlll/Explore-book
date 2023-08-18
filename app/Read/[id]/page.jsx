"use client";
import Loading from "@/components/Loading";
import useFetch from "@/hooks/useFetch";
import "@/styles/global.css";
import { ArrowSmallLeftIcon } from "@heroicons/react/24/solid";

const page = ({ params }) => {
  const { data, loading, error } = useFetch(
    `https://explore-books.vercel.app/Browse/${params.id}`
  );

  return (
    <div className="bg-black">
      <div className="max-w-4xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 min-h-screen">
        <button className="text-primary px-8" onClick={() => history.back()}>
          <ArrowSmallLeftIcon className="h-8 w-8 text-primary" />
        </button>
        <div className="w-full h-screen ">
          {!loading && data.fileLocation ? (
            <iframe
              type="application/pdf"
              className="w-[100%] h-full md:w-[60%] mx-auto rounded-lg border-solid"
              src={
                data.fileLocation +
                "#toolbar=0&navpanes=0&scrollbar=0&view=fitH"
              }
            ></iframe>
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
