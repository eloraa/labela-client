import { toast } from 'react-toastify';

const getStoredValue = (uid) => {
  if(!uid) {
    toast('Something went wrong.')
    return
  }
  const storedValue = localStorage.getItem(uid);
  return storedValue ? JSON.parse(storedValue) : [];
};

const saveToLocale = (value, uid, override) => {
    if(!uid) {
      toast('Something went wrong.')
      return
    }

    if(override) {
      localStorage.setItem(uid, JSON.stringify([value]));
      return
    }
    const storage = getStoredValue(uid);
    if (!storage.find(eventID => eventID === value)) {
      storage.push(value);
      localStorage.setItem(uid, JSON.stringify(storage));
      toast('Your event has been successfully added to your bookmarks');
    } 
    else toast('You have already added this event to your bookmarks');
};

const clearStorage = (uid) => {
  if(!uid) {
    toast('Something went wrong.')
    return
  }
  
  localStorage.setItem(uid, '')
};

export { getStoredValue, saveToLocale, clearStorage };