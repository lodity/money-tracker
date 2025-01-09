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
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Table,
  Tag,
  Tbody,
  Td,
  Text,
  Tooltip,
  Tr,
  useBreakpointValue,
  useDisclosure,
  VStack,
  Wrap,
} from '@chakra-ui/react';
import { JarInfo } from '../components/JarInfo';
import JarForm from '../components/JarForm';
import { useNavigate } from 'react-router';
import { Transaction, TransactionType } from '../types/transaction';
import { TransactionApi } from '../api/transaction';
import { formatIso } from '../utils';
import { useAuth } from '../hooks/useAuth';

export const JarPage = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const [jar, setJar] = useState<DetailedJar | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [pages, setPages] = useState<number>(1);
  const [page, setPage] = useState(1);

  const orientation = useBreakpointValue<'column' | 'row'>({
    base: 'column',
    md: 'row',
    lg: 'row',
  });

  const minStackWidth = useBreakpointValue<'auto' | 'fit-content'>({
    base: 'auto',
    md: 'fit-content',
    lg: 'fit-content',
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const handleDelete = () => {
    if (!id) {
      return;
    }

    JarApi.delete(Number(id))
      .then(() => {
        navigate('/jars');
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    if (!currentUser?.token || !id) {
      return;
    }

    JarApi.getById(Number(id), currentUser.token)
      .then((response) => {
        setJar(response.data.data);
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id, currentUser]);

  useEffect(() => {
    if (!id) {
      return;
    }

    TransactionApi.get(10, (page - 1) * 10, Number(id)).then((response) => {
      setTransactions(response.data.data.transactions);
      setPages(response.data.data.totalPages);
    });
  }, [id, page]);

  if (isLoading || !jar) {
    return (
      <AbsoluteCenter>
        <Spinner size="xl" />
      </AbsoluteCenter>
    );
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit jar</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <JarForm
              editData={jar}
              onCompleted={(newJar) => setJar(newJar)}
              onClose={onClose}
            />
          </ModalBody>
        </ModalContent>
      </Modal>

      <VStack
        w="full"
        align="start"
        gap="4"
        minW={minStackWidth}
        maxW="95%"
        mx="auto"
        pb="10"
      >
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
            <HStack justifyContent="flex-end" w="full">
              <Button onClick={onOpen}>Edit</Button>
              <Button onClick={handleDelete} colorScheme="red">
                Delete
              </Button>
            </HStack>
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
        <Flex flexDir={orientation} w="full" gap="4" minW="fit-content">
          <Card w="full">
            <CardBody>
              <Heading fontSize="3xl" mb="4" whiteSpace="nowrap">
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
              {jar.stores.length === 0 && (
                <Text fontSize="xl" w="52">
                  Empty
                </Text>
              )}
            </CardBody>
          </Card>
          <Card w="full" minW="fit-content">
            <CardBody>
              <Heading fontSize="3xl" mb="4" whiteSpace="nowrap">
                Transactions:
              </Heading>
              {transactions && transactions.length > 0 ? (
                <Box overflowX="auto">
                  <Table w="full" maxW="full" colorScheme="teal">
                    <Tbody>
                      {transactions.map((transaction) => (
                        <Tr
                          key={transaction.id}
                          color={
                            transaction.type == TransactionType.Inflow
                              ? 'teal.300'
                              : 'red.300'
                          }
                        >
                          <Td
                            pl={0}
                            fontWeight="semibold"
                            maxW="24"
                            whiteSpace="nowrap"
                          >
                            {transaction.type == TransactionType.Inflow
                              ? '+'
                              : '-'}
                            {transaction.amount} {transaction.currency}
                          </Td>
                          <Td>
                            <Tooltip
                              label={transaction.comment}
                              background="gray.900"
                              color="white"
                              hasArrow
                            >
                              <Text
                                maxW="28"
                                overflow="hidden"
                                whiteSpace="nowrap"
                                textOverflow="ellipsis"
                              >
                                {transaction.comment}
                              </Text>
                            </Tooltip>
                          </Td>
                          <Td textAlign="center">
                            {formatIso(transaction.createdAt)}
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                  {pages > 1 && (
                    <Wrap>
                      {Array.from({ length: pages }).map((_, index) => (
                        <Button
                          key={index}
                          variant={index + 1 == page ? 'solid' : 'outline'}
                          onClick={() => setPage(index + 1)}
                          maxW="10"
                        >
                          {index + 1}
                        </Button>
                      ))}
                    </Wrap>
                  )}
                </Box>
              ) : (
                <Text fontSize="xl" w="52">
                  Empty
                </Text>
              )}
            </CardBody>
          </Card>
        </Flex>
      </VStack>
    </>
  );
};
