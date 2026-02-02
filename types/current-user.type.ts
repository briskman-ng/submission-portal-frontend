export interface CurrentUser {
  user: {
    id: string;
    name: string;
    email: string;
    userType: string;
    isEmailVerified: boolean;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  };
}
