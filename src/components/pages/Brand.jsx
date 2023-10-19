import { useLoaderData, useParams } from 'react-router-dom';
import { NotFound } from '../shared/NotFound';
import { Banner } from '../shared/Banner';
import { SwiperSlide } from 'swiper/react';
import { useContext } from 'react';
import { BrandContext } from '../Root';

export const Brand = () => {
  const data = useLoaderData();
  const { brandData } = useContext(BrandContext);
  const params = useParams();
  const brand = params.brand

  if (data?.errors) return <NotFound alt={true}></NotFound>;
  return (
    <div>
      <Banner>
        {brandData.scheme[brand.toLowerCase()].map((scheme, i) => (
          <SwiperSlide key={i}>
            <div className="w-full h-full bg-black bg-cover bg-center md:px-10 px-5 flex items-end pb-10" style={{ backgroundImage: `url("/${brand.toLowerCase()}${scheme.image}")` }}>
              <div className="text-2xl md:text-4xl leading-[1] font-black uppercase heading flex flex-col items-start">
                <h1 className='inline-block' style={{ backgroundColor: scheme.theme }}>{scheme.heading[0]}</h1>
                <h1 className='inline-block' style={{ backgroundColor: scheme.theme }}>{scheme.heading[1]}</h1>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Banner>

      <main className='md:px-10 px-5 py-10 mt-20 dark:text-white'>
        <h1 className="text-2xl font-black uppercase mb-12">{brand} <span className='text-neutral-300 dark:text-neutral-700'>- Brand</span></h1>

        <div>
            {data.length ? '' : <div>This brand has no products.</div>}
        </div>
      </main>
    </div>
  );
};
