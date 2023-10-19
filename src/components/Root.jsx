import { createContext } from 'react';
import { Outlet, ScrollRestoration, useLoaderData } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import '../assests/ReactToastify.modf.css';
import { Header } from './shared/Header';
import { Footer } from './shared/Footer';

export const BrandContext = createContext([]);

export const Root = () => {
  const brandData = useLoaderData();
  return (
    <BrandContext.Provider value={{ brandData }}>
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>

      <ScrollRestoration />
      <ToastContainer position="bottom-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" />
    </BrandContext.Provider>
  );
};
