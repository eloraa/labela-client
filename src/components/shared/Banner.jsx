import { Swiper } from 'swiper/react';
import PropTypes from 'prop-types';
import 'swiper/css';
import { register } from 'swiper/element/bundle';
import { useEffect } from 'react';
import '../../assests/slider.css';

export const Banner = ({ children }) => {
  useEffect(() => {
    register();
  }, []);
  return (
    <div className="h-[560px] relative">
      {children.length > 1 && <h4 className="text-sm absolute right-5 md:right-10 bottom-10 z-10 text-white">drag/scroll</h4>}
      <Swiper className="h-full w-full" mousewheel={false} loop={true} direction="vertical" autoplay={{ delay: 3000 }}>
        {children}
      </Swiper>
    </div>
  );
};

Banner.propTypes = {
  children: PropTypes.node,
};
