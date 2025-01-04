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
import CreateJarForm from '../components/CreateJarForm';

export const HomePage = () => {
  const [jars, setJars] = useState<Jar[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create jar</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CreateJarForm
              onJarCreated={(newJar) =>
                setJars((prevJars) => [...prevJars, newJar])
              }
              onClose={onClose}
            />
          </ModalBody>
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
