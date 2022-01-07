import { should } from 'chai';
import title from '../title';
import getStringValue from '../../../build/valueGeters/string';

const nowInput  = new Date(2022, 0, 25); 
const nowEtalon = nowInput.toString(); 

const strings = {
  inputs : ['Hallo', 'xxx', 'xxxxx', 'xxx', undefined, null, NaN,   99.99,   true,   false,  nowInput],
  etalons: ['Hallo', 'xxx',   'xxx', 'xxx',        '',   '',  '', '99.99', 'true', 'false', nowEtalon],
};

function checkStrings(text: string, index: number, length?: number): void {
  it(title(strings, index, text), () => {;
    should().equal(getStringValue(strings.inputs[index], length), strings.etalons[index]);
  });
}

export default function() {
  describe('Strings:', function() {
    checkStrings('should stay', 0);
    checkStrings('should stay', 1, 3);
    checkStrings('should be transformed to', 2, 3);
    checkStrings('should stay', 3, 0);
    checkStrings('should be transformed to', 4);
    checkStrings('should be transformed to', 5);
    checkStrings('should be transformed to', 6);
    checkStrings('should be transformed to', 7);
    checkStrings('should be transformed to', 8);
    checkStrings('should be transformed to', 9);
    checkStrings('should be transformed to', 10);
  });
}
