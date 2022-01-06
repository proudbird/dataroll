import { ValueType } from "../types";

export default function getNumberValue(input: ValueType, length?: number, scale: number = 0): number {
  
  if(length === 0) {
    throw new Error(`Length of a number value can't be 0`);
  }
  if(typeof input === 'string') {
    input = input.replace(/\,/g, '.')
  }
  let result = Number(input);
  if(isNaN(result)) {
    return 0;
  }
  input = result.toString();
  if(scale > 0) {
    input = result.toFixed(scale);
    result = parseFloat(input);
  } else {
    result = Math.round(result);
    input = result.toString();
  }
  if(length && input.replace(/\./g, '').length > length) {
    const template = '999999999999999999999999999999999999999999999999999999999999999';
    input = `${template.slice(0, length - scale)}.${template.slice(0, scale)}`;
    result = Number(input);
  }

  return result;
}