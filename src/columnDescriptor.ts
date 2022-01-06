import { AttributeType, DataType } from "./types";

export default class DataSourceColumnDescriptor {

  public dataType: DataType; 
  constructor(public name: string, type: AttributeType, public length?: number, public scale?: number) {
    
    const dataTypeMap = {
      'S': 'STRING',
      'N': 'NUMBER',
      'B': 'BOOLEAN',
      'D': 'DATE'
    };

    this.name     = name;
    this.dataType = dataTypeMap[type] as DataType;
    this.length   = length;
    this.scale    = scale;
  }
}