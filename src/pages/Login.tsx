import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Heading,
  InputGroup,
  InputRightElement,
  Wrap,
} from '@chakra-ui/react';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailTouched, setIsEmailTouched] = useState(false);
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);
  const handleBlurEmail = () => setIsEmailTouched(true);
  const handleBlurPassword = () => setIsPasswordTouched(true);
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);
  const isEmailError = email.trim() === '';
  const isPasswordError = password.trim() === '';
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <Wrap
      width="100%"
      height="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Heading>Login</Heading>
      <FormControl isInvalid={isEmailError && isEmailTouched}>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          value={email}
          placeholder="Enter email"
          onChange={handleEmailChange}
          onBlur={handleBlurEmail}
        />
        {!isEmailError ? (
          <FormHelperText>
            Enter the email you'd like to receive the newsletter on.
          </FormHelperText>
        ) : (
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
      </FormControl>
      <Button colorScheme="blue" type="submit">
        Button
      </Button>
    </Wrap>
  );
};
