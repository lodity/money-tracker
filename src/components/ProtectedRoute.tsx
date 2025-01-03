import React, { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

type Props = {
  children: JSX.Element;
};

export default function ProtectedRoute({ children }: Props): JSX.Element {
  const { currentUser, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser && !isLoading) {
      navigate('/sign-in');
    }
  }, [currentUser, navigate, isLoading]);

  if (!currentUser || isLoading) {
    return <></>;
  }

  return children;
}
