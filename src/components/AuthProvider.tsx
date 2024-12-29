import React, { PropsWithChildren, useEffect, useState } from 'react';
import { User } from '../types/user';
import { AuthContext } from '../context/authContext';
import { AuthApi } from '../api/auth';
import { SignInRequest } from '../types/api/authApi';
import { jwtDecode } from 'jwt-decode';

export default function AuthProvider({ children }: PropsWithChildren) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogin = async (dto: SignInRequest) => {
    setIsLoading(true);

    try {
      const response = await AuthApi.signIn(dto);

      localStorage.setItem('token', response.token);
      setCurrentUser({ email: dto.email, token: response.token });
    } catch {
      setCurrentUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
  };

  useEffect(() => {
    setIsLoading(true);
    const token = localStorage.getItem('token');

    if (token) {
      const email = jwtDecode<{ email: string }>(token).email;

      setCurrentUser({ email, token });
    }

    setIsLoading(false);
  }, []);

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
