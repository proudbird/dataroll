import DataSourceColumnDescriptor from "../columnDescriptor";
import { SourceDefinition } from "../types";

export default function defineColumns(definition: SourceDefinition): DataSourceColumnDescriptor[] {
  
  const columns: DataSourceColumnDescriptor[] = [];

  function addColumn(definition: SourceDefinition): void {

    for(let attribute of definition.attributes) {
      for(let key in attribute) {
        const description = attribute[key];
        const dataType    = description[1];
        const length      = description.length > 2 ? description[2] : 0;
        const scale       = description.length > 3 ? description[3] : 0;
        const descriptor  = new DataSourceColumnDescriptor(key, dataType, length, scale);
        columns.push(descriptor);
      }
    }

    if(definition.subset) {
      addColumn(definition.subset);
    }
  }

  addColumn(definition);

  return columns;
}