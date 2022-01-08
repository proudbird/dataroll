import moment from 'moment';
import { expect } from 'chai';
import title from '../title';
import getDateValue from '../../../build/valueGeters/date';

const etalon = new Date();
const input = moment(etalon);

const values = {
  inputs : [etalon, input.toISOString(), 'any text', null, undefined,   99, true,   ''],
  etalons: [etalon,              etalon,       null, null,      null, null, null, null]
};

function checkValue(text: string, index: number, length?: number, scale?: number): void {
  it(title(values, index, text), () => {
    const output = getDateValue(values.inputs[index], length, scale);
    const etalon = values.etalons[index];
    expect(output).to.eql(etalon);
  });
}

export default function() {
  describe('Date:', function() {
    checkValue('should stay', 0);
    checkValue('should to be interpreted as', 1);
    checkValue('should to be interpreted as', 2);
    checkValue('should stay', 3);
    checkValue('should to be interpreted as', 4);
    checkValue('should to be interpreted as', 5);
    checkValue('should to be interpreted as', 6);
    checkValue('should to be interpreted as', 7);
  });
}
