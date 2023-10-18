import { About } from "../shared/About";
import { Banner } from "../shared/Banner";

export const Home = () => {
  return (
    <>
    <Banner></Banner>

    <div className="md:px-10 px-5 py-10 mt-20">
      <About></About>
    </div>
    </>
  );
};
