/* eslint-env jest */
import hardConstant from '../hardConstant';



describe('hardConstant', () => {
  it('should throws', () => {
    expect(() => {
      const const1 = hardConstant([ '123', 123 ]);

      const1[1] = 3;
    }).toThrow();
    expect(() => {
      const const1 = hardConstant({ a: 123 });

      const1.a = 3;
    }).toThrow();
    expect(() => {
      const const1 = hardConstant({ a: 123 });

      const1.a = 123;
    }).toThrow();
    expect(() => {
      const const1 = hardConstant({ a: 123 });

      const a = const1.b;
    }).toThrow();
    expect(() => {
      const const1 = hardConstant({ a: 123, b: { c: 333 } });

      const c = const1.a.b.d;
    }).toThrow();
    expect(() => {
      const const1 = hardConstant([ '123', 123 ]);

      const a = const1[2];
    }).toThrow();
  });
  it('should pass', () => {
    expect(hardConstant(123)).toEqual(123);
    expect(hardConstant([ '123', 123 ])[0]).toEqual('123');
    expect(hardConstant([ '123', 123 ])[1]).toEqual(123);
    expect(hardConstant([ '123', 123 ]).length).toEqual(2);
    expect(hardConstant({ a: 123 }).a).toEqual(123);
    expect(hardConstant({ a: { b: 123 } }).a.b).toEqual(123);
    expect(hardConstant({ a: 123, b: { c: 333 } }, { allowProps: [ 'asymmetricMatch', 'nodeType' ] }).b).toEqual({ c: 333 });
    expect(hardConstant({ a: 123, b: { c: 333 } }).b.c).toEqual(333);
  });
});
