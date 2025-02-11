import React, { Suspense } from "react";
import ForgotPassword from "./_forgot-password";

// UseParams is used in ForgotPassword so Suspense should be used

const Page = () => {
  return (
    <Suspense>
      <ForgotPassword />
    </Suspense>
  );
};

export default Page;
