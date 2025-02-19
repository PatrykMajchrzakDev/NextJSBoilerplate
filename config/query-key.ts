// =================================================
// ============= QUERY KEYS USED IN APP ============
// =================================================

const queryKeys = () => ({
  getUser: "user",
  getUserDetails: "userDetails",
  getMFASetup: "mfaSetup",
});

export const defaultQueryKeys = queryKeys();

export type defaultQueryKeysTypeType =
  (typeof defaultQueryKeys)[keyof typeof defaultQueryKeys];
