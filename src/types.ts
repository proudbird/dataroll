export declare type SourceDefinition = {
  attributes: Array<AttributeDefinition>,
  subset   ?: SourceDefinition,
  root     ?: string
}

export declare type AttributeDefinition = {
  [attributeName: string]: AttributeValueDescriptor
}

export declare type AttributeValueDescriptor = [
  string,            // property name
  (AttributeType)?,  // value type
  (number)?,         // length
  (number)?,         // scale
  Function?,         // handler
  ...[]              // params
]

export declare type IValueDescriptor = {
  property: string,
  type    : AttributeType,
  length  : number,
  scale   : number,
  handler : Function, 
  args    : any[]
}

export declare type AttributeType = 'S'|'N'|'B'|'D'|'U';
export declare type DataType = 'STRING'|'NUMBER'|'BOOLEAN'|'DATE';
export declare type ValueType = string|number|boolean|Date;