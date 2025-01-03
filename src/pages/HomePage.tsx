import React, { useEffect, useState } from 'react';
import { JarApi } from '../api/jar';
import { useAuth } from '../hooks/useAuth';
import { Jar } from '../types/jar';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { CreateJarRequest } from '../types/api/jarApi';

export const HomePage = () => {
  const [jars, setJars] = useState<Jar[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [createJar, setCreateJar] = useState<CreateJarRequest>({
    name: '',
    target: 0,
    targetCurrencyId: 0,
  });

  const { currentUser } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    setIsLoading(true);

    JarApi.getAll(currentUser.token)
      .then((res) => {
        console.log(res);
        setJars(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [currentUser]);

  const handleCreateJar = async () => {
    JarApi.create(createJar)
      .then((res) => {
        console.log(res);
        setJars((v) => [...v, res.data.data]);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleCreateJar}></form>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="blue">Create</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <div>
        <Button onClick={onOpen}>Create jar</Button>
        <h1>Jars:</h1>
        {jars.map((jar) => (
          <VStack
            key={jar.id}
            w="fit-content"
            p="2"
            borderWidth="1px"
            borderColor="gray"
          >
            <Text>Name: {jar.name}</Text>
            <Text>
              Target: {jar.target} {jar.targetCurrency}
            </Text>
            <Text>
              Balance: {jar.balance} {jar.targetCurrency}
            </Text>
            <Text>Progress: {jar.balance / jar.target} %</Text>
          </VStack>
        ))}
      </div>
    </>
  );
};
