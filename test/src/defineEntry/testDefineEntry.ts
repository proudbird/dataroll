import { expect } from 'chai';
import title from '../title';
import { defineEntry } from '../../../build/helpers/defineEntry';

export default function testDefineEntry(values: { inputs: any[], etalons: any[] }, text: string, index: number): void {
  it(title(values, index, text), () => {;
    expect(defineEntry(values.inputs[index])).eql(values.etalons[index]);
  });
}