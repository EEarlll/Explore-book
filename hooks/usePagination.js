import { useEffect, useState } from "react";
import useFetch from "./useFetch";

function TransformToArray(data, limit) {
  const temp = Array.from(
    { length: Math.ceil(data / limit) },
    (_, index) => index + 1
  );
  return temp;
}

const usePagination = (limit, offset, category = "") => {
  const [pageNumberArray, setpageNumberArray] = useState([]);
  const [pageNumberUser, setPageNumberUser] = useState([]);
  const [pageNumberBookmarked, setpageNumberBookmarked] = useState([]);
  const [firstIndex, setfirstIndex] = useState(0);
  const [lastIndex, setlastIndex] = useState(5);

  const pageNumber = useFetch(
    `https://explore-books.vercel.app/Pagination/${category}`
  );
  useEffect(() => {
    if (!pageNumber.loading) {
      setpageNumberArray(TransformToArray(pageNumber.data, limit));
      setPageNumberUser(TransformToArray(pageNumber.data.totaluserBook, limit));
      setpageNumberBookmarked(
        TransformToArray(pageNumber.data.totaluserBookmarked, limit)
      );
    }
  }, [pageNumber.data]);

  useEffect(() => {
    if (offset - 1 === firstIndex && offset - 1 != 0) {
      setfirstIndex((prev) => prev - 1);
      setlastIndex((prev) => prev - 1);
    }
    if (offset === lastIndex) {
      setfirstIndex((prev) => prev + 1);
      setlastIndex((prev) => prev + 1);
    }
    // console.log("offset: ", offset);
    window.scrollTo({ top: 0 });
  }, [offset]);

  return {
    pageNumberArray,
    firstIndex,
    lastIndex,
    pageNumberUser,
    pageNumberBookmarked,
  };
};

export default usePagination;
