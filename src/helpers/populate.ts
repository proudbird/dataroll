import DataSource from "../dataroll";

export default function populate(DataSource: DataSource, entries: any[]): any[] {
  
  if(!entries.length) {
    const temp = [];
    for(let entry of DataSource) {
      temp.push(entry);
    }
    return temp;
  } else {
    return entries;
  }

}