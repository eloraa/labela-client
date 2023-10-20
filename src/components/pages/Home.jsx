import { useContext } from 'react';
import { About } from '../shared/About';
import { Banner } from '../shared/Banner';
import { BrandContext } from '../Root';
import { Link, useLoaderData } from 'react-router-dom';
import { SwiperSlide } from 'swiper/react';
import { Product } from '../shared/Product';

export const Home = () => {
  const { brandData } = useContext(BrandContext);

  const products = useLoaderData();

  return (
    <>
      <Banner>
        <SwiperSlide>
          <div className="w-full h-full bg-black bg-cover bg-center md:px-10 px-5 flex items-end pb-10" style={{ backgroundImage: 'url(/01-c.jpg)' }}>
            <div className="text-2xl md:text-4xl leading-[1] font-black uppercase text-white heading">
              <h1>New Generation</h1>
              <h1>Sky Brown</h1>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-full bg-black bg-cover bg-[top_right] md:px-10 px-5 flex items-end pb-10" style={{ backgroundImage: 'url(/02-c.jpg)' }}>
            <div className="text-2xl md:text-4xl leading-[1] font-black uppercase text-white heading">
              <h1>Back to new</h1>
              <h1>Collection</h1>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-full bg-black bg-cover bg-center md:px-10 px-5 flex items-end pb-10" style={{ backgroundImage: 'url(/03-c.jpg)' }}>
            <div className="text-2xl md:text-4xl leading-[1] font-black uppercase text-white heading">
              <h1>Never Done</h1>
              <h1>Rising</h1>
            </div>
          </div>
        </SwiperSlide>
      </Banner>

      <main className="md:px-10 px-5 py-10 mt-40 dark:text-white">
        <div className="mb-20">
          <h1 className="text-2xl font-black uppercase mb-12">Latest Collection</h1>

          <div className="grid md:grid-cols-2 lg:grid-flow-cols-3 xl:grid-cols-4 gap-10">
            {products.length ? products.map((product, index) => <Product key={index} product={product}></Product>) : <div>We have no product at this moment.</div>}
          </div>
          {products.length ? (
            <div className="w-full mt-16 flex justify-center items-center">
              <button className="bg-black py-2 w-full md:w-auto mx-auto md:px-24 px-0 text-white font-bold rounded active:scale-[.99] transition-transform dark:bg-dark dark:text-black">
                Load More
              </button>
            </div>
          ) : (
            ''
          )}
        </div>
        <div className="mb-20 mt-40">
          <h1 className="text-2xl font-black uppercase mb-12">Browse by brands</h1>
          <div className="grid gap-10 md:gap-16 flex-wrap auto-cols-min grid-cols-3 md:grid-cols-6">
            {brandData.brands.map((brand, i) => (
              <div key={i} className="flex flex-col h-full">
                <figure className="h-7">
                  <img
                    className="w-full h-full object-contain dark:invert"
                    src={`/${brand
                      .toLowerCase()
                      .replace(/\s+/g, '-')
                      .replace(/[^a-z0-9-]/g, '')}.png`}
                    alt=""
                  />
                </figure>
                <Link to={`/brand/${brand.toLowerCase()}`}>
                  <h2 className="uppercase font-bold text-xl text-center mt-6">{brand}</h2>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <About></About>
      </main>
    </>
  );
};
