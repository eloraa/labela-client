import { useContext } from 'react';
import { About } from '../shared/About';
import { Banner } from '../shared/Banner';
import { BrandContext } from '../Root';
import { Link } from 'react-router-dom';

export const Home = () => {
  const { brandData } = useContext(BrandContext);

  return (
    <>
      <Banner></Banner>

      <main className="md:px-10 px-5 py-10 mt-20 dark:text-white">
        <div className="mb-20">
          <h1 className="text-2xl font-black uppercase mb-8">Browse by brands</h1>
          <div className="flex gap-10 md:gap-16 flex-wrap">
            {brandData.brands.map((brand, i) => (
              <div key={i} className="flex flex-col h-full">
                <figure className="h-7">
                  <img
                    className="w-full h-full object-contain"
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
