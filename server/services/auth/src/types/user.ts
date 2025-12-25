export type UserRole = "USER" | "ADMIN" | "BUSINESS";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}
