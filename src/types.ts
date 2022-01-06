export type SourceDefinition = {
  attributes: Array<AttributeDefinition>,
  subset   ?: SourceDefinition,
  root     ?: string
}

export type AttributeDefinition = {
  [attributeName: string]: AttributeValueDescriptor
}

export type AttributeValueDescriptor = [string?, AttributeType?, number?, number?, Function?, ...[]];

export type AttributeType = 'S'|'N'|'B'|'D';
export type DataType = 'STRING'|'NUMBER'|'BOOLEAN'|'DATE';
export type ValueType = string|number|boolean|Date;