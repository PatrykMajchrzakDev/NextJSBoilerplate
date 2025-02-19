import { UserAccountProviderEnumType } from "../enums/accountProviderEnum";
import { UserMembershipType } from "../enums/membershipEnum";
import { UserRoleType } from "../enums/userRoleEnum";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRoleType;
  membership: UserMembershipType;
  isEmailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  account: {
    userId: string;
    provider: UserAccountProviderEnumType;
    providerAccountId?: string;
  };
  userPreferences: {
    userId: string;
    enable2FA: boolean;
    emailNotification: boolean;
  };
}

export interface AuthResponseUser {
  user: User;
}