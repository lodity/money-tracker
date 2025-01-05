import React, { useEffect, useState } from 'react';
import { JarApi } from '../api/jar';
import { useAuth } from '../hooks/useAuth';
import { Jar } from '../types/jar';
import {
  Button,
  Card,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  Image,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  VStack,
  AbsoluteCenter,
  Spinner,
} from '@chakra-ui/react';
import CreateJarForm from '../components/CreateJarForm';
import { Link } from 'react-router-dom';
import { JarInfo } from '../components/JarInfo';

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
      <VStack w="80%" minW="300px" mx="auto" gap="4" maxW="700px">
        <Button onClick={onOpen} size="lg">
          Create jar
        </Button>
        {isLoading ? (
          <AbsoluteCenter mt="50vh">
            <Spinner size="xl" />
          </AbsoluteCenter>
        ) : (
          jars.map((jar) => (
            <Link to={`/jars/${jar.id}`} style={{ width: '100%' }} key={jar.id}>
              <Card flexDir="row">
                <Image src="/jar.png" alt="Jar" maxW="140px" />
                <JarInfo jar={jar} />
              </Card>
            </Link>
          ))
        )}
      </VStack>
    </>
  );
};
