import { Navigate, createBrowserRouter } from 'react-router-dom';
import BaseLayout from '../layout/BaseLayout';
import React from 'react';
import { JarListPage } from '../pages/JarListPage';
import ProtectedRoute from '../components/ProtectedRoute';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { NotFoundPage } from '../pages/NotFoundPage';
import { JarPage } from '../pages/JarPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/jars" replace />,
  },
  {
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/jars" replace />,
      },
      {
        path: '/jars',
        element: (
          <ProtectedRoute>
            <JarListPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/jars/:id',
        element: (
          <ProtectedRoute>
            <JarPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: '/sign-in',
    element: <Login />,
  },
  {
    path: '/sign-up',
    element: <Register />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
