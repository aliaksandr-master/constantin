export default (iterateWrapper, iterateValue) => {
  const wrapObj = (obj, path, options) => {
    obj = iterateValue(obj, path, options);

    if (obj == null || typeof obj !== 'object') {
      return obj;
    }

    let key;
    let result;

    if (Array.isArray(obj)) {
      result = [];

      const len = obj.length;

      for (key = 0; key < len; key++) { // eslint-disable-line fp/no-loops
        result[key] = wrapObj(obj[key], [ ...path, key ], options);
      }
    } else {
      result = {};

      for (key in obj) { // eslint-disable-line fp/no-loops
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          result[key] = wrapObj(obj[key], [ ...path, key ], options);
        }
      }
    }

    return iterateWrapper(result, path, options);
  };

  return (value, options) => wrapObj(value, [], options);
};
