import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Root } from './components/Root';
import { Home } from './components/pages/Home';
import { NotFound } from './components/shared/NotFound';
import AuthProvider from './components/providers/AuthProviders';
import { SignIn } from './components/pages/Signin';
import { Signup } from './components/pages/Signup';
import { Profile } from './components/pages/Profile';
import { PrivateRoute } from './components/utils/PrivateRoute';
import { Brand } from './components/pages/Brand';
import { AddProduct } from './components/pages/AddProduct';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFound></NotFound>,
    loader: () => fetch(`${import.meta.env.VITE_BACKENDSERVER}/brand`),
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/signin',
        element: <SignIn></SignIn>
      },
      {
        path: '/signup',
        element: <Signup></Signup>
      },
      {
        path: '/profile',
        element: <PrivateRoute><Profile></Profile></PrivateRoute>
      },
      {
        path: '/brand/:brand',
        element: <Brand></Brand>,
        loader: ({ params }) => fetch(`${import.meta.env.VITE_BACKENDSERVER}/brand/${params.brand.to}`),
      },
      {
        path: '/product/add',
        element: <PrivateRoute><AddProduct></AddProduct></PrivateRoute>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </React.StrictMode>
);
