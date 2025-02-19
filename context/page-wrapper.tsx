"use client";
import { ParamsError } from "@/common/types/params-error";
// import Footer from "./footer";
import Navbar from "@/components/customUI/nav/Navbar";
import { toast } from "@/hooks/use-toast";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useSearchParams();
  const errorCode = params.get("error") as keyof typeof ParamsError;

  useEffect(() => {
    if (errorCode && ParamsError[errorCode]) {
      toast({
        title: ParamsError[errorCode].title,
        description: ParamsError[errorCode].message,
        variant: "destructive",
      });
    }
  }, [errorCode]);
  return (
    <>
      <Navbar />
      {children}
      {/* <Footer /> */}
    </>
  );
}
