export const ParamsError = {
  AUTH_ERROR: {
    code: "AUTH_ERROR",
    title: "Authorization error",
    message: "There was an error during authentication. Please sign in again.",
  },
  SESSION_EXPIRED: {
    code: "SESSION_EXPIRED",
    title: "Session expired",
    message: "Your session has expired. Please sign in again.",
  },
} as const;

export type ErrorCode = keyof typeof ParamsError;
