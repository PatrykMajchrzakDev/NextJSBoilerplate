// =================================================
// ========== ALL AUTH RELATED APIS CALLS ==========
// =================================================

import { AuthResponseUser } from "@/common/types/user-type";
import API from "./axios-client";
import { verifyMFALoginResponseType } from "@/common/types/auth-response";

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

type ResendEmailVerificationType = {
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

type mfaLoginType = {
  code: string;
  email: string;
};

// ============== API call functions ===============

// LOGIN
export const loginMutationFn = async (data: LoginType) => {
  return await API.post("/auth/login", data);
};

// REGISTER
export const registerMutationFn = async (data: RegisterType) => {
  return await API.post("/auth/register", data);
};

// FORGOT PASSWORD
export const forgotPasswordMutationFn = async (data: ForgotPasswordType) => {
  return await API.post("/auth/password/forgot", data);
};

// RESET PASSWORD
export const resetPasswordMutationFn = async (data: ResetPasswordType) => {
  return await API.post("/auth/password/reset", data);
};

// VERIFY EMAIL
export const verifyEmailMutationFn = async (data: VerifyEmailType) => {
  return await API.post("/auth/verify/email", data);
};

// RESEND ACCOUNT VERIFICATION EMAIL
export const resendEmailVerificationMutationFn = async (
  data: ResendEmailVerificationType
) => {
  return await API.post("/auth/resend/email-verification", data);
};

// FETCHES USER DETAILS
export const getUserQueryFn = async () => {
  return await API.get<AuthResponseUser>("/session");
};

// MFA SETUP
export const mfaSetupQueryFn = async () => {
  const response = await API.get<mfaType>("/mfa/setup");
  return response.data;
};

// VERIFY MFA CODE
export const verifyMFAMutationFn = async (data: verifyMFAType) => {
  return await API.post("/mfa/verify", data);
};

// REVOKE MFA
export const revokeMFAMutationFn = async () => {
  return await API.put("/mfa/revoke", {});
};
// VERIFY MFA LOGIN
export const verifyMFALoginMutationFn = async (data: mfaLoginType) => {
  return await API.post<verifyMFALoginResponseType>("/mfa/verify-login", data);
};
