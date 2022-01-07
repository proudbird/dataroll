import { should } from 'chai';
import title from '../title';
import getNumberValue from '../../../build/valueGeters/number';

const nowInput  = new Date(2022, 0, 25); 
const nowNumber = Number(nowInput); 

const numbers = {
  inputs : [99.99, 100.00, 100.89, 100.89, 100.9, 0, undefined, null, '', 'some text', '15.89', '15,89', NaN, 100, true, false,  nowInput],
  etalons: [99.99,  99.99, 100.90, 101.00, 101.0, 0,         0,    0,  0,           0,   15.89,      16,   0,  99,    1,     0, nowNumber]
};

function checkNumber(text: string, index: number, length?: number, scale?: number): void {
  it(title(numbers, index, text), () => {;
    should().equal(getNumberValue(numbers.inputs[index], length, scale), numbers.etalons[index]);
  });
}

export default function() {
  describe('Numbers:', function() {
    checkNumber('should stay', 0, 4, 2);
    checkNumber('should be transformed to', 1, 4, 2);
    checkNumber('should be transformed to', 2, 4, 1);
    checkNumber('should be transformed to', 3, 5, 0);
    checkNumber('should be transformed to', 4, 3, 0);
    checkNumber('should stay', 5, 3, 0);
    checkNumber('should be transformed to', 6, 3, 0);
    checkNumber('should be transformed to', 7, 3, 0);
    checkNumber('should be transformed to', 8, 3, 0);
    checkNumber('should be transformed to', 9, 3, 0);
    checkNumber('should be transformed to', 10, 4, 2);
    checkNumber('should be transformed to', 11, 4, 0);
    checkNumber('should be transformed to', 12);
    checkNumber('should be transformed to', 13, 2);
    checkNumber('should be transformed to', 14);
    checkNumber('should be transformed to', 15);
    checkNumber('should be transformed to', 16);
  });
}
