import { NextRequest, NextResponse } from "next/server";
// import { useUser } from "./lib/API/user";

const protectedRoutes = ["/dashboard", "/sessions", "/profile"];
const authRoutes = [
  "/signin",
  "/signup",
  "/resend-email",
  "/reset-password",
  "/verify-email",
  "/verify-mfa",
];

const openRoutes = ["/forgot-password", "/"];

export default async function protectedRoute(req: NextRequest) {
  // const { data, isLoading, error } = useUser();
  // Path user tries to access
  const path = req.nextUrl.pathname;

  // Checks if the path user tries to access is auth, open or protected routes
  const isProtectedRoute = protectedRoutes.includes(path);
  const isAuthRoute = authRoutes.includes(path);
  const isOpenRoute = openRoutes.includes(path);

  // Access token from cookies aquired upon login
  const accessToken = req.cookies.get("accessToken")?.value;

  // if (!data || error) {
  //   return NextResponse.redirect(new URL("/", req.nextUrl));
  // }

  // Redirects unauthenticated user to default page
  if (isProtectedRoute && !accessToken) {
    return NextResponse.redirect(new URL("/signin", req.nextUrl));
  }

  // Redirects to open route
  if ((isOpenRoute && !accessToken) || (isOpenRoute && accessToken)) {
    return NextResponse.next();
  }

  // Redirects to logged in user routes
  if (isAuthRoute && accessToken) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  // If anything else then just pass the request
  return NextResponse.next();
}
