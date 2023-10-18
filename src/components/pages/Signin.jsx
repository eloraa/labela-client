import { toast } from 'react-toastify';
import { AuthContext } from '../providers/AuthProviders';
import { useContext, useEffect, useRef } from 'react';
import { GoogleIcon } from '../utils/SvgIcon';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export const SignIn = () => {
  const { signIn, user, googleSignin, resetPassword } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const formRef = useRef(null);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleGoogleLogin = () => {
    googleSignin()
      .then(() => {
        toast('Signed in successfully.');
        navigate(location?.state ? location.state : '/');
      })
      .catch(err => {
        if (err.code === 'auth/user-not-found') toast('The user not found.');
        if (err.code === 'auth/invalid-login-credentials') toast('Your password or email might be wrong.');
        else toast('An error occurred. Please try again later.');
      });
  };

  const handleResetPassword = () => {
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formRef.current.email.value)) toast('Enter an Email to the field to reset the password.');
    else
      resetPassword(formRef.current.email.value)
        .then(() => toast('Check your email to reset your Password.'))
        .catch(err => (err.code === 'auth/too-many-requests' ? toast('Try verifying after a little while.') : toast('Something went wrong.')));
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    let email,
      password = e.target.password.value;

    if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(e.target.email.value)) email = e.target.email.value;

    if (email) {
      signIn(email, password)
        .then(() => {
          toast('Signed in successfully.');
          navigate(location?.state ? location.state : '/');
        })
        .catch(err => {
          if (err.code === 'auth/user-not-found') toast('The user not found.');
          if (err.code === 'auth/invalid-login-credentials') toast('Your password or email might be wrong.');
          else toast('An error occurred. Please try again later.');
        });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 pt-8 md:pt-0 lg:my-12 my-0">
      <div className="md:px-10 px-5 lg:block hidden">
        <h1 className="text-2xl font-black uppercase">Login</h1>
      </div>
      <div className="lg:col-span-2">
        <div className="md:px-10 px-5">
          <div className="flex justify-between">
            <h1 className="font-semibold">Login to Continue</h1>
          </div>
          <button className="flex items-center gap-2 w-full justify-center border-2 rounded py-2 mt-8" onClick={handleGoogleLogin}>
            <span className="w-5 h-5 block">
              <GoogleIcon></GoogleIcon>
            </span>
            Continue with Google
          </button>
          <form ref={formRef} onSubmit={handleFormSubmit} className="mt-6 grid gap-4">
            <div className="w-full">
              <input className="w-full py-4 outline-none border-2 px-6 rounded focus:border-black" type="email" name="email" placeholder="Email" required />
            </div>
            <div className="w-full">
              <input className="w-full py-4 outline-none border-2 px-6 rounded focus:border-black" type="password" name="password" placeholder="Password" required />
            </div>
            <div className="text-sm flex items-center justify-between">
              <div className="underline cursor-pointer" onClick={handleResetPassword}>
                Reset Password
              </div>
            </div>
            <div className="w-full md:grid grid-cols-2 gap-3 pt-6 border-t">
              <h4 className="flex items-center gap-2">
                Don&apos;t have an Account?
                <Link state={location?.state} className="font-semibold" to="/signup">
                  Sign Up
                </Link>
              </h4>
              <button className="bg-black w-full max-md:mt-6 py-2.5 md:px-24 px-0 text-white font-bold rounded active:scale-[.99] transition-transform text-sm">Sign In</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
