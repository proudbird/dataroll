import getProperty from 'lodash.get';
import isFunction from 'lodash.isfunction';
import getStringValue from '../valueGeters/string';

import { AttributeType, AttributeValueDescriptor, IValueDescriptor, ValueType } from "../types";
import getNumberValue from '../valueGeters/number';
import getBooleanValue from '../valueGeters/boolean';
import getDateValue from '../valueGeters/date';

export default function defineEntry(state: any, entry: any):  { done: boolean, value?: any } {

  const current = state[state.root];
  const { done, value } = current.branch.next();

  if(value) {
    for(let attribute of current.definition.attributes) {
      for(let key in attribute) {
        entry[key] = getPropertyValue(value, attribute[key]);
      }
    }
  }

  if(done && state.root === '#') {
    // it's the last item of the first level of the collection
    return { done: true };
  // } else if(done) {
  //   state.root = current.parent;
  //   return defineEntry(state, entry);
  // } 
  } else if(done && !value) {
    state.root = current.parent;
    return defineEntry(state, entry);
  } else if(done) {
    state.root = current.parent;
    return { done: false, value: { ...entry } };
  }

  if(current.definition.subset) {
    const nextRoot   = state.root + '.' + current.definition.subset.root;
    const nextState  = state[nextRoot];
    nextState.branch = value[current.definition.subset.root][Symbol.iterator]();
    state.root = nextRoot;
    return defineEntry(state, entry);
  } else {
    return { done: false, value: { ...entry } };
  }
}

export function getPropertyValue(node: any, descriptor: AttributeValueDescriptor): ValueType {

  let result = undefined;
  const { property, type, length, scale, handler, args } = descriptValue(descriptor);
  //@ts-ignore
  const value = getProperty(node, property);
  if(handler) {
    result = defineValue(handler(value, ...args), type, length, scale);
  } else if(property === '*') {
    result = defineValue(node, type, length, scale);
  } else {
    result = defineValue(value, type, length, scale);
  }

  return result;
}

export function descriptValue(descriptor: AttributeValueDescriptor): IValueDescriptor {

  if(!Array.isArray(descriptor) || !descriptor.length) {
    throw new Error(`Descriptor has to be an array of params`);
  }
  
  if(typeof descriptor[0] !== 'string') {
    throw new Error(`First parameter of descriptor must be a string`);
  }

  function changeIfFunction<T extends number|AttributeType>(param: any, defaultValue: T): 
      [T extends number ? number : AttributeType, Function|undefined, boolean] {

    let handler: Function;
    let switched = false;
    //@ts-ignore
    if(isFunction(param)) {
      handler = param;
      param   = defaultValue || 0;
      switched = true;
    } else {
      param = param || defaultValue;
    }

    return [param, handler, switched];
  }

  let property = descriptor[0];
  let type     : AttributeType|undefined;
  let length   : number = -1;
  let scale    : number = -1;
  let handler  : Function;
  let args     : any[] = [];
  let switched : boolean;

  if(descriptor.length > 1) { 
    type = descriptor[1] as AttributeType;
    [type, handler, switched] = changeIfFunction(type, 'U');
    args = descriptor.slice(2) || args;
  }
  if(!switched) {
    if(descriptor.length > 2) {
      length = descriptor[2] as number;
      [length, handler, switched] = changeIfFunction(length, -1);
      if(typeof length !== 'number') {
        throw new Error(`Lenght parameter of the descriptor must be a number`);
      }
      args = descriptor.slice(3) || args;
    }
    if(!switched) {
      if(descriptor.length > 3) {
        scale = descriptor[3] as number;
        [scale, handler, switched] = changeIfFunction(scale, -1);
        args = descriptor.slice(4) || args;
      }
      if(!switched) {
        if(descriptor.length > 4) {
          let argIndex = 4;
          //@ts-ignore
          if(!isFunction(handler)) {
            handler = descriptor[4];
            argIndex++;
          }
          args = descriptor.slice(argIndex) || args;
        } 
      }
    }
  }

  return { property, type, length, scale, handler, args };
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