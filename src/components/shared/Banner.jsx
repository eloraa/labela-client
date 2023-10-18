import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { register } from 'swiper/element/bundle';
import { useEffect } from 'react';
import '../../assests/slider.css';

export const Banner = () => {
  useEffect(() => {
    register();
  }, []);
  return (
    <div className="h-[560px] relative">
      <h4 className="text-sm absolute right-5 md:right-10 bottom-10 z-10 text-white">drag/scroll</h4>
      <Swiper className="h-full w-full" mousewheel={true} loop={true} direction="vertical" autoplay={{ delay: 3000 }}>
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
      </Swiper>
    </div>
  );
};
