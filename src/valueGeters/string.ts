import { ValueType } from "../types";

export default function getStringValue(input: ValueType, length?: number): string {
  
  let result = input ? input.toString() : '';
  if(typeof input === 'boolean') {
    result = input.toString();
  }
  if(length > 0) {
    result = result.slice(0, length);
  }

  return result;
}