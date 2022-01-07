export default function title(set: {inputs: any[], etalons: any[]}, index: number, text: string): string {
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