import React, { useState } from 'react';
import AuthForm from '../components/AuthForm';
import { Heading, VStack } from '@chakra-ui/react';
import { useAuth } from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { AuthRequest } from '../types/api/authApi';

export const Login = () => {
  const auth = useAuth();
  let navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<null | string>(null);

  const handleLogin = (data: AuthRequest) => {
    setErrorMessage(null);

    auth
      .handleLogin(data)
      .then(() => {
        navigate('/');
      })
      .catch((e) => {
        setErrorMessage(e.response?.data.errorMessage);
      });
  };

  return (
    <VStack
      maxWidth="270px"
      height="100vh"
      justifyContent="center"
      margin="0 auto"
    >
      <Heading>Login</Heading>
      <AuthForm
        onSubmit={handleLogin}
        mode="login"
        errorMessage={errorMessage}
      />
      <Link to="/sign-up">Register now</Link>
    </VStack>
  );
};
