import { useContext } from 'react';
import { About } from '../shared/About';
import { Banner } from '../shared/Banner';
import { BrandContext } from '../Root';
import { Link } from 'react-router-dom';
import { SwiperSlide } from 'swiper/react';

export const Home = () => {
  const { brandData } = useContext(BrandContext);

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
          <h1 className="text-2xl font-black uppercase mb-12">Browse by brands</h1>
          <div className="flex gap-10 md:gap-16 flex-wrap">
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
