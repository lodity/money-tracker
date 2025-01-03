import { AuthRequest } from '../api/authApi';
import { User } from '../user';

export type AuthContext = {
  currentUser: User | null;
  isLoading: boolean;
  handleLogin: (dto: AuthRequest) => Promise<void>;
  handleRegister: (dto: AuthRequest) => Promise<void>;
  handleLogout: () => Promise<void>;
};
