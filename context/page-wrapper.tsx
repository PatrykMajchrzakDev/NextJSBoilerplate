"use client";
// import Footer from "./footer";
import Navbar from "@/components/customUI/nav/Navbar";

export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      {/* <Footer /> */}
    </>
  );
}
