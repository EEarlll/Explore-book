"use client";
import useFetch from "@/hooks/useFetch";

export default function Recent() {
  const totalBooks = useFetch("https://explore-books.vercel.app/Pagination/");

  return (
    <div className="bg-secondary pt-12 sm:pt-16 my-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-primary sm:text-4xl">
            Discover Our Expansive Collection
          </h2>
          <p className="mt-3 text-xl text-accent sm:mt-4">
            We are constantly enriching our library with new and exciting
            titles. Stay up-to-date with our latest additions, ensuring you
            never miss out on the most captivating reads hitting the literary
            scene.
          </p>
        </div>
      </div>
      <div className="mt-10 pb-12 bg-secondary sm:pb-16">
        <div className="relative">
          <div className="absolute inset-0 h-1/2 bg-secondary" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <dl className="rounded-lg bg-secondary sm:grid sm:grid-cols-2">
                <div className="flex flex-col border-b border-accent p-6 text-center sm:border-0 sm:border-r">
                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-accent">
                    Total Books
                  </dt>
                  <dd className="order-1 text-5xl font-extrabold text-primary">
                    {totalBooks.data}
                  </dd>
                </div>
                <div className="flex flex-col border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l">
                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-accent">
                    Categories
                  </dt>
                  <dd className="order-1 text-5xl font-extrabold text-primary">
                    5
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
