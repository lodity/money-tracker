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
import JarForm from '../components/JarForm';
import { useNavigate } from 'react-router';

export const JarPage = () => {
  const { id } = useParams();
  const [jar, setJar] = useState<DetailedJar | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const orientation = useBreakpointValue<'column' | 'row'>({
    base: 'column',
    md: 'row',
    lg: 'row',
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
    if (!id) {
      return;
    }

    JarApi.getById(Number(id))
      .then((response) => {
        setJar(response.data.data);
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        setIsLoading(false);
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

      <VStack w={'full'} align="start" gap="4">
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
              {jar.stores.length === 0 && <Text fontSize="xl">Empty</Text>}
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
