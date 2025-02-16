// =================================================
// ============= QUERY KEYS USED IN APP ============
// =================================================

const queryKeys = () => ({
  getUser: "user",
  getUserDetails: "userDetails",
});

export const defaultQueryKeys = queryKeys();

export type defaultQueryKeysTypeType =
  (typeof defaultQueryKeys)[keyof typeof defaultQueryKeys];
