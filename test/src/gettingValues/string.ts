import checkValue from './checkValue';

const type = 'S';
const nowInput  = new Date(2022, 0, 25); 
const nowEtalon = nowInput.toString(); 

const values = {
  inputs : ['Hallo', 'xxx', 'xxxxx', 'xxx', undefined, null, NaN,   99.99,   true,   false,  nowInput],
  etalons: ['Hallo', 'xxx',   'xxx', 'xxx',        '',   '',  '', '99.99', 'true', 'false', nowEtalon],
};

export default function() {
  describe('Strings:', function() {
    checkValue(values, type, 'should stay', 0);
    checkValue(values, type, 'should stay', 1, 3);
    checkValue(values, type, 'should be transformed to', 2, 3);
    checkValue(values, type, 'should stay', 3, 0);
    checkValue(values, type, 'should to be interpreted as', 4);
    checkValue(values, type, 'should to be interpreted as', 5);
    checkValue(values, type, 'should to be interpreted as', 6);
    checkValue(values, type, 'should be transformed to', 7);
    checkValue(values, type, 'should be transformed to', 8);
    checkValue(values, type, 'should be transformed to', 9);
    checkValue(values, type, 'should be transformed to', 10);
  });
}
