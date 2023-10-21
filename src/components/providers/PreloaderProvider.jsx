import PropTypes from 'prop-types';
import { createContext, useEffect, useRef, useState } from 'react';
import { PreloaderEl } from '../shared/Preloader';
import Preloader from '../utils/preloader';

export const PreloaderContext = createContext(null);

const PreloaderProvider = ({ children }) => {
  const [preloader, setPreloader] = useState(null);
  const preloaderRef = useRef(null);

  useEffect(() => {
    if (preloaderRef.current) {
      setPreloader(new Preloader({ element: preloaderRef.current }));
    } else {
      return () => {};
    }
  }, [preloaderRef]);


  return (
    <PreloaderContext.Provider value={{ preloader }}>
      <div ref={preloaderRef} className="fixed inset-0 z-[9999999]">
        <PreloaderEl></PreloaderEl>
      </div>
      {children}
    </PreloaderContext.Provider>
  );
};

PreloaderProvider.propTypes = {
  children: PropTypes.node,
};

export default PreloaderProvider;
