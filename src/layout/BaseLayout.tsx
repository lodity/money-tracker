import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import { VStack } from '@chakra-ui/react';

export default function BaseLayout() {
  return (
    <>
      <VStack w="full" h="100svh" alignItems="center" gap="4">
        <Header />
        <main>
          <Outlet />
        </main>
      </VStack>
    </>
  );
}
