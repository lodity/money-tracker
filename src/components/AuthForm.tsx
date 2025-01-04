import React, { FC, useState } from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  VStack,
  Text,
} from '@chakra-ui/react';
import { AuthRequest } from '../types/api/authApi';

interface AuthFormProps {
  onSubmit: (data: AuthRequest) => void;
  mode: 'login' | 'register';
  errorMessage: null | string;
}

const AuthForm: FC<AuthFormProps> = ({ onSubmit, mode, errorMessage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailTouched, setIsEmailTouched] = useState(false);
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);
  const [show, setShow] = useState(false);

  const isEmailError = email.trim() === '';
  const isPasswordError = password.trim() === '';

  const buttonText = mode === 'login' ? 'Login' : 'Register';

  const handleBlurEmail = () => setIsEmailTouched(true);
  const handleBlurPassword = () => setIsPasswordTouched(true);
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);
  const handleClick = () => setShow((v) => !v);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isEmailError && !isPasswordError) {
      onSubmit({ email, password });
    } else {
      setIsEmailTouched(true);
      setIsPasswordTouched(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack>
        <FormControl isInvalid={isEmailError && isEmailTouched}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            placeholder="Enter email"
            onChange={handleEmailChange}
            onBlur={handleBlurEmail}
          />
          {!isEmailError && (
            <FormErrorMessage>Email is required.</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={isPasswordError && isPasswordTouched}>
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show ? 'text' : 'password'}
              placeholder="Enter password"
              value={password}
              onChange={handlePasswordChange}
              onBlur={handleBlurPassword}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
          {isPasswordError && (
            <FormErrorMessage>Password is required.</FormErrorMessage>
          )}
          {errorMessage && <Text color="tomato">{errorMessage}</Text>}
        </FormControl>
        <Button
          type="submit"
          display="block"
          colorScheme="blue"
          w="full"
          mt="10px"
        >
          {buttonText}
        </Button>
      </VStack>
    </form>
  );
};

export default AuthForm;
