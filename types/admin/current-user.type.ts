export interface CurrentUser {
  adminUser: {
    id: string;
    name: string;
    email: string;
    azureObjectId: null;
    role: string;
    mustChangePassword: boolean;
    isActive: boolean;
    lastLogin: string;
    createdAt: string;
    updatedAt: string;
  };
}
