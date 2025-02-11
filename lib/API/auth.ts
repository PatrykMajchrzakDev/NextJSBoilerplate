// =================================================
// ========== ALL AUTH RELATED APIS CALLS ==========
// =================================================

import API from "./axios-client";

// ============ Types used in API calls ============
type LoginType = {
  email: string;
  password: string;
};

type RegisterType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type ForgotPasswordType = {
  email: string;
};

// ============== API call functions ===============

// LOGIN
export const loginMutationFn = async (data: LoginType) =>
  await API.post("/auth/login", data);

// REGISTER
export const registerMutationFn = async (data: RegisterType) =>
  await API.post("/auth/register", data);

// FORGOT PASSWORD
export const forgotPasswordMutationFn = async (data: ForgotPasswordType) => {
  await API.post("/auth/password/forgot", data);
};
