/// <reference types="lodash" />
/// <reference types="moment" />

declare class Dataroll {
    source: any[];
    definition: SourceDefinition;
    validator?: Function;

    constructor(source: any[], definition: SourceDefinition, validator?: Function);
    
    [Symbol.iterator]: () => {};
    get entries(): any[];
    get length(): number;
    get columns(): DataSourceColumnDescriptor[];
}

declare type SourceDefinition = {
    attributes: Array<AttributeDefinition>;
    subset?: SourceDefinition;
    root?: string;
};
declare type AttributeDefinition = {
    [attributeName: string]: AttributeValueDescriptor;
};

type numberOrFunction = number | Function;
type numberOrFunctionOrAny = number | Function | any;
type FunctionOrAny = Function | any;

declare type AttributeValueDescriptor = [
    string,
    AttributeType?,
    numberOrFunction?,
    numberOrFunctionOrAny?,
    FunctionOrAny?,
    any?
];

declare type IValueDescriptor = {
    property: string;
    type: AttributeType;
    length: number;
    scale: number;
    handler: Function;
    args: any[];
};
declare type AttributeType = 'S' | 'N' | 'B' | 'D' | 'U';
declare type DataType = 'STRING' | 'NUMBER' | 'BOOLEAN' | 'DATE';
declare type ValueType = string | number | boolean | Date;

declare class DataSourceColumnDescriptor {
    name: string;
    length?: number;
    scale?: number;
    dataType: DataType;
    constructor(name: string, type: AttributeType, length?: number, scale?: number);
}

declare namespace Dataroll {

    interface SourceDefinition {
        attributes: Array<AttributeDefinition>;
        subset?: SourceDefinition;
        root?: string;
    }
}

export = Dataroll;
export as namespace Dataroll;