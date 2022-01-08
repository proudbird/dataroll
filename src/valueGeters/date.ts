import moment from 'moment';
import { ValueType } from "../types";

export default function getDateValue(input: ValueType): Date {

  let result: Date = null;
  if(!input || typeof input === 'number') {
    return null
  }
  try {
    const d = moment(input as string);
    if(d.isValid()) {
      result = d.toDate();
    }
  } catch (error) {
    //TODO: should we throw an error?
    return null
  }

  return result;
}