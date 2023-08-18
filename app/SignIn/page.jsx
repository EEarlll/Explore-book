"use client";
import { auth } from "@/config/firebase";
import useAuthorize from "@/hooks/useAuthorize";
import {
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function page() {
  const [formData, setformData] = useState({ email: "", password: "" });
  const [IsSignInError, setIsSignInError] = useState({ error: false });
  const [rememberMe, setrememberMe] = useState({ isChecked: false });

  // check if user is logged in
  const isLoggedIn = useAuthorize(auth);
  useEffect(() => {
    if (isLoggedIn) {
      window.location.href = "/";
    }
    if (localStorage.checkbox && localStorage.email !== "") {
      setformData({
        email: localStorage.username,
        password: localStorage.password,
      });
    }
  }, [isLoggedIn]);

  const handleCheckBoxChange = (e) => {
    setrememberMe({ isChecked: e.target.checked });
  };

  const handleFormChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  // authentication using firebase auth
  const SignIn = async (e) => {
    e.preventDefault();
    try {
      if (rememberMe.isChecked && email !== "") {
        localStorage.username = formData.email;
        localStorage.password = formData.password;
        localStorage.checkbox = rememberMe.isChecked;
      }
      if (!rememberMe.isChecked) {
        localStorage.clear();
      }
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      setIsSignInError({ error: false });
      location.reload();
    } catch (error) {
      console.log(error);
      setIsSignInError({ error: error.message });
    }
  };
  const SignInProvider = async (provider) => {
    try {
      const prov = new provider();
      await signInWithPopup(auth, prov);

      setIsSignInError({ error: false });
      location.reload();
    } catch (error) {
      console.log(error);
      setIsSignInError({ error: error.message });
    }
  };
  const resetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, formData.email);
      setIsSignInError({ error: false });
      location.reload();
    } catch (error) {
      console.log(error);
      setIsSignInError({ error: error.message });
    }
  };

  return (
    <>
      {/* parent container */}
      <div className="bg-background min-h-[69vh] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        {/* top container header titles */}
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-primary">
            <span className="text-[#597aa6]">Sign in</span> to your account
          </h2>
          <p className="mt-2 text-center text-sm text-accent">
            Or{" "}
            <Link
              href="/SignUp"
              className="font-medium text-text hover:text-accent"
            >
              create your account
            </Link>
            {IsSignInError.error && (
              <div className="bg-[#25171C] mt-8 px-8 py-4 border border-[#7A2E2F] rounded-lg">
                <p className="text-text text-sm">{IsSignInError.error}</p>
              </div>
            )}
          </p>
        </div>
        {/* bottom container */}
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          {/* inner container */}
          <div className="bg-primary py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {/* forms */}
            <form className="space-y-6" onSubmit={SignIn}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-secondary"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleFormChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-secondary"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={handleFormChange}
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    onChange={handleCheckBoxChange}
                    checked={rememberMe.isChecked ? true : false}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-secondary"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <button
                    onClick={resetPassword}
                    className="font-medium text-secondary hover:text-accent"
                  >
                    Forgot your password?
                  </button>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  onClick={SignIn}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-text bg-background hover:bg-accent"
                >
                  Sign in
                </button>
              </div>
            </form>
            {/* bottom items  */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-primary text-secondary">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                {/* socials */}
                <div className="col-start-2">
                  <button
                    type="button"
                    onClick={() => SignInProvider(GoogleAuthProvider)}
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Sign in with Google</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />{" "}
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
