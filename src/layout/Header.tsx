import React from 'react';
import { Box, Button, Flex, Heading, Spacer } from '@chakra-ui/react';
import { useAuth } from '../hooks/useAuth';

const Header = () => {
  const { handleLogout } = useAuth();

  return (
    <Box as="header" w="full" bg="teal.500" p={4} color="white" shadow="md">
      <Flex alignItems="center">
        <Heading size="md">Money tracker</Heading>
        <Spacer />
        <Button colorScheme="red" onClick={handleLogout}>
          Log out
        </Button>
      </Flex>
    </Box>
  );
};

export default Header;
