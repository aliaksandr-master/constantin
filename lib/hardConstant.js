import _recursiveIterate from './_recursiveIterate';
import _mkPathStr from './_mkPathStr';



const hasFactory = ({ allowedProps, own }) => (target, propName) => {
  if (Object.prototype.hasOwnProperty.call(target, propName)) {
    return true;
  }

  if (Object.prototype.hasOwnProperty(propName) || allowedProps.includes(propName)) {
    return true;
  }

  if ((Array.isArray(target) && (Array.prototype.hasOwnProperty(propName) || propName === 'length'))) { // eslint-disable-line no-use-extend-native/no-use-extend-native
    return true;
  }

  if (!own && target[propName] !== undefined) {
    return true;
  }

  return false;
};



const consta = _recursiveIterate(
  (value, path, options) => {
    const { _epref, skipSymbols } = options;
    const has = hasFactory(options, path);

    const epref = `${_epref} ${_mkPathStr(path)}`;

    return new Proxy(value, { // eslint-disable-line fp/no-proxy
      has,

      get (target, propName) {
        if (has(target, propName)) {
          return target[propName];
        }

        if (skipSymbols) {
          if (typeof propName === 'symbol' || propName instanceof Symbol) {
            return undefined;
          }

          try {
            propName = String(propName);
          } catch (err) {
            if (/Symbol/.test(err.message)) {
              return undefined;
            }

            throw err;
          }
        }

        throw new Error(`${epref}: there is no property "${propName}"`);
      },

      set (target, propName, _value) {
        throw new Error(`${epref}: you must not change const value of "${propName}"`);
      }
    });
  },
  (value, path, { checkValue }) => {
    checkValue(value, path);

    return value;
  }
);



export default (obj, { name = '', allowedProps = [], skipSymbols = true, own = true, checkValue = (_value, _path) => {} }) => {
  const _epref = `HARD_CONST${name ? ` "${name}"` : ''}`;

  allowedProps.forEach((prop) => {
    if (typeof prop !== 'string') {
      throw new TypeError(`${_epref}: invalid type of allowed prop "${prop}"`);
    }
  });

  return consta(obj, { own, allowedProps, checkValue, skipSymbols, _epref });
};
