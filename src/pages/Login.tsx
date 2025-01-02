import React from 'react';
import AuthForm from '../components/AuthForm';
import { Heading, VStack } from '@chakra-ui/react';
import { useAuth } from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { AuthRequest } from '../types/api/authApi';

export const Login = () => {
  const auth = useAuth();
  let navigate = useNavigate();
  const handleLogin = (data: AuthRequest) => {
    auth.handleLogin(data).then(() => {
      navigate('/');
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
      <AuthForm onSubmit={handleLogin} mode="login" />
      <Link to="/signup">Register now</Link>
    </VStack>
  );
};
