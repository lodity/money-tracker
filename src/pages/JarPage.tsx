import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DetailedJar } from '../types/jar';
import { JarApi } from '../api/jar';
import {
  AbsoluteCenter,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Card,
  CardBody,
  Flex,
  Heading,
  HStack,
  Image,
  Spinner,
  Table,
  Tag,
  Tbody,
  Td,
  Text,
  Tr,
  useBreakpointValue,
  VStack,
  Wrap,
} from '@chakra-ui/react';
import { JarInfo } from '../components/JarInfo';
import { Transaction, TransactionType } from '../types/transaction';
import { TransactionApi } from '../api/transaction';
import { formatIso } from '../utils';

export const JarPage = () => {
  const { id } = useParams();
  const [jar, setJar] = useState<DetailedJar | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const cardWidth = useBreakpointValue({
    base: '95%',
    md: '80%',
    lg: '60%',
  });

  const orientation = useBreakpointValue<'column' | 'row'>({
    base: 'column',
    md: 'row',
    lg: 'row',
  });

  useEffect(() => {
    if (!id) {
      return;
    }

    JarApi.getById(Number(id)).then((response) => {
      setJar(response.data.data);
      setIsLoading(false);
    });

    TransactionApi.get(10, 0, Number(id)).then((response) => {
      setTransactions(response.data.data.transactions);
    });
  }, [id]);

  if (isLoading || !jar) {
    return (
      <AbsoluteCenter mt="50vh">
        <Spinner size="xl" />
      </AbsoluteCenter>
    );
  }

  return (
    <VStack w={cardWidth} mx="auto" align="start" gap="4">
      <Breadcrumb spacing="8px" fontSize="xl">
        <BreadcrumbItem>
          <BreadcrumbLink href="/jars">Jars</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href={`/${jar.id}`}>{jar.name}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Card w="full">
        <CardBody>
          <HStack align="start">
            <Image src="/jar.png" alt="Jar" maxW="200px" />
            <JarInfo jar={jar} />
          </HStack>
          {jar.currencies.length > 0 && (
            <>
              <Box w="full" h="2px" my="5" backgroundColor="gray.600"></Box>
              <Wrap>
                {jar.currencies.map((currency) => (
                  <Tag
                    w="fit-content"
                    size="lg"
                    variant="outline"
                    colorScheme="orange"
                    color="orange.300"
                    key={currency.currency}
                  >
                    {currency.balance} {currency.currency}
                  </Tag>
                ))}
              </Wrap>
            </>
          )}
        </CardBody>
      </Card>
      <Flex flexDir={orientation} w="full" gap="4">
        <Card w="full">
          <CardBody>
            <Heading fontSize="3xl" mb="4">
              Stores:
            </Heading>
            <VStack align="start">
              {jar.stores.map((store) => (
                <Box key={store.id}>
                  <Heading fontSize="xl">
                    {store.name}{' '}
                    <Text as="span" fontWeight="500" color="teal.400">
                      ({store.balance} {jar.targetCurrency})
                    </Text>
                  </Heading>
                  <VStack align="start" p="2">
                    {store.balances.map((currency) => (
                      <Tag
                        w="fit-content"
                        size="lg"
                        variant="outline"
                        colorScheme="orange"
                        color="orange.300"
                        key={currency.currency}
                      >
                        {currency.balance} {currency.currency}
                      </Tag>
                    ))}
                  </VStack>
                </Box>
              ))}
            </VStack>
            {jar.stores.length == 0 && <Text fontSize="xl">Empty</Text>}
          </CardBody>
        </Card>
        <Card w="full">
          <CardBody>
            <Heading fontSize="3xl" mb="4">
              Transactions:
            </Heading>
            <Box overflowX="auto">
              <Table w="full" maxW="full">
                <Tbody>
                  {transactions.map((transaction) => (
                    <Tr key={transaction.id}>
                      <Td>
                        {transaction.type == TransactionType.Inflow ? '+' : '-'}
                        {transaction.amount} {transaction.currency}
                      </Td>
                      <Td>{transaction.comment}</Td>
                      <Td isNumeric>{formatIso(transaction.createdAt)}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </CardBody>
        </Card>
      </Flex>
    </VStack>
  );
};
