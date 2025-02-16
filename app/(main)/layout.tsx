// Layout for main route children

import { AuthProvider } from "@/context/auth-provider";
import PageWrapper from "@/context/page-wrapper";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <PageWrapper>
        <div className="w-full h-full flex items-center justify-center">
          {children}
        </div>
      </PageWrapper>
    </AuthProvider>
  );
};

export default MainLayout;
