import useUser from "@/components/context/user-provider";
import React from "react";

interface ProtectedTypes {
  children: React.ReactNode;
}

export default function UserProtected({ children }: ProtectedTypes) {
  let { isLogin } = useUser();
  if (!isLogin) {
    throw new Error("Not Autherized , \nYou Should LogIn");
  } else return children;
}

// Ensures user cant access
// login ,signUp etc routes
// because user is already login
// no need to login again
export function NoLoginProtected({ children }: ProtectedTypes) {
  if (localStorage.getItem("userName")) {
    throw new Error("Not Autherized , \nYou Are Already LoggedIn");
  }

  return children;
}
