"use client";
import FormLayout from "@/components/FormLayout";
import { auth } from "@/config/firebase";
import useFetch from "@/hooks/useFetch";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const page = ({ params }) => {
  const router = useRouter();
  const [isLoading, setisLoading] = useState(false);
  const [fileName, setfileName] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/SignIn");
      }
    });
  }, []);

  const { data, loading, error } = useFetch(
    `https://explore-books.vercel.app/Browse/${params.id}`
  );
  const [formData, setformData] = useState({
    title: "",
    fileLocation: "",
    fileName: "",
    oldFileName: "",
    Image: "",
    ImageName: "",
    oldImageName: "",
    Description: "",
    category: "Fiction",
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const user_FormData = new FormData();
      for (const i in formData) {
        user_FormData.append(i, formData[i]);
      }
      setisLoading(true);
      const response = await fetch(
        `https://explore-books.vercel.app/Catalogue/${params.id}`,
        {
          method: "PUT",
          body: user_FormData,
        }
      );
      if (response.ok) {
        console.log("edit successful");
      }
      setisLoading(false);
    } catch (error) {
      console.log(error);
      setisLoading(false);
    }
  };

  const handleFormChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDrop = (e) => {
    if (e.target.files[0]) {
      if (e.target.name === "Image") {
        setfileName(e.target.files[0].name);
      }
      setformData({
        ...formData,
        [e.target.name]: e.target.files[0],
      });
    }
  };

  useEffect(() => {
    if (!loading) {
      setformData((prevData) => ({
        title: data.title,
        fileLocation: data.fileLocation,
        fileName: data.fileName,
        oldFileName: data.fileName,
        Image: data.Image,
        ImageName: data.ImageName,
        oldImageName: data.ImageName,
        Description: data.Description,
        category: data.category,
      }));
    }
  }, [data]);

  return (
    <FormLayout
      data={formData}
      formSubmit={handleFormSubmit}
      formChange={handleFormChange}
      formDrop={handleDrop}
      fileName={fileName}
      buttonText={"Edit"}
      loading={isLoading}
    />
  );
};

export default page;
