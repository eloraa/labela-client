import { Link, useLoaderData, useParams } from 'react-router-dom';
import { NotFound } from '../shared/NotFound';
import { Banner } from '../shared/Banner';
import { SwiperSlide } from 'swiper/react';
import { useContext } from 'react';
import { BrandContext } from '../Root';

export const Brand = () => {
  const data = useLoaderData();
  const { brandData } = useContext(BrandContext);
  const params = useParams();
  const brand = params.brand;

  if (data?.errors) return <NotFound alt={true}></NotFound>;
  return (
    <div>
      <Banner>
        {brandData.scheme[brand.toLowerCase()].map((scheme, i) => (
          <SwiperSlide key={i}>
            <div className="w-full h-full bg-black bg-cover bg-center md:px-10 px-5 flex items-end pb-10" style={{ backgroundImage: `url("/${brand.toLowerCase()}${scheme.image}")` }}>
              <div className="text-2xl md:text-4xl leading-[1] font-black uppercase heading flex flex-col items-start">
                <h1 className="inline-block" style={{ backgroundColor: scheme.theme }}>
                  {scheme.heading[0]}
                </h1>
                <h1 className="inline-block" style={{ backgroundColor: scheme.theme }}>
                  {scheme.heading[1]}
                </h1>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Banner>

      <main className="md:px-10 px-5 py-10 mt-20 dark:text-white">
        <h1 className="text-2xl font-black uppercase mb-12">
          {brand} <span className="text-neutral-300 dark:text-neutral-700">- Brand</span>
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-flow-cols-3 xl:grid-cols-4 gap-10">
          {data.length ? (
            data.map((product, index) => (
              <div className="md:max-w-[300px] mx-auto flex justify-center items-center" key={index}>
                <div className="w-full">
                  <figure className="h-[420px] bg-gray-50 dark:bg-gray-950">
                    <img className="w-full h-full object-contain" src={product.image} alt="" />
                  </figure>
                  <h4 className="text-neutral-500 font-medium text-sm capitalize mt-4">{product.type}</h4>

                  <div className="font-bold text-[1.05rem] capitalize mt-1">
                    <Link to={`/product/${product._id}`}>
                      <h1 className='whitespace-nowrap text-ellipsis overflow-hidden'>{product.name}</h1>
                    </Link>
                    <div className="flex gap-2 items-center">
                      <h2>${product.price.toFixed(2)}</h2>
                      <h2 className="text-neutral-400">- Rating: {product.rating} / 5</h2>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>This brand has no products.</div>
          )}
        </div>
      </main>
    </div>
  );
};
