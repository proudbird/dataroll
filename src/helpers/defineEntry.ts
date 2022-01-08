import getPropery from 'lodash.get';
import isFunction from 'lodash.isFunction';
import getStringValue from '../valueGeters/string';

import { AttributeType, AttributeValueDescriptor, ValueType } from "../types";
import getNumberValue from '../valueGeters/number';
import getBooleanValue from '../valueGeters/boolean';
import getDateValue from '../valueGeters/date';

export default function defineEntry(state: any, entry: any):  { done: boolean, value: any } {

  const current = state[state.root];
  const { done, value } = current.branch.next();

  for(let attribute of current.definition.attributes) {
    for(let key in attribute) {
      entry[key] = getPropertyValue(value, attribute[key]);
    }
  }

  if(done && state.root === '#') {
    return { done: true, value: entry };
  } else if(done && !value) {
    state.root = current.parent;
    return defineEntry(state, entry);
  } else if(done) {
    state.root = current.parent;
    return { done: false, value: entry };
  }

  if(current.definition.subset) {
    const nextRoot   = state.root + '.' + current.definition.subset.root;
    const nextState  = state[nextRoot];
    nextState.branch = value[current.definition.subset.root][Symbol.iterator]();
    state.root = nextRoot;
    return defineEntry(state, entry);
  } else {
    return { done: false, value: entry };
  }
}

export function getPropertyValue(node: any, descriptor: AttributeValueDescriptor): ValueType {

  let result = undefined;
  const [property, type, length, scale, handler, args] = descriptValue(descriptor);
  const value = getPropery(node, property);
  if(handler) {
    result = defineValue(handler(value, ...args), type, length, scale);
  } else if(property === '*') {
    result = defineValue(node, type, length, scale);
  } else {
    result = defineValue(value, type, length, scale);
  }

  return result;
}

export function descriptValue(descriptor: AttributeValueDescriptor):
    [string, AttributeType, number, number, Function, any[]] {

  function changeIfFunction<T extends number|AttributeType>(param: any, defaultValue: T): 
      [T extends number ? number : AttributeType, Function|undefined] {

    let handler: Function;
    if(isFunction(param)) {
      handler = param;
      param   = defaultValue || 0;
    } else {
      param = param || defaultValue;
    }

    return [param, handler];
  }

  let property = descriptor[0];
  let type     : AttributeType;
  let length   : number;
  let scale    : number;
  let handler  : Function;
  let args     : any[] = [];

  if(descriptor.length > 1) {
    type = descriptor[1];
    [type, handler] = changeIfFunction(type, 'S');
  }
  if(descriptor.length > 2) {
    length = descriptor[2];
    [length, handler] = changeIfFunction(length, 0);
    args = descriptor.slice(3) || args;
  }
  if(descriptor.length > 3) {
    scale = descriptor[3];
    [scale, handler] = changeIfFunction(scale, 0);
    args = descriptor.slice(4) || args;
  }
  if(descriptor.length > 4) {
    let argIndex = 4;
    if(!isFunction(handler)) {
      handler = descriptor[4];
      argIndex++;
    }
    args = descriptor.slice(argIndex) || args;
  }

  return [property, type, length, scale, handler, args];
}

const valueTypeMap: { [K in AttributeType]?: Function } = {
  'S': getStringValue,
  'N': getNumberValue,
  'B': getBooleanValue,
  'D': getDateValue
}

export function defineValue(input: any, type: AttributeType, length: number|undefined, scale: number = 0) {

  const handler = valueTypeMap[type];
  if(!handler) {
    throw new Error(`Attribute type ${type} not defined`);
  }

  return handler(input, length, scale);
}