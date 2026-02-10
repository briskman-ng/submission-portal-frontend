export interface CurrentUser {
  id: string;
  name: string;
  email: string;
  userType: string;
  isEmailVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
