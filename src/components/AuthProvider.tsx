import React, { PropsWithChildren, useState } from 'react';
import { User } from '../types/user';
import { AuthContext } from '../context/authContext';
import { AuthApi } from '../api/auth';
import { SignInRequest } from '../types/api/authApi';

export default function AuthProvider({ children }: PropsWithChildren) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogin = async (dto: SignInRequest) => {
    setIsLoading(true);

    try {
      const response = await AuthApi.signIn(dto);

      setCurrentUser({ email: dto.email, token: response.token });
    } catch {
      setCurrentUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      // TODO:
      //response to back
    } finally {
      setCurrentUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLoading,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
