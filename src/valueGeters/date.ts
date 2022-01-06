import { ValueType } from "../types";

export default function getDateValue(input: ValueType): Date {

  let result: Date = null;
  try {
    result = new Date(input as string);
  } catch (error) {
    //TODO: should we throw an error?
  }

  return result;
}