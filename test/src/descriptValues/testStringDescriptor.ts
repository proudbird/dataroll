import { IValueDescriptor, AttributeValueDescriptor } from '../../../build/types';
import { descriptValue } from '../../../build/helpers/defineEntry';

import testDescription from './testDescription';

const type = 'S';

function inputDescriptor(property: string, length?: number|undefined|Function, scale?: any, handler?: any, ...args: any): AttributeValueDescriptor {
  args = args || [];
  return [
    property,
    type,
    length,
    scale, 
    handler,
    ...args
  ];
}

function outputDescriptor(property: string, length?: number|undefined, scale?: number|undefined, handler?: Function, args?: any[]): IValueDescriptor {
  args = args || [];
  return {
    property,
    type,
    length,
    scale, 
    handler,
    args
  };
}

const handler = () => {};

const values = {
  inputs: [
    inputDescriptor('name'),
    inputDescriptor('name', 25),
    inputDescriptor('name', 25, 3),
    inputDescriptor('name', 25, handler),
    inputDescriptor('name', 25, handler, `text`),
    inputDescriptor('name', 25, handler, `text`, 1, 2),
    inputDescriptor('name', handler),
    inputDescriptor('name', handler, `text`, 1, 2),
  ],
  etalons: [
    outputDescriptor('name', -1, -1, undefined, []),
    outputDescriptor('name', 25, -1, undefined, []),
    outputDescriptor('name', 25,  3, undefined, []),
    outputDescriptor('name', 25, -1,   handler, [undefined]),
    outputDescriptor('name', 25, -1,   handler, [`text`]),
    outputDescriptor('name', 25, -1,   handler, [`text`, 1, 2]),
    outputDescriptor('name', -1, -1,   handler, [undefined, undefined]),
    outputDescriptor('name', -1, -1,   handler, [`text`, 1, 2]),
  ]
}

export default function() {
  describe('Strings:', function() {
    testDescription(values, 'should be transformed to', 0);
    testDescription(values, 'should be transformed to', 1);
    testDescription(values, 'should be transformed to', 2);
    testDescription(values, 'should be transformed to', 3);
    testDescription(values, 'should be transformed to', 4);
    testDescription(values, 'should be transformed to', 5);
    testDescription(values, 'should be transformed to', 6);
    testDescription(values, 'should be transformed to', 7);

    test(`trying to get descriptor without params should throw an error`, () => {;
      expect(descriptValue).toThrow(`Descriptor has to be an array of params`);
    });

    test(`trying to get descriptor without wrong first param type`, () => {;
      expect(() => { descriptValue([123]) }).toThrowError(`First parameter of descriptor must be a string`);
    });
  });
}