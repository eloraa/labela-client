export const PreloaderEl = () => {

  return (
    <>
      <div className="layer text-black dark:text-white h-full bg-white w-full py-6 md:px-10 px-5 font-black uppercase text-xl flex items-end">
        <h1 className="mb-4 flex overflow-hidden w-full text-center items-center">
          <span className="text-white dark:text-black dark:[text-shadow:-1px_-1px_0_white,1px_-1px_0_white,-1px_1px_0_white,1px_1px_0_white] [text-shadow:-1px_-1px_0_#ccc,1px_-1px_0_#ccc,-1px_1px_0_#ccc,1px_1px_0_#ccc]">
            Loading
          </span>
        </h1>
      </div>
      <div className="absolute inset-0">
        <svg className="overlay" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path className="overlay__path" vectorEffect="non-scaling-stroke" d="M 0 0 V 100 Q 50 100 100 100 V 0 z" />
        </svg>
      </div>
    </>
  );
};
