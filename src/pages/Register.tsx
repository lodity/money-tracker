import React from 'react';
import AuthForm from '../components/AuthForm';
import { Heading, VStack } from '@chakra-ui/react';
import { useAuth } from '../hooks/useAuth';
import { AuthRequest } from '../types/api/authApi';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

export const Register = () => {
  const auth = useAuth();
  let navigate = useNavigate();
  const handleRegister = (data: AuthRequest) => {
    auth.handleRegister(data).then(() => {
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
      <Heading>Register</Heading>
      <AuthForm onSubmit={handleRegister} mode="register" />
      <Link to="/signin">Login now</Link>
    </VStack>
  );
};
