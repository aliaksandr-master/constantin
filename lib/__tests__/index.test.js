import index from '../index';


describe('softConstant', () => {
  it('should throws', () => {
    expect(() => {
      const const1 = index([ '123', 123 ]);

      const1[1] = 3;
    }).toThrow();
    expect(() => {
      expect(index(123)).toEqual(123);
    }).toThrow();
  });
  it('should pass', () => {
    expect(index([ '123', 123 ])[0]).toEqual('123');
    expect(index([ '123', 123 ])[1]).toEqual(123);
  });
});
