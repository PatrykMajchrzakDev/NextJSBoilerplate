// =================================================
// ======== LAYOUT FOR AUTH ROUTE CHILDREN =========
// =================================================

import PageWrapper from "@/context/page-wrapper";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PageWrapper>
      <div className="w-full h-full flex items-center justify-center">
        {children}
      </div>
    </PageWrapper>
  );
}
