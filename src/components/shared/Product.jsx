import PropTypes from 'prop-types';
import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProviders';



export const Product = ({ product }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation()
  return (
    <div className="md:max-w-[300px] w-full mx-auto flex justify-center items-center">
      <div className="w-full">
        <figure className="h-[420px] bg-gray-50 dark:bg-[#222]">
          <img className="w-full h-full object-contain" src={product.image} alt="" />
        </figure>
        <h4 className="text-neutral-400 font-medium text-sm capitalize mt-4">{product.type}</h4>

        <div className="font-bold text-[1.05rem] capitalize mt-1">
          <Link to={`/product/${product._id}`}>
            <h1 className="whitespace-nowrap text-ellipsis overflow-hidden max-w-[calc(100vw-40px)]">{product.name}</h1>
          </Link>
          <div className="flex gap-2 items-center">
            <h2>${product.price.toFixed(2)}</h2>
            <h2 className="text-neutral-500 font-normal">- Rating: {product.rating}/5</h2>
          </div>
          {user && <Link state={location.pathname} to={`/product/edit/${product._id}`}><button className="text-sm underline active:scale-[.98] transition-transform mt-4 font-normal">Edit this Product</button></Link>}
        </div>
      </div>
    </div>
  );
};

Product.propTypes = {
  product: PropTypes.object,
};
