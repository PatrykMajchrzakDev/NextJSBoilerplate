import { UserMembershipEnum } from "../enums/membershipEnum";
import { UserRole } from "../enums/userRoleEnum";

export interface verifyMFALoginResponseType {
  message: string;
  userAgent: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    membership: UserMembershipEnum;
    isVerified: true;
    createdAt: Date;
    updatedAt: Date;
  };
}
