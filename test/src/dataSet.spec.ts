import { expect, should } from 'chai';
import DataSet, { getStringValue, getNumberValue, getBooleanValue, getDateValue} from '../../build/DataSet';

const nowInput  = new Date(2022, 0, 25); 
const nowEtalon = nowInput.toString(); 
const nowNumber = Number(nowInput); 
const strings = {
  inputs : ['Hallo', 'xxx', 'xxxxx', 'xxx', undefined, null, NaN,   99.99,   true,   false,  nowInput],
  etalons: ['Hallo', 'xxx',   'xxx', 'xxx',        '',   '',  '', '99.99', 'true', 'false', nowEtalon]
};

const numbers = {
  inputs : [99.99, 100.00, 100.89, 100.89, 100.9, 0, undefined, null, '', 'some text', '15.89', '15,89', NaN, 100, true, false,  nowInput],
  etalons: [99.99,  99.99, 100.90, 101.00, 101.0, 0,         0,    0,  0,           0,   15.89,      16,   0,  99,    1,     0, nowNumber]
};

function title(set: {inputs: any[], etalons: any[]}, index: number, text: string): string {
  let input  = set.inputs[index];
  let etalon = set.etalons[index];
  if(input === '') {
    input = 'empty string';
  }
  if(etalon === '') {
    etalon = 'empty string';
  }
  return `${input} ${text} ${etalon}`;
}

function checkStrings(text: string, index: number, length?: number): void {
  it(title(strings, index, text), () => {;
    should().equal(getStringValue(strings.inputs[index], length), strings.etalons[index]);
  });
}

function checkNumber(text: string, index: number, length?: number, scale?: number): void {
  it(title(numbers, index, text), () => {;
    should().equal(getNumberValue(numbers.inputs[index], length, scale), numbers.etalons[index]);
  });
}

describe('DataSet value transformation', function() {

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

    it(`getting number value with lenth '0' should throw error`, () => {
      const check = () => {
        getNumberValue(99, 0);
      }
      should().throw(check);
    });
  });
});