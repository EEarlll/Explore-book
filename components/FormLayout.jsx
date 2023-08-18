import Loading from "./Loading";
import { resources } from "@/config/category";

function truncateString(str, num) {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
}

export default function FormLayout({
  data,
  formSubmit,
  formChange,
  formDrop,
  fileName = "",
  buttonText,
  loading,
}) {
  return (
    <div className="bg-background max-w-4xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8 mt-12">
      <div>
        {/* inner container */}
        <div className="md:grid md:grid-cols-3 md:gap-6">
          {/* left side about showcase */}
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-primary">
                Book
              </h3>
              <p className="mt-1 text-sm text-accent">
                This information will be displayed publicly so be careful what
                you share.
              </p>
            </div>
            <div className="mt-[20%]">
              <div
                key={data._id}
                className="relative group hover:bg-secondary rounded-lg"
              >
                <div className="aspect-w-3 aspect-h-3 rounded-lg overflow-hidden">
                  {loading ? (
                    <Loading />
                  ) : (
                    <img
                      src={
                        data.Image && data.Image instanceof File
                          ? URL.createObjectURL(data.Image)
                          : data.Image && typeof data.Image === "string"
                          ? data.Image
                          : "/placeholderImage.png"
                      }
                      className="object-fill bg-primary"
                    />
                  )}
                </div>
                <div className="mt-4 flex items-center justify-between text-base font-medium text-text space-x-8">
                  <h3>
                    <a href="#">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {data.title || "title"}
                    </a>
                  </h3>
                  <p>{data.category || "Category"}</p>
                </div>
                <p className="mt-1 text-sm text-accent">
                  {truncateString(data.Description, 177) || "Description"}
                </p>
              </div>
            </div>
          </div>

          {/* form */}
          <div className="mt-5 md:mt-0 md:col-span-2">
            {/* form container */}
            <form onSubmit={formSubmit}>
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-background space-y-6 sm:p-6">
                  {/* Inputs */}
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-text"
                      >
                        Title
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          type="text"
                          name="title"
                          id="title"
                          required
                          value={data.title}
                          className=" focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md  sm:text-sm border-gray-300"
                          placeholder="Enter the Title"
                          onChange={formChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label
                        htmlFor="category"
                        className="block text-sm font-medium text-text"
                      >
                        Category
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <select
                          onChange={formChange}
                          value={data.category}
                          name="category"
                          className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md  sm:text-sm border-gray-300"
                        >
                          {resources.map((resource, idx) => (
                            <option key={idx} defaultValue={resources[0]}>
                              {resource.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label
                        htmlFor="fileLocation"
                        className="block text-sm font-medium text-text"
                      >
                        PDF file
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          type="file"
                          name="fileLocation"
                          id="fileLocation"
                          accept="application/pdf"
                          required={buttonText === "Add"}
                          onChange={formDrop}
                          className=" focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md  sm:text-sm border-gray-300 text-text"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="Description"
                      className="block text-sm font-medium text-text"
                    >
                      Description
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="Description"
                        name="Description"
                        value={data.Description}
                        required
                        onChange={formChange}
                        rows={6}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder="Brief description of the book."
                      />
                    </div>
                    <p className="mt-2 text-sm text-accent">
                      Brief description of the book.
                    </p>
                  </div>

                  <div className="grid gap-6">
                    <label className="block text-sm font-medium text-text">
                      Image
                    </label>
                    {/* image functionality */}
                    <div className=" mt-1 relative flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="w-full h-full absolute inset-0">
                        <input
                          type="file"
                          id="files"
                          accept="image/*"
                          name="Image"
                          onChange={formDrop}
                          className="w-full h-full cursor-pointer px-[38%] md:px-[44%]"
                        />
                      </div>

                      <div className="space-y-1 text-center pt-4">
                        <svg
                          className="mx-auto h-12 w-12 text-accent"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-text">
                          <label htmlFor="">
                            <p className="pl-1">
                              {fileName
                                ? `${fileName}`
                                : `Upload a file or drag and drop`}
                            </p>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-background text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-secondary bg-primary hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {buttonText}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
