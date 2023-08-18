"use client";
import React, { useState } from "react";

const Feedback = () => {
  const [formData, setformData] = useState({
    subject: "",
    email: "",
    message: "",
  });
  const [submitted, setsubmitted] = useState(false);
  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("https://explore-books.vercel.app/Catalogue/send-feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      setformData({
        subject: "",
        email: "",
        message: "",
      });
      setsubmitted(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // parent container
    <section className="text-primary bg-background body-font relative">
      {/* inner container */}
      <div className="container px-5 py-24 mx-auto">
        {/* header titles */}
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">
            Contact Us
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Your feedback is invaluable to us, and it helps shape the future of
            ExploreBooks.
          </p>
          {submitted && (
            <div className="bg-[#17251a] mt-8 px-8 mx-auto py-4 border border-[#2e7a4e] rounded-lg w-1/6 flex justify-center">
              <p className="text-text text-sm">
                Thank You for providing Feedback
              </p>
            </div>
          )}
        </div>

        {/* forms container*/}
        <div className="lg:w-1/2 md:w-2/3 mx-auto">
          {/* form inner container */}

          <div className="flex flex-wrap -m-2">
            {/* name */}
            <form action="" className="flex flex-wrap" onSubmit={handleSubmit}>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="subject"
                    className="leading-7 text-sm text-accent"
                  >
                    Subject (optional)
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-white  rounded border text-base outline-none text-secondary py-1 px-3 leading-8"
                  />
                </div>
              </div>
              {/* email */}
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm text-accent"
                  >
                    Email (optional)
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-white  rounded border text-base outline-none text-secondary py-1 px-3 leading-8"
                  />
                </div>
              </div>
              {/* message textarea */}
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="message"
                    className="leading-7 text-sm text-gray-400"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    onChange={handleChange}
                    required
                    value={formData.message}
                    className="w-full bg-white text-secondary rounded border h-48 text-base outline-none py-1 px-3 resize-none leading-6 "
                  ></textarea>
                </div>
              </div>
              {/* button */}
              <div className="p-2 w-full">
                <button
                  type="submit"
                  className="flex mx-auto text-secondary bg-primary border-0 py-2 px-8 rounded text-lg hover:bg-accent"
                >
                  Submit
                </button>
              </div>
            </form>

            <div className="p-2 w-full pt-8 mt-8 border-t border-texbg-white text-center">
              <p className="leading-normal my-5">
                We read every message and will get back to you as soon as
                possible.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feedback;
