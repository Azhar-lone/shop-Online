import useUser from "@/components/context/user-provider";
import React from "react";

interface ProtectedTypes {
  children: React.ReactNode;
}

export default function AdminProtected({ children }: ProtectedTypes) {
  let { user } = useUser();
  if (!user || user.role !== "admin") {
    throw new Error("Not Autherized");
  }
  return children;
}

// Also create Not Autherized page
