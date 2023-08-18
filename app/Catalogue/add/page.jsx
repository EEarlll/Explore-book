"use client";
import FormLayout from "@/components/FormLayout";
import { auth } from "@/config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const page = () => {
  const router = useRouter();
  const [fileName, setfileName] = useState("");
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/SignIn");
      }
    });
  }, []);

  const [formData, setformData] = useState({
    title: "",
    fileLocation: "",
    Image: "",
    Description: "",
    category: "Fiction",
    userId: auth?.currentUser?.uid,
    creator: auth?.currentUser?.email,
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
        "https://explore-books.vercel.app/Catalogue/",
        {
          method: "POST",
          body: user_FormData,
        }
      );
      if (response.ok) {
        setformData({
          title: "",
          fileLocation: "",
          Image: "",
          Description: "",
          category: "Fiction",
          userId: auth.currentUser.uid,
          creator: auth.currentUser.email,
        });
        setfileName("");
        console.log("added successful");
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

  return (
    <FormLayout
      data={formData}
      formSubmit={handleFormSubmit}
      formChange={handleFormChange}
      formDrop={handleDrop}
      fileName={fileName}
      buttonText={"Add"}
      loading={isLoading}
    />
  );
};

export default page;
