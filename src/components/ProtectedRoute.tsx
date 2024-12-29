import React from 'react';
import { useAuth } from '../hooks/useAuth';

type Props = {
  children: JSX.Element;
};

export default function ProtectedRoute({ children }: Props): JSX.Element {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <div>Permission denied</div>;
  }

  return children;
}
