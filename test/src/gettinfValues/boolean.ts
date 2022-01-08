import { should } from 'chai';
import title from '../title';
import getBooleanValue from '../../../build/valueGeters/boolean';

const nowInput  = new Date(2022, 0, 25); 

const values = {
  inputs : [false, true, 'false', 'true',    1,     0, undefined,  null,     '', 'text', 15.89,   '1',   '0',   NaN, nowInput],
  etalons: [false, true,   false,   true, true, false,     false, false,  false,  false, false,  true, false, false,    false],
};

function checkValue(text: string, index: number, length?: number, scale?: number): void {
  it(title(values, index, text), () => {;
    should().equal(getBooleanValue(values.inputs[index], length, scale), values.etalons[index]);
  });
}

export default function() {
  describe('Boolean:', function() {
    checkValue('should stay', 0);
    checkValue('should stay', 1);
    checkValue('should to be interpreted as', 2);
    checkValue('should to be interpreted as', 3);
    checkValue('should to be interpreted as', 4);
    checkValue('should to be interpreted as', 5);
    checkValue('should to be interpreted as', 6);
    checkValue('should to be interpreted as', 7);
    checkValue('should to be interpreted as', 8);
    checkValue('should to be interpreted as', 9);
    checkValue('should to be interpreted as', 10);
    checkValue('should to be interpreted as', 11);
    checkValue('should to be interpreted as', 12);
    checkValue('should to be interpreted as', 13);
    checkValue('should to be interpreted as', 14);
  });
}
