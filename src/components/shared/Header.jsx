import { Link, NavLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../providers/AuthProviders';
import { toast } from 'react-toastify';

export const Header = ({ className }) => {
  const [navOpen, setNavOpen] = useState(false);
  const { user, signOutUser } = useContext(AuthContext);

  let location = useLocation();

  useEffect(() => {
    setNavOpen(false);
  }, [location]);

  const handleSignOut = () => {
    signOutUser()
      .then(() => toast('Signed out successfully.'))
      .catch(() => toast('An error occurred. Please try again later'));
  };

  return (
    <header className={`py-6 md:px-10 px-5 flex items-center text-sm justify-between sticky top-0 z-[999] dark:text-white ${className ? className : ''}`}>
      <Link to="/">
        <h1 className="font-bold uppercase text-base flex items-center gap-2 relative z-[9999]">
          <div className="w-8 h-8">
            <svg viewBox="0 0 31 31" className="w-full h-full">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16.4745 2.5H28.1877V15.2462C22.8083 16.189 19.3388 18.6736 17.2179 21.57C16.948 21.9386 16.7006 22.3129 16.4745 22.6903V2.5ZM14.4745 2.5H2.18774V15.1891C7.76145 16.0853 11.3323 18.613 13.4975 21.57C13.8636 22.07 14.1881 22.5802 14.4745 23.0945L14.4745 2.5ZM2.18774 17.217V28.5H14.2324C13.9726 26.7379 13.2793 24.6572 11.8839 22.7516C10.0909 20.3029 7.09088 18.077 2.18774 17.217ZM15.4239 30.5C15.4301 30.5 15.4363 30.5 15.4425 30.5C15.4487 30.5 15.4549 30.5 15.4611 30.5H28.1877H30.1877V28.5V16.1284C30.1878 16.1282 30.1878 16.1279 30.1878 16.1276L30.1877 16.1274V2.5V0.5H28.1877H2.18774H0.187744V2.5V28.5V30.5H2.18774H15.4239ZM28.1877 17.2794V28.5H16.483C16.7429 26.7379 17.4362 24.6572 18.8316 22.7516C20.5828 20.36 23.4853 18.1809 28.1877 17.2794Z"
                fill="currentColor"
              />
            </svg>
          </div>
          Labela
        </h1>
      </Link>
      <div className="absolute inset-0 backdrop-blur bg-white/80 md:-z-20 dark:bg-black/95"></div>
      <div className="flex items-center gap-4 md:hidden">
        {user && !navOpen && (
          <Link to="/profile" className="w-8 h-8 overflow-hidden rounded-full bg-[#ddd] z-10">
            <img className="w-full h-full object-cover" src={user.photoURL ? user.photoURL : '/pfp-placeholder.png'} alt="" />
          </Link>
        )}
        <button onClick={() => setNavOpen(!navOpen)} className="border-b border-black active:scale-[.98] transition-transform relative z-[9999]">
          {navOpen ? 'Close' : 'Menu'}
        </button>
      </div>
      <div
        className={`flex gap-10 flex-col -z-10 fixed inset-0 max-md:bg-white/80 dark:bg-black/80 bottom-0 top-20 px-5 backdrop-blur h-[calc(100vh-5rem)] pt-12 md:flex-row md:static md:h-auto md:p-0 transition-transform duration-500 ${
          navOpen ? 'translate-y-0' : 'max-md:-translate-y-[calc(100%+5rem)]'
        }`}
      >
        {((location.pathname === '/signin' && location.pathname === '/signup') || user) && (
          <ul className="flex gap-6 max-md:w-full justify-between max-md:flex-col md:items-center">
            <li className="max-md:w-full">
              <NavLink
                to="/add"
                className={({ isActive }) => (isActive ? 'border-b dark:border-dark border-black max-md:border-b max-md:w-full block max-md:py-4' : 'max-md:py-4 block md:border-b-transparent border-b-2 dark:border-black')}
              >
                Add Product
              </NavLink>
            </li>
            <li className="max-md:w-full">
              <NavLink
                to="/cart"
                className={({ isActive }) => (isActive ? 'border-b dark:border-dark border-black max-md:border-b max-md:w-full block max-md:py-4' : 'max-md:py-4 block md:border-b-transparent border-b-2 dark:border-black')}
              >
                My Cart
              </NavLink>
            </li>
          </ul>
        )}

        {user ? (
          <div className="items-center flex gap-4 justify-between">
            <div className="flex gap-2 items-center">
              <Link to="/profile" className="w-8 h-8 overflow-hidden rounded-full bg-[#ddd]">
                <img className="w-full h-full object-cover" src={user.photoURL ? user.photoURL : '/pfp-placeholder.png'} alt="" />
              </Link>
              <h2 className="text-ellipsis whitespace-nowrap leading-3">{user?.displayName ? user.displayName : user.email}</h2>
            </div>
            <div className="w-3 border-b border-black rounded"></div>
            <button onClick={handleSignOut}>Sign Out</button>
          </div>
        ) : (
          <div>
            {location.pathname === '/signin' ? (
              <Link className="max-md:w-full dark:max-md:bg-dark max-md:bg-black max-md:font-bold max-md:py-2 rounded text-center block dark:max-md:text-black max-md:text-white" state={location?.state} to="/signup">
                Sign Up
              </Link>
            ) : (
              <Link className="max-md:w-full dark:max-md:bg-dark max-md:bg-black max-md:font-bold max-md:py-2 rounded text-center block dark:max-md:text-black max-md:text-white" state={location?.state} to="/signin">
                Sign In
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

Header.propTypes = {
  className: PropTypes.string,
};
