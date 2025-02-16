export const enum UserMembershipEnum {
  REGULAR = "REGULAR",
  SUBSCRIBER = "SUBSCRIBER",
  PRO = "PRO",
}

export type UserMembershipType = keyof typeof UserMembershipEnum;
