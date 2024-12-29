import { createContext } from 'react';
import { AuthContext as AuthContextType } from '../types/context/authContext';

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
