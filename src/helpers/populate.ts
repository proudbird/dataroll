
import DataSource from "../dataSource";

export default function populate(DataSource: DataSource, entries: any[]): void {
  
  if(!entries.length) {
    for(let entry of DataSource) {
      entries.push(entry);
    }
  }
}