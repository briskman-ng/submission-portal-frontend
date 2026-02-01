export interface AdminLoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  mustChangePassword: boolean;
  adminUser: {
    id: string;
    name: string;
    email: string;
    role: string;
    isActive: boolean;
  };
}
