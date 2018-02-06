import _recursiveIterate from './_recursiveIterate';
import _mkPathStr from './_mkPathStr';



const hasFactory = ({ allowProps, own }) => (target, propName) => {
  if (Object.prototype.hasOwnProperty.call(target, propName)) {
    return true;
  }

  if (Object.prototype.hasOwnProperty(propName) || allowProps.includes(propName)) {
    return true;
  }

  if ((Array.isArray(target) && propName === 'length')) { // only for iterators supporting
    return true;
  }

  return Boolean(!own && target[propName] !== undefined);
};



const consta = _recursiveIterate(
  (value, path, options) => {
    const { _epref, skipSymbols } = options;
    const has = hasFactory(options);

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



export default (obj, { name = '', allowProps = [], skipSymbols = true, own = true, checkValue = () => {} } = {}) => {
  const _epref = `HARD_CONST${name ? ` "${name}"` : ''}`;

  allowProps.forEach((prop) => {
    if (typeof prop !== 'string') {
      throw new TypeError(`${_epref}: invalid type of allowed prop "${prop}"`);
    }
  });

  return consta(obj, { own, allowProps, checkValue, skipSymbols, _epref });
};
