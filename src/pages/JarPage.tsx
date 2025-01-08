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
  Tag,
  Text,
  useBreakpointValue,
  useDisclosure,
  VStack,
  Wrap,
} from '@chakra-ui/react';
import { JarInfo } from '../components/JarInfo';
import CreateStoreForm from '../components/CreateStoreForm';
import CreateTransactionForm from '../components/CreateTransactionForm';

export const JarPage = () => {
  const { id } = useParams();
  const [jar, setJar] = useState<DetailedJar | null>(null);
  const [activeStoreId, setActiveStoreId] = useState(0);
  const [updateCounter, setUpdateCounter] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenAddTransaction,
    onOpen: onOpenAddTransaction,
    onClose: onCloseAddTransaction,
  } = useDisclosure();
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
  }, [id, updateCounter]);

  if (isLoading || !jar) {
    return (
      <AbsoluteCenter mt="50vh">
        <Spinner size="xl" />
      </AbsoluteCenter>
    );
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create jar</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CreateStoreForm
              onStoreCreated={(newStore) =>
                setJar((prev) => {
                  console.error('Jar state is null or undefined.');
                  if (!prev) return prev; // Перевірка, чи `prev` не є `null`

                  return {
                    ...prev,
                    stores: [...prev.stores, { ...newStore, balances: [] }],
                  };
                })
              }
              jarId={jar.id}
              onClose={onClose}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpenAddTransaction} onClose={onCloseAddTransaction}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add transaction</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CreateTransactionForm
              onTransactionCreated={() => {
                setUpdateCounter((prev) => prev + 1);
              }}
              storeId={activeStoreId}
              onClose={onClose}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
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
              <HStack mb="4" justifyContent="space-between">
                <Heading fontSize="3xl">Stores:</Heading>
                <Button colorScheme="orange" h="35px" onClick={onOpen}>
                  Add
                </Button>
              </HStack>
              <VStack align="start">
                {jar.stores.map((store) => (
                  <Box key={store.id}>
                    <Heading fontSize="xl">
                      {store.name}{' '}
                      <Text as="span" fontWeight="500" color="teal.400">
                        ({store.balance} {jar.targetCurrency})
                      </Text>
                      <Button
                        fontSize="3xl"
                        lineHeight="1"
                        h="30px"
                        w="30px"
                        onClick={() => {
                          setActiveStoreId(store.id);
                          onOpenAddTransaction();
                        }}
                      >
                        +
                      </Button>
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
              ToDo
            </CardBody>
          </Card>
        </Flex>
      </VStack>
    </>
  );
};
