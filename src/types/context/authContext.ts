import { SignInRequest } from '../api/authApi';
import { User } from '../user';

export type AuthContext = {
  currentUser: User | null;
  isLoading: boolean;
  handleLogin: (dto: SignInRequest) => Promise<void>;
  handleLogout: () => Promise<void>;
};
