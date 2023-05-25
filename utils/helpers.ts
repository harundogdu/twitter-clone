const validateEmail = (email: string): boolean => {
  const emailRegex: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
};

 const isNullOrUndefined = (value: any) => {
  return value === null || value === undefined;
};

const isNullOrEmpty = (value: any) => {
  return value === null || value === "" || value === undefined;
};

export { isNullOrUndefined, isNullOrEmpty, validateEmail };
