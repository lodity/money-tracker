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
  Grid,
  useBreakpointValue,
} from '@chakra-ui/react';
import JarForm from '../components/JarForm';
import { Link } from 'react-router-dom';
import { JarInfo } from '../components/JarInfo';

export const JarListPage = () => {
  const [jars, setJars] = useState<Jar[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { currentUser } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const grid = useBreakpointValue({
    base: 'repeat(1, 1fr)',
    md: 'repeat(2, 1fr)',
    lg: 'repeat(2, 1fr)',
  });

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
            <JarForm
              onCompleted={(newJar) =>
                setJars((prevJars) => [...prevJars, newJar])
              }
              onClose={onClose}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
      <VStack>
        <Button onClick={onOpen} size="lg">
          Create jar
        </Button>
        <Grid minW="300px" mx="auto" gap="4" maxW="95%" templateColumns={grid}>
          {isLoading ? (
            <AbsoluteCenter>
              <Spinner size="xl" />
            </AbsoluteCenter>
          ) : (
            jars.map((jar) => (
              <Link to={`/jars/${jar.id}`} key={jar.id}>
                <Card flexDir="row" minH="40">
                  <Image
                    src="/jar.png"
                    alt="Jar"
                    maxW="140px"
                    objectFit="contain"
                  />
                  <JarInfo jar={jar} />
                </Card>
              </Link>
            ))
          )}
        </Grid>
      </VStack>
    </>
  );
};
