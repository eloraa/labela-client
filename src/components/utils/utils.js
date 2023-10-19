export const printPDF = pdfFile => {
  const screenHeight = window.innerHeight;
  const screenWidth = window.innerWidth;
  const url = URL.createObjectURL(pdfFile);

  const popupWidth = 450;
  const popupHeight = screenHeight * 0.9;
  const left = (screenWidth - popupWidth) / 2;
  const top = (screenHeight - popupHeight) / 2;

  const newWindow = window.open(url, '_blank', `width=${popupWidth},height=${popupHeight},left=${left},top=${top}`);

  newWindow.onload = function () {
    newWindow.print();
    newWindow.onafterprint = function () {
      newWindow.close();
    };
  };
  newWindow.onunload = function () {
    setTimeout(() => URL.revokeObjectURL(url), 1);
  };
};

export const validateProduct = obj => {
  for (const property in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, property)) {
      const value = obj[property];

      // Check if the value is empty
      if (value === null || value === undefined) {
        return true;
      }
      if (typeof value === 'string' && value.trim() === '') {
        return true;
      }
      if (Array.isArray(value) && value.length === 0) {
        return true;
      }
      if (typeof value === 'object' && Object.keys(value).length === 0) {
        return true;
      }
    }
  }

  return false;
};

export const objIsEqual = (objA, objB) => {
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (const key of keysA) {
    const valueA = objA[key];
    const valueB = objB[key];

    if (typeof valueA === 'object' && typeof valueB === 'object') {
      if (!objIsEqual(valueA, valueB)) {
        return false;
      }
    } else if (valueA != valueB) {
      return false;
    }
  }

  return true;
};

