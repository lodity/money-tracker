import React from 'react';
import AuthForm from '../components/AuthForm';
import { Heading, VStack } from '@chakra-ui/react';
import { useAuth } from '../hooks/useAuth';
import { AuthRequest } from '../types/api/authApi';
import { useNavigate } from 'react-router';

export const Register = () => {
  const auth = useAuth();
  let navigate = useNavigate();
  const handleRegister = (data: AuthRequest) => {
    auth.handleRegister(data).then((response) => {
      //navigate('/');
      console.log(response);
    });
  };
  return (
    <VStack
      maxWidth="270px"
      height="100vh"
      justifyContent="center"
      margin="0 auto"
    >
      <Heading>Register</Heading>
      <AuthForm onSubmit={handleRegister} mode="register" />
    </VStack>
  );
};
