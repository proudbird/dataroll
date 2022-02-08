import { ValueType } from "../types";

export default function getNumberValue(input: ValueType, length: number = -1, scale: number = -1): number {
  
  if(length === 0) {
    throw new Error(`Length of a number value can't be 0`);
  }

  length = length > 0 ? Math.min(length, 16) : length;
  scale  = scale  > 0 ? Math.min(scale , 16) : scale;

  if(typeof input === 'string') {
    input = input.replace(/\,/g, '.');
  }

  let result = Number(input);
  if(Number.isNaN(result)) {
    return 0;
  }

  if(scale > 0) {
    input = result.toFixed(scale);
    result = Number(input);
  } else if(scale === 0) {
    result = Math.round(result);
    input = result.toString();
  }

  if(result !== 0 && length > 0 && input.toString().replace(/\./g, '').length > length) {
    const template = '9999999999999999';
    input = `${template.slice(0, length - scale)}.${template.slice(0, scale)}`;
    result = Number(input);
  }

  return result;
}