import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <>
      <section className="text-primary bg-background body-font py-12">
        <div className="max-w-4xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 flex md:flex-row flex-col items-center ">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mt-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-text">
              ExploreBooks
              <br className="hidden lg:inline-block" />
              Your Ultimate Book Catalogue Reader!
            </h1>
            <p className="mb-8 leading-relaxed">
              Welcome to ExploreBooks! Your gateway to a vast collection of
              literature awaits. Delve into a diverse world of captivating
              reads, from cherished classics to the latest bestsellers,
              representing an eclectic range of genres to suit every taste.
            </p>
            <div className="flex justify-center">
              <Link
                href={"/Browse"}
                className="inline-flex text-secondary bg-primary border-0 py-2 px-6 focus:outline-none hover:bg-text rounded text-lg"
              >
                Explore
              </Link>
              <Link
                href={"/MyBooks"}
                className="ml-4 inline-flex text-secondary bg-accent border-0 py-2 px-6 focus:outline-none hover:bg-text rounded text-lg"
              >
                Build Your Library
              </Link>
            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 order-first md:order-last w-1/2 h-1/2">
            <img
              className="object-cover object-center rounded w-full h-full "
              alt="https://dummyimage.com/720x600"
              src="/HeroImage.webp"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
