//utils.js
/**
 *@param {*} value
 *@return {boolean}
 */

const isNullOrUndefined = (value) => {
  return value === null || value === undefined;
};

/**
 * @param {*} value
 * @return {boolean}
 */

const isNullOrEmpty = (value) => {
  return value === null || value === "" || value === undefined;
};

export { isNullOrUndefined, isNullOrEmpty };
