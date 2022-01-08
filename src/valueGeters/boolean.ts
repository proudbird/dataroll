import { ValueType } from "../types";

export default function getBooleanValue(input: ValueType): boolean {

  let result = true;
  if(typeof input === 'string') {
    input = input.toLowerCase();
    if(input === 'true' || input === '1') {
      result = true;
    } else {
      result = false;
    } 
  } else if(typeof input === 'number' && input !== 1) {
    result = false;
  } else if (typeof input !== 'boolean' && typeof input !== 'number') {
    result = false;
  } else {
    result = Boolean(input);
  }

  return result;
}