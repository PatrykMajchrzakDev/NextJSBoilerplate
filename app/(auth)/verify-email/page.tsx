import React, { Suspense } from "react";
import VerifyEmail from "./_verify-email";

const Page = () => {
  return (
    <Suspense>
      <VerifyEmail />
    </Suspense>
  );
};

export default Page;
