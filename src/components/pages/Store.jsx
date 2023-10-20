import { useLoaderData, useSearchParams } from 'react-router-dom';
import { Product } from '../shared/Product';

export const Store = () => {
  const data = useLoaderData();
  let [, setPageParams] = useSearchParams();

  return (
    <main className="md:px-10 px-5 py-10 mt-20 dark:text-white">
      <div className="mb-20">
        <div className="grid md:grid-cols-2 gap-10 mb-12">
          <h1 className="text-2xl font-black uppercase text-justify">Explore our extensive collection and discover a wide range of products and styles available for you.</h1>
          <h4 className="font-bold text-sm uppercase flex items-end md:justify-end gap-2">
            <span className="font-normal">Total - </span> {data.total}
          </h4>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {data.products.length ? data.products.map((product, index) => <Product key={index} product={product}></Product>) : <div>We have no product at this moment.</div>}
        </div>
        {data.totalPages ? (
          <div className="w-full mt-16 flex justify-center items-center gap-5">
            {Array.from({ length: data.totalPages }, (_, index) => (
              <div key={index}>{index + 1 === data.currentPage ? <div className='font-bold cursor-pointer'>{index + 1}</div> : <div className='cursor-pointer' onClick={() => setPageParams({ page: index + 1 })}>{index + 1}</div>}</div>
            ))}
          </div>
        ) : (
          ''
        )}
      </div>
    </main>
  );
};
