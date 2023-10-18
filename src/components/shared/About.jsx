export const About = () => {
  return (
    <div>
      <h1 className="text-sm font-medium">About Us</h1>

      <div className="mt-4 min-h-[calc(550px+1rem)] max-md:grid">
        <img
          src="/04-c.jpg"
          alt=""
          className="float-left mr-8 mb-8 
  md:[shape-outside:polygon(0_10%,100%_10%,100%_100%,0%_100%)] mt-16 w-full md:w-[420px] object-cover max-md:order-1"
        />
        <p className="text-justify font-black leading-[1] text-xl lg:text-4xl uppercase">
          Labela is your gateway to timeless elegance and contemporary style. With a curated collection of high-quality fashion and accessories, we&apos;re here to help you express your unique
          identity and confidence through your wardrobe. Discover the Labela difference and redefine your style journey with us.
        </p>
        <div className="mt-28 float-left w-full lg:w-[calc(100%-452px)] max-md:order-2">
          <h1 className="text-2xl font-black uppercase mb-8">Newsletter</h1>{' '}
          <form className="w-full">
            <div className="w-full">
              <input className="w-full py-4 outline-none border-b-2 valid:border-black focus:border-black" type="email" name="email" placeholder="Email" required />
            </div>
            <div className="w-full mt-6">
              <button className="bg-black w-full max-md:mt-6 py-2.5 md:px-24 px-0 text-white font-bold rounded active:scale-[.99] transition-transform text-sm">Subscribe</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
