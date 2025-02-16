export const UserAccountProviderEnum = {
  GOOGLE: "GOOGLE",
  GITHUB: "GITHUB",
  FACEBOOK: "FACEBOOK",
  EMAIL: "EMAIL",
  APPLE: "APPLE",
};

export type UserAccountProviderEnumType = keyof typeof UserAccountProviderEnum;
