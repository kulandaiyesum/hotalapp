import { Calculater } from './testservice';

describe('testService', () => {
  it('should add 2 numbers', () => {
    const service = new Calculater();
    expect(service.add(2, 2)).toBe(4);
  });
  it('should sub 2 numbers', () => {
    const service = new Calculater();
    expect(service.sub(2, 2)).toBe(0);
  });
});
