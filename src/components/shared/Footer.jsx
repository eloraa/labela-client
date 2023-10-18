import { useEffect, useState } from 'react';
import { MasterCardIcon, VisaCardIcon } from '../utils/SvgIcon';
import { getStoredValue, saveToLocale } from '../utils/localstorage';

export const Footer = () => {
  const [theme, setTheme] = useState(getStoredValue('theme')[0] ? getStoredValue('theme')[0] : 'light');


  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark');
      document.body.style.backgroundColor = '#000';
    } else {
      document.body.classList.remove('dark');
      document.body.style.backgroundColor = '';
      return () => {};
    }
  }, [theme]);

  const changeTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      saveToLocale(theme === 'dark' ? theme : 'dark', 'theme', true);
    } else {
      setTheme('light');
      saveToLocale(theme === 'light' ? theme : 'light', 'theme', true);
    }
  };

  return (
    <footer className="pt-6 md:px-10 px-5 clear-both dark:text-white">
      <div className="flex items-center justify-between mt-20">
        <div className="flex gap-8">
          <div className="h-5">
            <VisaCardIcon></VisaCardIcon>
          </div>
          <div className="h-5">
            <MasterCardIcon></MasterCardIcon>
          </div>
        </div>

        <button onClick={changeTheme} className="border-b text-xs font-bold uppercase dark:border-dark">
          Switch Theme
        </button>
      </div>
      <div className="mt-6 flex justify-between py-4 border-t border-[#ddd] text-xs sm:text-sm">
        <div className="flex gap-3">
          <h2>Dhaka, Bangladesh</h2>
          <h2>{new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Dhaka', hour12: false, hour: 'numeric', minute: 'numeric' })} - Local Time</h2>
        </div>
        <h2>©2023</h2>
      </div>
    </footer>
  );
};
