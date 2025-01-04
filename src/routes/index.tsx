import { createBrowserRouter } from 'react-router-dom';
import BaseLayout from '../layout/BaseLayout';
import React from 'react';
import { HomePage } from '../pages/HomePage';
import ProtectedRoute from '../components/ProtectedRoute';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { NotFoundPage } from '../pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: (
          <ProtectedRoute>
            <HomePage />
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
