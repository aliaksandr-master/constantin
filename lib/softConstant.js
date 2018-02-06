import _recursiveIterate from './_recursiveIterate';
import _mkPathStr from './_mkPathStr';



const mutProp = (obj, key, value, path, { _epref }) => {
  Object.defineProperty(obj, key, { // eslint-disable-line fp/no-mutating-methods
    enumerable: true,
    set (_name, _value) {
      throw new ReferenceError(`${_epref} ${_mkPathStr([ ...path, key ])}: modifying constant is denied`);
    },
    get () {
      return value;
    }
  });

  return obj;
};


const constant = _recursiveIterate(
  (value, path, options) => {
    const { own } = options;
    let result;
    let key;

    if (Array.isArray(value)) {
      result = [];

      for (key = 0; key < value.length; key++) { // eslint-disable-line fp/no-loops
        result = mutProp(result, key, value[key], path, options);
      }
    } else {
      result = {};

      for (key in value) { // eslint-disable-line fp/no-loops
        if (own) {
          if (Object.prototype.hasOwnProperty.call(value, key)) {
            result = mutProp(result, key, value[key], path, options);
          }
        } else {
          result = mutProp(result, key, value[key], path, options);
        }
      }
    }

    return result;
  },
  (value, path, { checkValue }) => {
    checkValue(value, path);

    return value;
  }
);



export default (obj, { name = '', own = true, checkValue = () => {} } = {}) =>
  constant(obj, { _epref: `SOFT_CONST${name ? ` "${name}"` : ''}`, checkValue, own });
