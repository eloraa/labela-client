import { useContext } from 'react';
import { CartContext } from '../providers/CartProviders';
import { CartProduct } from '../shared/CartProduct';

export const Carts = () => {
  const { carts } = useContext(CartContext);

  return (
    <main className="md:px-10 px-5 py-10 mt-20 dark:text-white">
      <h1 className="text-2xl font-black uppercase mb-12">My Cart</h1>

      <div className="grid md:grid-cols-2 2xl:grid-cols-3 gap-10">
        {carts.length ? (
          carts.map((product, index) => <CartProduct key={index} product={product}></CartProduct>)
        ) : (
          <div>You have no products in your Cart.</div>
        )}
      </div>
    </main>
  );
};