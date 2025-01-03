import React, { useState } from 'react';
import AuthForm from '../components/AuthForm';
import { Heading, VStack } from '@chakra-ui/react';
import { useAuth } from '../hooks/useAuth';
import { AuthRequest } from '../types/api/authApi';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

export const Register = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<null | string>(null);

  const handleRegister = (data: AuthRequest) => {
    setErrorMessage(null);

    auth
      .handleRegister(data)
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
      <Heading>Register</Heading>
      <AuthForm
        onSubmit={handleRegister}
        mode="register"
        errorMessage={errorMessage}
      />
      <Link to="/sign-in">Login now</Link>
    </VStack>
  );
};
