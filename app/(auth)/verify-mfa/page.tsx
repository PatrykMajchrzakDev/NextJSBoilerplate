import { Suspense } from "react";
import VerifyMFA from "./_verify-mfa";

const Page = () => {
  return (
    <Suspense>
      <VerifyMFA />
    </Suspense>
  );
};

export default Page;
