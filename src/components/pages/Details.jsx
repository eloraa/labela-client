import { useLoaderData } from 'react-router-dom';
import { NotFound } from '../shared/NotFound';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { CartContext } from '../providers/CartProviders';
import { CartInput } from '../shared/CartInput';
import { Spinner } from '../shared/Spinner';

export const Details = () => {
  const { addToCart, carts } = useContext(CartContext)
  const [isUpdating, setIsUpdating] = useState(false)
  const product = useLoaderData();
  const cartProduct = carts.find(c => c._id === product._id)




  const handFormSubmit = e => {
    e.preventDefault()
    setIsUpdating(true)
    const quantity = e.target.quantity.value

    if(parseInt(quantity) + parseInt(cartProduct?.quantity) > 9999) {
      toast('You cannot exceed the quantity of 9999 in your cart. please proceed to Checkout.')
      setIsUpdating(false)
      return
    }

    if(quantity < 1) {
      toast('Item quantity must be at least 1')
      setIsUpdating(false)
      return
    }
    

    const cartData = {
      productId: product._id,
      quantity
    }
    addToCart(cartData, 'inc').then(() => setIsUpdating(false))
  }


  if (product?.errors) return <NotFound alt={true}></NotFound>;

  return (
    <main className="py-6 md:px-10 px-5 dark:text-white">
      <div>
        <div className='grid md:grid-cols-[auto_1fr] gap-16'>
          <figure className="h-[420px] md:w-[300px] w-full">
            <img className="w-full h-full object-contain" src={product.image} alt="" />
          </figure>
          <div className='flex items-center justify-center'>
            <h1 className="font-extrabold text-[7vw] leading-[1] text-justify uppercase">{product.name}</h1>
          </div>
        </div>
        <div className="mt-8 md:mt-2 gap-16">
          <div className="w-full">
            <p className="text-sm">{product.description}</p>
            <div className="flex gap-2 md:gap-6 mt-6 items-center flex-wrap max-md:justify-between">
              <h2 className="font-bold">${product.price.toFixed(2)}</h2>
              <div className="w-5 border-b-2 border-[#ddd]"></div>
              <h2 className="font-bold">
                {product.rating}/5 <span className="text-neutral-500 font-normal"> - Ratings</span>
              </h2>
              <div className="w-5 border-b-2 border-[#ddd] max-md:hidden"></div>
              <h2 className="font-bold">
                {product.brandName} <span className="text-neutral-500 font-normal"> - Brand</span>
              </h2>
              <div className="w-5 border-b-2 border-[#ddd]"></div>
              <h2 className="font-bold">{product.type}</h2>
            </div>
            <div className="mt-6">
              <CartInput className='md:grid-cols-[auto_1fr]' handFormSubmit={handFormSubmit}>
              {isUpdating ? (
                <>
                  <Spinner></Spinner> <span className="opacity-0 invisible pointer-events-none">Add item to the cart</span>
                </>
              ) : (
                'Add item to the cart'
              )}
            </CartInput>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
