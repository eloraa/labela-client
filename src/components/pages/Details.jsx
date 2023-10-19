import { useLoaderData } from 'react-router-dom';
import { NotFound } from '../shared/NotFound';
import { useState } from 'react';

export const Details = () => {

    const [cartValue, setCartValue] = useState(0)

    const handleMinMax = (event, min, max, callback) => {
    const value = Math.max(min, Math.min(max, Number(event.target.value)));
    if(event.target.value === '') {
        callback('')
        return
    }
    callback(value);
  };
  const product = useLoaderData();
  if (product?.errors) return <NotFound alt={true}></NotFound>;

  return (
    <main className="py-6 md:px-10 px-5 dark:text-white">
      <div>
        <figure className="h-[420px] md:w-[300px] w-full">
          <img className="w-full h-full object-contain" src={product.image} alt="" />
        </figure>
        <div className="mt-20 grid md:grid-cols-3 gap-16">
          <div>
            <h1 className="font-extrabold text-3xl md:text-5xl text-justify uppercase">{product.name}</h1>
          </div>
          <div className="w-full md:col-span-2">
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
            <div className='mt-6'>
              <form className="flex items-center gap-4 max-md:flex-wrap">
                <div className="flex items-center gap-2 text-center rounded border-2 px-3 max-md:w-full">
                  <span className="font-bold whitespace-nowrap px-4 relative cursor-pointer h-9" onClick={() => setCartValue(cartValue <= 0 ? 0 : cartValue - 1)}>
                    <div className='w-full h-full after:absolute after:content-[""] after:w-3 after:h-[2px] after:rounded-full after:left-[calc(50%-10px)] after:top-[calc(50%-1px)] after:bg-black dark:after:bg-white'></div>
                  </span>
                  <input
                    onChange={e => handleMinMax(e, 1, 9999, setCartValue)}
                    className="w-full text-center focus:border-black outline-none border-2 py-2 px-4 disabled:border-none disabled:pl-0 rounded dark:bg-[#222] dark:border-transparent dark:focus:border-dark"
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    value={cartValue}
                  />
                  <span className="font-bold whitespace-nowrap px-4 relative cursor-pointer h-9" onClick={() => setCartValue(cartValue >= 9999 ? 9999 : cartValue + 1)}>
                    <div className='w-full h-full after:absolute after:content-[""] after:w-3 after:h-[2px] after:rounded-full after:right-[calc(50%-10px)] after:top-[calc(50%-1px)] after:bg-black dark:after:bg-white before:absolute before:content-[""] before:w-[2px] before:h-3 before:rounded-full before:right-[calc(50%-5px)] before:top-[calc(50%-6px)] before:bg-black dark:before:bg-white'></div>
                    </span>
                </div>
                <button name="submit" className="bg-black h-full py-2 w-full text-white font-bold rounded active:scale-[.99] transition-transform dark:bg-dark dark:text-black">
                  Add item to the Cart
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
