import React from 'react';
import AuthForm from '../components/AuthForm';
import { Heading, VStack } from '@chakra-ui/react';
import { AuthApi } from '../api/auth';

export const Login = () => {
  return (
    <VStack
      maxWidth="270px"
      height="100vh"
      justifyContent="center"
      margin="0 auto"
    >
      <Heading>Login</Heading>
      <AuthForm onSubmit={(data) => console.log(data)} />
    </VStack>
  );
};
