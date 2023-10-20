
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

