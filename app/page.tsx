import React from "react";
import PageWrapper from "@/context/page-wrapper";
import Link from "next/link";

const page = () => {
  return (
    <PageWrapper>
      <div className=" w-full mt-[68px] lg:mt-[53px]">/ page</div>
      <div>
        <Link href={"/signup"}>SIGNUP</Link>
      </div>
      <div>
        <Link href={"/signin"}>SIGNIN</Link>
      </div>
      <div>
        <Link href={"/forgot-password"}>FORGOT PASSWORD</Link>
      </div>
      <div>
        <Link href={"/reset-password"}>RESET PASSWORD</Link>
      </div>
      <div>
        <Link href={"/verify-mfa"}>Verify MFA</Link>
      </div>
      <div>
        <Link href={"/verify-email"}>Verify Email</Link>
      </div>
      <div>
        <Link href={"/resend-email"}>Resend Email</Link>
      </div>
      <div>
        <Link href={"/dashboard"}>Dashboard</Link>
      </div>
      <div>
        <Link href={"/user-profile"}>User Profile</Link>
      </div>
    </PageWrapper>
  );
};

export default page;
