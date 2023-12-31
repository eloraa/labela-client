import PropTypes from 'prop-types';
import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from './AuthProviders';

export const CartContext = createContext(null);

const CartProvider = ({ children }) => {
  const [carts, setCarts] = useState([]);
  const { loading, user } = useContext(AuthContext);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (!loading && !isUpdating && user) {
      fetch(`${import.meta.env.VITE_BACKENDSERVER}/cart/${user.uid}`)
        .then(response => response.json())
        .then(data => setCarts(data));
    } else {
      return () => {};
    }
  }, [loading, user, isUpdating]);

  const addToCart = (data, method) => {
    return new Promise(resolve => {
      if (isUpdating) {
        resolve();
        return;
      }
      setIsUpdating(true);
      if (method !== 'inc') method = null;
      else data.method = method;

      fetch(`${import.meta.env.VITE_BACKENDSERVER}/cart/${user.uid}`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(res => res.json())
        .then(response => {
          setIsUpdating(false);
          resolve();
          toast.dismiss();
          if (response.errors) {
            setIsUpdating(false);
            toast.dismiss();
            resolve();
            response.errors.map(error => {
              toast(error.messages[0]);
            });
            return;
          }
          if (response.success) {
            if (method === 'inc') {
              toast('Item successfully added to the Cart');
              resolve();
            } else {
              toast('Successfully updated the item to the Cart');
              resolve();
            }
          }
        })
        .catch(() => {
          setIsUpdating(false);
          toast.dismiss();
          toast('Something went wrong');
          resolve();
        });
    });
  };
  const removeCartItem = productId => {
    return new Promise(resolve => {
      if (isUpdating) {
        resolve()
        return
      }
      setIsUpdating(true);

      fetch(`${import.meta.env.VITE_BACKENDSERVER}/cart/${user.uid}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      })
        .then(res => res.json())
        .then(response => {
          setIsUpdating(false);
          resolve()
          toast.dismiss();
          if (response.errors) {
            setIsUpdating(false);
            toast.dismiss();
            resolve()
            response.errors.map(error => {
              toast(error.messages[0]);
            });
            return;
          }
          if (response.success) {
            toast('Item successfully deleted from the Cart');
            resolve()
          }
        })
        .catch(() => {
          setIsUpdating(false);
          toast.dismiss();
          resolve()
          toast('Something went wrong');
        });
    });
  };

  return <CartContext.Provider value={{ carts, setCarts, addToCart, removeCartItem, isUpdating }}>{children}</CartContext.Provider>;
};

CartProvider.propTypes = {
  children: PropTypes.node,
};

export default CartProvider;
