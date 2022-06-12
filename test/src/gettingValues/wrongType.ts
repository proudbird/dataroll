import { defineValue } from '../../../build/helpers/defineEntry';

export default function() {
  describe('Wrong type:', function() {
    let wrongType = 'R';
    test(`trying to get value with wrong type should throw an error`, () => {
      expect(() => { defineValue('sume input', wrongType) }).toThrow();
    });
  });
}
