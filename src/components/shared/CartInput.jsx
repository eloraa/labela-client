
import PropTypes from 'prop-types';
import { useState } from 'react';

export const CartInput = ({ children, handFormSubmit, value, className }) => {
    const [cartValue, setCartValue] = useState(value || 0);
  
    const handleMinMax = (event, min, max, callback) => {
      const value = Math.max(min, Math.min(max, Number(event.target.value)));
      if (event.target.value === '') {
        callback('');
        return;
      }
      callback(value);
    };
  return (
    <form onSubmit={handFormSubmit} className={`gap-4 grid ${className ? className : ''}`}>
      <div className="flex items-center gap-2 text-center rounded border-2 px-3 max-md:w-full">
        <span className="font-bold whitespace-nowrap px-4 relative cursor-pointer h-9" onClick={() => setCartValue(cartValue <= 1 ? 1 : cartValue - 1)}>
          <div className='w-full h-full after:absolute after:content-[""] after:w-3 after:h-[2px] after:rounded-full after:left-[calc(50%-10px)] after:top-[calc(50%-1px)] after:bg-black dark:after:bg-white'></div>
        </span>
        <input
          onChange={e => handleMinMax(e, 1, 9999, setCartValue)}
          className="w-full text-center focus:border-black outline-none border-x-2 py-2 px-4 disabled:border-none disabled:pl-0 rounded dark:bg-[#222] dark:border-transparent dark:focus:border-dark"
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={cartValue}
        />
        <span className="font-bold whitespace-nowrap px-4 relative cursor-pointer h-9" onClick={() => setCartValue(cartValue >= 9999 ? 9999 : cartValue + 1)}>
          <div className='w-full h-full after:absolute after:content-[""] after:w-3 after:h-[2px] after:rounded-full after:right-[calc(50%-10px)] after:top-[calc(50%-1px)] after:bg-black dark:after:bg-white before:absolute before:content-[""] before:w-[2px] before:h-3 before:rounded-full before:right-[calc(50%-5px)] before:top-[calc(50%-6px)] before:bg-black dark:before:bg-white'></div>
        </span>
      </div>
      <button name="submit" className="bg-black h-full py-2 px-8 w-full text-white font-bold rounded active:scale-[.99] transition-transform dark:bg-dark dark:text-black">
        {children}
      </button>
    </form>
  )
}
CartInput.propTypes = {
    children: PropTypes.node,
    handFormSubmit: PropTypes.func,
    value: PropTypes.number,
    className: PropTypes.string
  };
  