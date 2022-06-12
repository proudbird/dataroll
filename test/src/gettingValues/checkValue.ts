import title from '../title';
import { defineValue } from '../../../build/helpers/defineEntry';
import { AttributeType } from '../../../build/types';

export default function checkValue(values: { inputs: any[], etalons: any[] }, type: AttributeType, text: string, index: number, length?: number|undefined, scale?: number|undefined): void {
  test(title(values, index, text), () => {;
    expect(defineValue(values.inputs[index], type, length, scale)).toEqual(values.etalons[index]);
  });
}