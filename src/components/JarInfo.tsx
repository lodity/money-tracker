import React, { FC } from 'react';
import { Jar } from '../types/jar';
import { Box, Heading, Text, VStack } from '@chakra-ui/react';

interface JarInfoProps {
  jar: Jar;
}

export const JarInfo: FC<JarInfoProps> = ({ jar }) => {
  return (
    <VStack justifyContent="space-between" w="full" p="4" gap="4" align="start">
      <Heading fontSize="2xl">
        {jar.name}{' '}
        <Text fontSize="xl" fontWeight="500" color="teal.400">
          ({jar.balance} / {jar.target} {jar.targetCurrency})
        </Text>
      </Heading>

      <Box
        w="full"
        borderRadius="20px"
        height="24px"
        overflow="hidden"
        background="repeating-linear-gradient(-45deg, rgba(74, 85, 104, 0.5) 0%, rgba(74, 85, 104, 0.5) 20px, rgba(113, 128, 150, 0.5) 20px, rgba(113, 128, 150, 0.5) 40px)"
        pos="relative"
      >
        <Box
          w={(100 * jar.balance) / jar.target + '%'}
          height="24px"
          backgroundColor="teal.300"
        ></Box>
        <Text
          fontWeight="semibold"
          position="absolute"
          top="0"
          width="full"
          textAlign="center"
          lineHeight="6"
          fontSize="lg"
        >
          {((100 * jar.balance) / jar.target).toFixed(1)} %
        </Text>
      </Box>
    </VStack>
  );
};
