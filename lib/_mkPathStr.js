export default (path) =>
  path.map((v, index) => typeof v === 'number' ? `[${v}]` : `${index ? '.' : ''}${v}`).join();
