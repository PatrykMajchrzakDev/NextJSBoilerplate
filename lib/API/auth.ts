// =================================================
// ========== ALL AUTH RELATED APIS CALLS ==========
// =================================================

import { AuthResponseUser } from "@/common/types/user-type";
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

type ResetPasswordType = {
  password: string;
  verificationCode: string;
};

type VerifyEmailType = {
  code: string;
};

type ResenedEmailVerificationType = {
  email: string;
};

export type mfaType = {
  message: string;
  secret: string;
  qrImageUrl: string;
};

type verifyMFAType = {
  code: string;
  secretKey: string;
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

// RESET PASSWORD
export const resetPasswordMutationFn = async (data: ResetPasswordType) => {
  await API.post("/auth/password/reset", data);
};

// VERIFY EMAIL
export const verifyEmailMutationFn = async (data: VerifyEmailType) => {
  await API.post("/auth/verify/email", data);
};

// RESEND ACCOUNT VERIFICATION EMAIL
export const resendEmailVerificationMutationFn = async (
  data: ResenedEmailVerificationType
) => {
  await API.post("/auth/resend/email-verification", data);
};

// FETCHES USER DETAILS
export const getUserQueryFn = async () =>
  await API.get<AuthResponseUser>("/session");

// MFA SETUP
export const mfaSetupQueryFn = async () => {
  const response = await API.get<mfaType>("/mfa/setup");
  return response.data;
};

// VERIFY MFA CODE
export const verifyMFAMutationFn = async (data: verifyMFAType) => {
  await API.post("/mfa/verify", data);
};
