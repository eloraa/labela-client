import { createContext } from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import '../assests/ReactToastify.modf.css';
import { Header } from './shared/Header';


export const DataContext = createContext([]);

export const Root = () => {
  return (
    <>
      <Header></Header>
      <Outlet />

      <ScrollRestoration />
      <ToastContainer position="bottom-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" />
    </>
  );
};
