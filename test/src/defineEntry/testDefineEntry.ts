import title from '../title';
import { defineEntry } from '../../../build/helpers/defineEntry';

export default function testDefineEntry(values: { inputs: any[], etalons: any[] }, text: string, index: number): void {
  test(title(values, index, text), () => {;
    expect(defineEntry(values.inputs[index])).toEqual(values.etalons[index]);
  });
}