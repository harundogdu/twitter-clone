const validateEmail = (email: string): boolean => {
  const emailRegex: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
};


//utils.js
/**
 *@param {*} value
 *@return {boolean}
 */

 const isNullOrUndefined = (value: any) => {
  return value === null || value === undefined;
};

/**
 * @param {*} value
 * @return {boolean}
 */

const isNullOrEmpty = (value: any) => {
  return value === null || value === "" || value === undefined;
};

export { isNullOrUndefined, isNullOrEmpty, validateEmail};