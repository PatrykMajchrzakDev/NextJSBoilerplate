// =================================================
// ======== LAYOUT FOR AUTH ROUTE CHILDREN =========
// =================================================

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-auto">
      <div className="w-full h-full flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
