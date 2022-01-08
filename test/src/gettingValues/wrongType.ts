import { should } from 'chai';
import { defineValue } from '../../../build/helpers/defineEntry';

export default function() {
  describe('Wrong type:', function() {
    let wrongType = 'R';
    it(`trying to get value with wrong type should throw an error`, () => {
      should().throw(() => { defineValue('sume input', wrongType) });
    });
  });
}
