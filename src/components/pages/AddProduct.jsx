import { useContext, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { storage } from '../utils/firebase.config';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useLocation, useNavigate } from 'react-router-dom';
import { DataContext } from '../Root';
import { validateProduct } from '../utils/utils';
import { PreloaderContext } from '../providers/PreloaderProvider';

export const AddProduct = () => {
  const formRef = useRef(null);
  const { brandData } = useContext(DataContext);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [ratingValue, setRatingValue] = useState('');
  const [priceValue, setPriceValue] = useState('');
  const [uploadedImage, setUploadedImage] = useState('_');
  const location = useLocation()

    
  const { preloader } = useContext(PreloaderContext)

  if(preloader) preloader.open()
  useEffect(() => {
    if(preloader && brandData) preloader.close()
    else return () => {}
  }, [brandData, preloader])

  const handleMinMax = (event, min, max, callback) => {
    const value = Math.max(min, Math.min(max, Number(event.target.value)));
    if(event.target.value === '') {
        callback('')
        return
    }
    callback(value);
  };

  const navigate = useNavigate();

  const handleImageUpload = () => {
    if (isCreating) return;
    formRef.current.photo.click();
  };

  const handleFileSelect = e => {
    if (isCreating) return;
    const file = e.target.files[0];
    if (file) {
      formRef.current.photoURL.disabled = true;
      formRef.current.photoURL.placeholder = 'Will be selected from the file.';
      formRef.current.photoURL.value = '';
      // if (!(file.size <= 1024 * 1024)) {
      //   toast('Image size exceeds the maximum limit of 1MB');
      //   return;
      // }
      if (!file.type.startsWith('image/')) {
        toast('Upload a valid image.');
        return;
      }
      const reader = new FileReader();
      reader.onload = event => {
        setSelectedImage(event.target.result);
      };
      reader.readAsDataURL(file);
    } else formRef.current.photoURL.disabled = false;
  };

  const saveProduct = data => {
    fetch(`${import.meta.env.VITE_BACKENDSERVER}/product/add`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(response => {
        setIsCreating(false);
        toast.dismiss();
        if (response.errors) {
          setIsCreating(false);
          toast.dismiss();
          response.errors.map(error => {
            toast(error.messages[0]);
          });
          return;
        }
        if (response.success) {
          toast('Product added Successfully');
          navigate(location.state || '/');
        }
      })
      .catch(() => {
        setIsCreating(false);
        toast.dismiss();
        toast('Something went wrong');
      });
  };

  const handleFormSubmit = e => {
    e.preventDefault();

    if (isCreating) return;

    if (e.target.photoURL.value && !/((https?|www):\/\/)[-a-zA-Z0-9+&@#/%=~_|$?!:,.]*[-a-zA-Z0-9+&@#/%=~_|$]/g.test(e.target.photoURL.value)) {
      toast('Enter a valid URL');
      return;
    }
    const file = e.target?.photo?.files[0];

    const data = {
      image: uploadedImage !== '_' ? uploadedImage : e.target.photoURL.value || uploadedImage,
      name: e.target.name.value,
      brandName: e.target.brandName.value,
      type: e.target.type.value,
      price: e.target.price.value,
      description: e.target.description.value,
      rating: e.target.rating.value,
    };

    if (validateProduct(data)) {
        toast('Check your input data.')
        return
    }

    if (file && uploadedImage === '_') {
      toast('Adding product...', {
        autoClose: false,
      });
      if (!file.type.startsWith('image/')) {
        toast('Upload a valid image.');
        return;
      }
      setIsCreating(true);
      const blob = new Blob([file], { type: file.type });
      const storageRef = ref(storage, 'img-' + Math.floor(new Date().getTime() / 1000));
      uploadBytes(storageRef, blob)
        .then(snapshot => {
          getDownloadURL(snapshot.ref)
            .then(url => {
              setUploadedImage(url);
              data.image = url;
              saveProduct(data);
            })
            .catch(() => {
              setIsCreating(false);
              toast.dismiss();
              toast('Something went wrong');
            });
        })
        .catch(() => {
          setIsCreating(false);
          toast.dismiss();
          toast('Something went wrong');
        });
      return;
    } else {
      toast('Adding the product...', {
        autoClose: false,
      });
      setIsCreating(true);
      saveProduct(data);
      return;
    }
  };

  return (
    <>
      <main className={`py-6 md:px-10 px-5 dark:text-white ${isCreating ? 'opacity-10 cursor-not-allowed [&_*]:cursor-not-allowed select-none' : ''}`}>
        <h1 className="text-2xl font-black uppercase mb-12">Add Product</h1>

        <div className="mb-20 mt-5 grid md:grid-cols-[auto_1fr] gap-10">
          <div className="flex flex-col gap-1 items-start mb-10">
            <figure className={`overflow-hidden rounded relative max-w-xs ${selectedImage ? '' : 'md:w-[20rem]'}`}>
              <img className="max-w-xs object-contain rounded max-md:w-full" src={selectedImage ? selectedImage : ''} alt="" />
            </figure>
            <button onClick={handleImageUpload} className="text-sm underline active:scale-[.98] transition-transform">
              {selectedImage ? 'Change the Image' : 'Upload an Image'}
            </button>
          </div>
          <form ref={formRef} onSubmit={handleFormSubmit} className="h-full flex flex-col justify-between">
            <ul className="grid gap-6">
              <li className="hidden">
                <input onChange={handleFileSelect} placeholder="Upload" name="photo" type="file" src="" alt="" accept="image/*" />
              </li>
              <li>
                <h4 className="mb-4 text-sm">Name</h4>
                <div className="w-full">
                  <input
                    className="w-full focus:border-black outline-none border-2 py-2 px-4 disabled:border-none disabled:pl-0 rounded dark:bg-[#222] dark:border-transparent dark:focus:border-dark"
                    type="text"
                    name="name"
                    placeholder="Name"
                  />
                </div>
              </li>
              <li>
                <h4 className="mb-4 text-sm">Brand Name</h4>
                <div className="w-full">
                  <select
                    defaultValue=""
                    className="w-full focus:border-black bg-white outline-none border-2 py-2 px-4 disabled:border-none disabled:pl-0 rounded dark:bg-[#222] dark:border-transparent dark:focus:border-dark"
                    name="brandName"
                  >
                    <option disabled={true} value={''}>
                      Select a brand
                    </option>
                    {brandData.brands.map((brand, index) => (
                      <option value={brand} key={index}>
                        {brand}
                      </option>
                    ))}
                  </select>
                </div>
              </li>
              <li>
                <h4 className="mb-4 text-sm">Type</h4>
                <div className="w-full">
                  <input
                    className="w-full focus:border-black outline-none border-2 py-2 px-4 disabled:border-none disabled:pl-0 rounded dark:bg-[#222] dark:border-transparent dark:focus:border-dark"
                    type="text"
                    name="type"
                    placeholder="Type"
                  />
                </div>
              </li>
              <div className="flex gap-5">
                <li className="w-1/2">
                  <h4 className="mb-4 text-sm">Price</h4>
                  <div className="w-full flex items-center gap-2 pl-4 rounded border-2 dark:border-transparent dark:bg-[#222]">
                    <span className="font-bold whitespace-nowrap">$</span>
                    <input
                      onChange={e => handleMinMax(e, 1, 9999999, setPriceValue)}
                      className="w-full focus:border-black outline-none border-y-transparent border-r-transparent focus:border-2 py-2 px-4 disabled:border-none disabled:pl-0 rounded dark:bg-[#222] dark:border-transparent dark:focus:border-dark"
                      type="number"
                      name="price"
                      placeholder="Price"
                      value={priceValue}
                    />
                  </div>
                </li>
                <li className="w-1/2">
                  <h4 className="mb-4 text-sm">Rating</h4>

                  <div className="w-full flex items-center gap-2 pr-4 rounded border-2 dark:border-transparent dark:bg-[#222]">
                    <input
                      onChange={e => handleMinMax(e, 1, 5, setRatingValue)}
                      className="w-full focus:border-black outline-none border-y-transparent border-l-transparent focus:border-2 py-2 px-4 disabled:border-none disabled:pl-0 rounded dark:bg-[#222] dark:border-transparent dark:focus:border-dark"
                      type="number"
                      name="rating"
                      placeholder="Rating"
                      value={ratingValue}
                    />
                    <span className="font-bold whitespace-nowrap"> / 5</span>
                  </div>
                </li>
              </div>
              <li>
                <h4 className="mb-4 text-sm">Image URL</h4>
                <div className="w-full">
                  <input
                    className="w-full focus:border-black outline-none border-2 py-2 px-4 disabled:border-none disabled:pl-0 rounded dark:bg-[#222] dark:border-transparent dark:focus:border-dark"
                    type="text"
                    name="photoURL"
                    placeholder="Image URL"
                  />
                </div>
                <h4 className="mt-8 text-sm flex items-center gap-1">
                  <span className="block w-2 h-2">
                    <svg viewBox="0 0 7 7">
                      <path
                        d="M2.75564 6.90922L2.89768 4.71036L1.05677 5.94332L0.29541 4.60241L2.27836 3.6365L0.29541 2.67059L1.05677 1.32968L2.89768 2.56263L2.75564 0.36377H4.28405L4.13632 2.56263L5.97723 1.32968L6.73859 2.67059L4.76132 3.6365L6.73859 4.60241L5.97723 5.94332L4.13632 4.71036L4.28405 6.90922H2.75564Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  You can upload your image anywhere and use it here. or you can upload it through our website.
                </h4>
              </li>
              <li>
                <h4 className="mb-4 text-sm">Short Desciption</h4>
                <div className="w-full">
                  <textarea
                    className="w-full focus:border-black outline-none border-2 py-2 px-4 disabled:border-none disabled:pl-0 rounded dark:bg-[#222] dark:border-transparent dark:focus:border-dark resize-y"
                    rows="4"
                    type="text"
                    name="description"
                    placeholder="Short Description"
                  />
                </div>
              </li>
            </ul>

            <button name="submit" className="bg-black py-2 w-full px-0 mt-6 text-white font-bold rounded active:scale-[.99] transition-transform dark:bg-dark dark:text-black">
              Add Product
            </button>
          </form>
        </div>
      </main>
    </>
  );
};
