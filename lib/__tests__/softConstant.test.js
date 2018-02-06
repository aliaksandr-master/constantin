/* eslint-env jest */
import softConstant from '../softConstant';



describe('softConstant', () => {
  it('should throws', () => {
    expect(() => {
      const const1 = softConstant([ '123', 123 ]);

      const1[1] = 3;
    }).toThrow();
  });
  it('should pass', () => {
    expect(softConstant(123)).toEqual(123);
    expect(softConstant([ '123', 123 ])[0]).toEqual('123');
    expect(softConstant([ '123', 123 ])[1]).toEqual(123);
    expect(softConstant([ '123', 123 ])[2]).toEqual(undefined);
    expect(softConstant({ a: 123 }).a).toEqual(123);
    expect(softConstant({ a: { b: 123 } }).a.b).toEqual(123);
    expect(softConstant({ a: 123, b: { c: 333 } }, { allowProps: [ 'asymmetricMatch', 'nodeType' ] }).b).toEqual({ c: 333 });
    expect(softConstant({ a: 123, b: { c: 333 } }).b.c).toEqual(333);
  });
});
