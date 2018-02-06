import softConstant from './softConstant';
import hardConstant from './hardConstant';



export { softConstant, hardConstant };


const _const = typeof window.Proxy === 'undefined' ? softConstant : hardConstant; // eslint-disable-line fp/no-proxy


export default function constant (obj, options = {}) {
  if (obj == null || typeof obj !== 'object') {
    throw new TypeError('CONSTANTIN: value must be an object');
  }

  return _const(obj, options);
}
