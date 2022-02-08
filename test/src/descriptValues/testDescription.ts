import { expect } from 'chai';
import title from '../title';
import { descriptValue } from '../../../build/helpers/defineEntry';

export default function testDescription(values: { inputs: any[], etalons: any[] }, text: string, index: number): void {
  it(title(values, index, text), () => {;
    expect(descriptValue(values.inputs[index])).eql(values.etalons[index]);
  });
}