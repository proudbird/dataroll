import checkValue from './checkValue';

const type = 'B';
const nowInput  = new Date(2022, 0, 25); 

const values = {
  inputs : [false, true, 'false', 'true',    1,     0, undefined,  null,     '', 'text', 15.89,   '1',   '0',   NaN, nowInput],
  etalons: [false, true,   false,   true, true, false,     false, false,  false,  false, false,  true, false, false,    false],
};

export default function() {
  describe('Boolean:', function() {
    checkValue(values, type, 'should stay', 0);
    checkValue(values, type, 'should stay', 1);
    checkValue(values, type, 'should to be interpreted as', 2);
    checkValue(values, type, 'should to be interpreted as', 3);
    checkValue(values, type, 'should to be interpreted as', 4);
    checkValue(values, type, 'should to be interpreted as', 5);
    checkValue(values, type, 'should to be interpreted as', 6);
    checkValue(values, type, 'should to be interpreted as', 7);
    checkValue(values, type, 'should to be interpreted as', 8);
    checkValue(values, type, 'should to be interpreted as', 9);
    checkValue(values, type, 'should to be interpreted as', 10);
    checkValue(values, type, 'should to be interpreted as', 11);
    checkValue(values, type, 'should to be interpreted as', 12);
    checkValue(values, type, 'should to be interpreted as', 13);
    checkValue(values, type, 'should to be interpreted as', 14);
  });
}
