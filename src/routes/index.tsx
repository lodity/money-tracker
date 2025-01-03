import { createBrowserRouter } from 'react-router-dom';
import BaseLayout from '../layout/BaseLayout';
import React from 'react';
import { HomePage } from '../pages/HomePage';
import ProtectedRoute from '../components/ProtectedRoute';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';

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
    path: '/signin',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Register />,
  },
]);
