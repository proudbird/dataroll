export default function title(set: {inputs: any[], etalons: any[]}, index: number, text: string): string {
  let input  = set.inputs[index];
  let etalon = set.etalons[index];
  input  = adopt(input);
  etalon = adopt(etalon);

  return `${input} ${text} ${etalon}`;
}

function adopt(value: any): string {
  if(value === '') {
    value = 'empty string';
  }

  if(typeof value === 'string') {
    value = `'${value}'`;
  }

  return value;
}