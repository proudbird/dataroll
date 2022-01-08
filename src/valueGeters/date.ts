import moment from 'moment';
import { ValueType } from "../types";

export default function getDateValue(input: ValueType): Date {

  let result: Date = null;
  if(!input || typeof input === 'number') {
    return null
  }

  const d = moment(input as string);
  if(d.isValid()) {
    result = d.toDate();
  }

  return result;
}