import { should } from 'chai';
import checkValue from './checkValue';
import { defineValue } from '../../../build/helpers/defineEntry';

const type = 'N';
const nowInput  = new Date(2022, 0, 25); 
const nowNumber = Number(nowInput); 

const values = {
  inputs : [99.99, 100.00, 100.89, 100.89, 100.9, 0, undefined, null, '', 'some text', '15.89', '15,89', NaN, 100, true, false,  nowInput],
  etalons: [99.99,  99.99, 100.90, 101.00, 101.0, 0,         0,    0,  0,           0,   15.89,      16,   0,  99,    1,     0, nowNumber]
};

export default function() {
  describe('Numbers:', function() {
    checkValue(values, type, 'should stay', 0, 4, 2);
    checkValue(values, type, 'should be transformed to', 1, 4, 2);
    checkValue(values, type, 'should be transformed to', 2, 4, 1);
    checkValue(values, type, 'should be transformed to', 3, 5, 0);
    checkValue(values, type, 'should be transformed to', 4, 3, 0);
    checkValue(values, type, 'should stay', 5, 3, 0);
    checkValue(values, type, 'should to be interpreted as', 6, 3, 0);
    checkValue(values, type, 'should to be interpreted as', 7, 3, 0);
    checkValue(values, type, 'should to be interpreted as', 8, 3, 0);
    checkValue(values, type, 'should to be interpreted as', 9, 3, 0);
    checkValue(values, type, 'should to be converted to number', 10, 4, 2);
    checkValue(values, type, 'should to be converted to number', 11, 4, 0);
    checkValue(values, type, 'should to be interpreted as', 12);
    checkValue(values, type, 'should be transformed to', 13, 2);
    checkValue(values, type, 'hould to be interpreted as', 14);
    checkValue(values, type, 'hould to be interpreted as', 15);
    checkValue(values, type, 'should be transformed to', 16);

    it(`getting number value with length '0' should throw an error`, () => {
      should().throw(() => { defineValue(99, type, 0) });
    });
  });
}
