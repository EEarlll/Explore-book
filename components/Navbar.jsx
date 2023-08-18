"use client";
import { Fragment, useEffect, useRef, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import { Bars3BottomRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { auth } from "@/config/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { resources } from "@/config/category";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const buttonRef = useRef(null);
  const searchInputRef = useRef(null);
  const router = useRouter();
  const [searchQuery, setsearchQuery] = useState("");
  const [isLoggedIn, setisLoggedIn] = useState(false);

  const handleSignOut = async () => {
    localStorage.removeItem("userId");
    await signOut(auth);
    setisLoggedIn(false);
    router.push(`/`);
  };

  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.key === "k") {
      e.preventDefault();
      searchInputRef.current.focus();
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/Query?search=${searchQuery}`);
    setsearchQuery("");
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setisLoggedIn(true);
    } else {
      setisLoggedIn(false);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <Popover className=" bg-background max-w-4xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      {/* parent container */}
      <div className="flex justify-between items-center px-4 py-6 sm:px-6 md:justify-start md:space-x-10">
        {/* logo */}
        <div className="flex justify-start ">
          <Link href="/">
            <span className="sr-only">Workflow</span>
            <img
              className="h-8 w-auto sm:h-10 "
              src="/explorebooks_primary.png"
              alt=""
            />
          </Link>
        </div>

        {/* menubar icon on breakpoint*/}
        <div className="-mr-2 -my-2 md:hidden">
          <Popover.Button className="bg-primary rounded-md p-2 inline-flex items-center justify-center text-background hover:text-secondary hover:bg-accent">
            <span className="sr-only">Open menu</span>
            <Bars3BottomRightIcon className="h-6 w-6" aria-hidden="true" />
          </Popover.Button>
        </div>

        {/* items on navbar */}
        <Popover.Group as="nav" className="hidden md:flex space-x-10">
          <Link
            href={!isLoggedIn ? "/SignIn" : `/MyBooks`}
            className="text-base font-medium text-text hover:text-accent"
          >
            My Books
          </Link>
          <Link
            href="/Browse"
            className="text-base font-medium text-text hover:text-accent"
          >
            Browse
          </Link>

          {/* Dropdown Catgory */}
          <Popover className="relative z-50 lg:block hidden">
            {({ open }) => (
              <>
                <Popover.Button
                  className={classNames(
                    open ? "text-accent" : "text-text",
                    "group bg-background rounded-md inline-flex items-center text-base font-medium hover:text-accent"
                  )}
                >
                  <span>Category</span>
                  <ChevronDownIcon
                    className={classNames(
                      open ? "text-accent" : "text-text",
                      "ml-2 h-5 w-5 group-hover:text-accent"
                    )}
                    aria-hidden="true"
                  />
                </Popover.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-xs sm:px-0">
                    <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden ">
                      <div className="relative grid gap-6 bg-background px-5 py-6 sm:gap-8 sm:p-8">
                        {resources.map((resource) => (
                          <Popover.Button
                            key={resource.name}
                            as={Link}
                            href={resource.href}
                            className="-m-3 p-3 block rounded-md hover:bg-accent"
                          >
                            <p className="text-base font-medium text-text">
                              {resource.name}
                            </p>
                            <p className="mt-1 text-sm text-text">
                              {resource.description}
                            </p>
                          </Popover.Button>
                        ))}
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
        </Popover.Group>

        {/* sign in sing up  */}

        <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
          <div className="pr-8 sm:hidden lg:block">
            <div className="mt-1 relative flex items-center">
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  name="searchQuery"
                  id="searchQuery"
                  value={searchQuery}
                  ref={searchInputRef}
                  onChange={(e) => setsearchQuery(e.target.value)}
                  className="shadow-sm block w-full pr-24 sm:text-sm border-gray-300 rounded-md"
                />
              </form>
              <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                <kbd className="inline-flex items-center border border-primary rounded px-2 text-sm font-sans font-medium text-secondary">
                  Ctrl K
                </kbd>
              </div>
            </div>
          </div>
          {!isLoggedIn ? (
            <>
              <Link
                href="/SignUp"
                className="whitespace-nowrap text-base font-medium text-text hover:text-accent"
              >
                Sign up
              </Link>
              <Link
                href="/SignIn"
                className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-secondary bg-primary hover:bg-text"
              >
                Sign in
              </Link>
            </>
          ) : (
            <button
              onClick={handleSignOut}
              className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-secondary bg-primary hover:bg-text"
            >
              Sign out
            </button>
          )}
        </div>
      </div>
      {/* menubar content */}

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden z-50"
        >
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-secondary divide-y-2 divide-primary">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div>
                  <a href="/">
                    <img
                      className="h-8 w-auto"
                      src="/explorebooks_primary.png"
                      alt="Workflow"
                    />
                  </a>
                </div>
                <div className="-mr-2">
                  <Popover.Button className="bg-primary rounded-md p-2 inline-flex items-center justify-center text-background hover:text-secondary hover:bg-accent">
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="pr-8 pt-6 w-full ">
                <div className="mt-1 relative flex items-center">
                  <Popover.Button
                    ref={buttonRef}
                    className="hidden"
                  ></Popover.Button>
                  <form
                    onSubmit={(e) => {
                      handleSearch(e);
                      buttonRef.current.click();
                    }}
                    className="w-full"
                  >
                    <input
                      type="text"
                      name="searchQuery"
                      id="searchQuery"
                      value={searchQuery}
                      ref={searchInputRef}
                      onChange={(e) => setsearchQuery(e.target.value)}
                      className="shadow-sm w-full sm:text-sm border-primary rounded-md bg-primary"
                    />
                  </form>
                  <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                    <kbd className="inline-flex items-center border border-accent rounded px-2 text-sm font-sans font-medium text-secondary">
                      Search
                    </kbd>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid grid-cols-1 gap-7">
                  {resources.map((resource) => (
                    <Popover.Button
                      key={resource.name}
                      as={Link}
                      href={resource.href}
                      className="-m-3 p-3 flex items-center rounded-lg hover:bg-accent"
                    >
                      <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-primary text-white">
                        <resource.icon className="w-6 h-6 text-secondary" />
                      </div>

                      <div className="ml-4 text-base font-medium text-primary">
                        {resource.name}
                      </div>
                    </Popover.Button>
                  ))}
                </nav>
              </div>
            </div>
            <div className="py-6 px-5">
              <div className="grid grid-cols-2 gap-4">
                <Popover.Button
                  href={"/Browse"}
                  as={Link}
                  className="text-base font-medium text-primary hover:text-accent"
                >
                  Browse
                </Popover.Button>
                <Popover.Button
                  href={!isLoggedIn ? "/SignIn" : `/MyBooks`}
                  as={Link}
                  className="text-base font-medium text-primary hover:text-accent"
                >
                  My Books
                </Popover.Button>
              </div>
              <div className="mt-6">
                {!isLoggedIn ? (
                  <>
                    <Popover.Button
                      href={"/SignUp"}
                      as={Link}
                      className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-background bg-primary hover:bg-accent hover:text-secondary"
                    >
                      Sign up
                    </Popover.Button>
                    <p className="mt-6 text-center text-base font-medium text-accent">
                      Existing customer?{" "}
                      <Popover.Button
                        href={"/SignIn"}
                        as={Link}
                        className="text-primary hover:text-accent"
                      >
                        Sign in
                      </Popover.Button>
                    </p>
                  </>
                ) : (
                  <>
                    <Popover.Button
                      onClick={handleSignOut}
                      className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-background bg-primary hover:bg-accent hover:text-secondary"
                    >
                      Sign Out
                    </Popover.Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
