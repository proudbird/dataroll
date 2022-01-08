import { should } from 'chai';
import title from '../title';
import { defineValue } from '../../../build/helpers/defineEntry';
import { AttributeType } from '../../../build/types';

export default function checkValue(values: { inputs: any[], etalons: any[] }, type: AttributeType, text: string, index: number, length?: number|undefined, scale?: number|undefined): void {
  it(title(values, index, text), () => {;
    should().equal(defineValue(values.inputs[index], type, length, scale), values.etalons[index]);
  });
}