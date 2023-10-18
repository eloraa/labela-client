import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GoogleIcon } from '../utils/SvgIcon';
import { useContext, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../providers/AuthProviders';

export const Signup = () => {
  const warning = useRef(null);
  const { createUser, user, googleSignin } = useContext(AuthContext)

  const navigate = useNavigate();
  const location = useLocation()

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  
  const handleGoogleLogin = () => {
    googleSignin()
    .then(() => {
      toast('Signed in successfully.')
      navigate(location?.state ? location.state : '/')
    })
    .catch(err => {
      if (err.code === 'auth/user-not-found') toast('The user not found.');
      if (err.code === 'auth/invalid-login-credentials') toast('Your password or email might be wrong.');
      else toast('An error occurred. Please try again later.');
    });
  }

  const handleFormSubmit = e => {
    e.preventDefault();
    let email, password;

    if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(e.target.email.value)) email = e.target.email.value;
    if (/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}|:"<>?]).{6,}$/.test(e.target.password.value)) password = e.target.password.value;

    if (email && password) {
        createUser(email, password)
         .then(() => {
            toast('User Created Successfully')
            navigate(location?.state ? location.state : '/')
          })
         .catch(err => {
            if(err.code === 'auth/email-already-in-use') toast('This email address is already in use.')
            else toast('An error occurred. Please try again later.')
        })
    }
  };

  const validatePassword = e => {
    if (/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}|:"<>?]).{6,}$/.test(e.target.value)) {
      warning.current.style.display = 'none';
    } else {
      warning.current.style.display = 'block';
      if (e.target.value.length <= 6) warning.current.querySelector('.short').style.display = 'inline';
      else warning.current.querySelector('.short').style.display = 'none';

      if (!/[A-Z]/.test(e.target.value)) {
        warning.current.querySelector('.sep').style.display = 'inline';
        warning.current.querySelector('.capital').style.display = 'inline';
      } else {
        warning.current.querySelector('.capital').style.display = 'none';
        warning.current.querySelector('.sep').style.display = 'none';
      }

      if (!/[!@#$%^&*()_+{}[\]:;<>,.?~\\-]/.test(e.target.value)) {
        warning.current.querySelector('.sep').style.display = 'inline';
        warning.current.querySelector('.special').style.display = 'inline';
      } else {
        warning.current.querySelector('.special').style.display = 'none';
        warning.current.querySelector('.sep').style.display = 'none';
      }
    }

    if (!/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}|:"<>?]).*$/.test(e.target.value)) {
      warning.current.querySelector('.mst').style.display = 'inline';
      warning.current.querySelector('.sep2').style.display = 'inline';
    } else {
      warning.current.querySelector('.mst').style.display = 'none';
      warning.current.querySelector('.sep2').style.display = 'none';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 pt-8 md:pt-0 lg:my-12 my-0 dark:text-white">
      <div className="md:px-10 px-5 lg:block hidden">
        <h1 className="text-2xl font-black uppercase">Sign Up</h1>
      </div>
      <div className="lg:col-span-2">
        <div className="md:px-10 px-5">
          <div className="flex justify-between">
            <h1 className="font-semibold">Fill with appropriate Info</h1>
          </div>
          <button className="flex items-center gap-2 w-full justify-center border-2 dark:bg-[#222] dark:border-transparent rounded py-2 mt-8" onClick={handleGoogleLogin}>
            <span className="w-5 h-5 block">
              <GoogleIcon></GoogleIcon>
            </span>
            Continue with Google
          </button>
          <form onSubmit={handleFormSubmit} className="mt-6 grid gap-4">
            <div className="w-full">
              <input className="w-full py-4 outline-none border-2 px-6 rounded dark:bg-[#222] dark:border-transparent dark:focus:border-dark focus:border-black" type="email" name="email" placeholder="Email" required />
            </div>
            <div className="w-full">
              <input onChange={validatePassword} className="w-full py-4 outline-none border-2 px-6 rounded dark:bg-[#222] dark:border-transparent dark:focus:border-dark focus:border-black" type="password" name="password" placeholder="Password" required />
            </div>
            <div>
              <h4 className="text-sm hidden" ref={warning}>
                The password{' '}
                <span className="short font-medium">
                  should be at least 6 characters <span className="font-normal sep2">and</span>
                </span>{' '}
                <span className="mst">must contain</span> <span className="capital font-medium">a capital letter</span> <span className="sep">and</span>{' '}
                <span className="special font-medium">a special character</span>.
              </h4>
            </div>
            <div className="w-full md:grid grid-cols-2 gap-3 pt-6 border-t">
              <h4 className="flex items-center gap-2">
                Already have an Account?
                <Link state={location?.state} className="font-semibold" to="/signin">
                  Sign In
                </Link>
              </h4>
              <button className="bg-black dark:bg-dark dark:text-black w-full max-md:mt-6 py-2.5 md:px-24 px-0 text-white font-bold rounded active:scale-[.99] transition-transform text-sm">Sign Up</button>
            </div>
            <div className='mt-6 text-center'>
              <h4 className="text-sm">
                By signing up you&apos;re agreeing to our{' '}
                <a href="#" className="font-semibold">
                  Terms of Service
                </a>
              </h4>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
