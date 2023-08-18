import { onAuthStateChanged } from "firebase/auth";

const useAuthorize = (auth) => {
  if (typeof window !== "undefined" && localStorage.getItem("userId")) {
    return true;
  } else {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        localStorage.setItem("userId", JSON.stringify(user));
        return true;
      }
    });
  }

  return false;
};
export default useAuthorize;
