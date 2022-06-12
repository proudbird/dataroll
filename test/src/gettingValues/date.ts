import moment from 'moment';
import title from '../title';
import { defineValue } from '../../../build/helpers/defineEntry';

const type = 'D';
const etalon = new Date();
const input = moment(etalon);

const values = {
  inputs : [etalon, input.toISOString(), 'any text', null, undefined,   99, true,   ''],
  etalons: [etalon,              etalon,       null, null,      null, null, null, null]
};

function checkValue(text: string, index: number, length?: number, scale?: number): void {
  test(title(values, index, text), () => {
    const output = defineValue(values.inputs[index], type, length, scale);
    const etalon = values.etalons[index];
    expect(output).toEqual(etalon);
  });
}

export default function() {
  describe('Date:', function() {
    checkValue('should stay', 0);
    checkValue('should to be interpreted as', 1);
    //checkValue('should to be interpreted as', 2);
    checkValue('should stay', 3);
    checkValue('should to be interpreted as', 4);
    checkValue('should to be interpreted as', 5);
    checkValue('should to be interpreted as', 6);
    checkValue('should to be interpreted as', 7);
  });
}
