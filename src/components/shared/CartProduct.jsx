import PropTypes from 'prop-types';
import { CartContext } from '../providers/CartProviders';
import { toast } from 'react-toastify';
import { CartInput } from './CartInput';
import { useContext } from 'react';

export const CartProduct = ({ product }) => {
  const { addToCart, removeCartItem } = useContext(CartContext);

  const handFormSubmit = e => {
    e.preventDefault();
    const quantity = e.target.quantity.value;
    if (quantity < 1) {
      toast('Item quantity must be at least 1');
      return;
    }

    const cartData = {
      productId: product._id,
      quantity,
    };
    addToCart(cartData);
  };
  return (
    <div className="flex w-full gap-5 max-md:flex-wrap pb-6 border-b-2">
      <figure className="w-40 mx-auto">
        <img className="w-full h-full object-contain" src={product.image} alt="" />
      </figure>
      <div className="w-full flex flex-col justify-between">
        <div>
          <h1 className="font-bold text-ellipsis overflow-hidden">{product.name}</h1>
          <h1>${product.price.toFixed(2)}</h1>
          <div className="mt-6">
            <CartInput currentValue={product?.quantity} className='md:grid-cols-[1fr_auto]' handFormSubmit={handFormSubmit} value={product.quantity}>
              Update
            </CartInput>
          </div>
        </div>
        <button onClick={() => removeCartItem(product._id)} className="mt-6 self-start text-sm underline active:scale-[.98] transition-transform">
          Remove
        </button>
      </div>
    </div>
  );
};

CartProduct.propTypes = {
  product: PropTypes.object,
};
