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
import { Details } from './components/pages/Details';
import { EditProduct } from './components/pages/EditProduct';
import { Store } from './components/pages/Store';
import CartProvider from './components/providers/CartProviders';
import { Carts } from './components/pages/Carts';
import PreloaderProvider from './components/providers/PreloaderProvider';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFound></NotFound>,
    loader: async () => await fetch(`${import.meta.env.VITE_BACKENDSERVER}/brand`),
    children: [
      {
        path: '/',
        element: <Home />,
        loader: async () => await fetch(`${import.meta.env.VITE_BACKENDSERVER}/product/latest`),
      },
      {
        path: '/signin',
        element: <SignIn></SignIn>,
      },
      {
        path: '/signup',
        element: <Signup></Signup>,
      },
      {
        path: '/profile',
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
      {
        path: '/brand/:brand',
        element: <Brand></Brand>,
        loader: async ({ params }) => await fetch(`${import.meta.env.VITE_BACKENDSERVER}/brand/${params.brand.toLowerCase()}`),
      },
      {
        path: '/product/add',
        element: (
          <PrivateRoute>
            <AddProduct></AddProduct>
          </PrivateRoute>
        ),
      },
      {
        path: '/product/:id',
        element: (
          <PrivateRoute>
            <Details></Details>
          </PrivateRoute>
        ),
        loader: async ({ params }) => await fetch(`${import.meta.env.VITE_BACKENDSERVER}/product/${params.id}`),
      },
      {
        path: '/product/edit/:id',
        element: (
          <PrivateRoute>
            <EditProduct></EditProduct>
          </PrivateRoute>
        ),
        loader: async ({ params }) => await fetch(`${import.meta.env.VITE_BACKENDSERVER}/product/${params.id}`),
      },
      {
        path: '/store',
        element: <Store></Store>,
        loader: async ({ request }) => {
          const page = new URL(request.url).searchParams.get('page');
          return await fetch(`${import.meta.env.VITE_BACKENDSERVER}/product?page=${page || 1}`);
        },
      },
      {
        path: '/cart',
        element: (
          <PrivateRoute>
            <Carts></Carts>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PreloaderProvider>
      <AuthProvider>
        <CartProvider>
          <RouterProvider router={router}></RouterProvider>
        </CartProvider>
      </AuthProvider>
    </PreloaderProvider>
  </React.StrictMode>
);
