import title from '../title';
import { descriptValue } from '../../../build/helpers/defineEntry';

export default function testDescription(values: { inputs: any[], etalons: any[] }, text: string, index: number): void {
  test(title(values, index, text), () => {;
    expect(descriptValue(values.inputs[index])).toEqual(values.etalons[index]);
  });
}