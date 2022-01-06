
import DataSourceColumnDescriptor from './columnDescriptor';
import defineColumns from './helpers/defineColumns';
import defineEntry from './helpers/defineEntry';
import populate from './helpers/populate';
import initState from './helpers/state';
import { SourceDefinition } from './types';

export default class DataSource {

  #columns  : DataSourceColumnDescriptor[];
  #entries  : any[];
  
  constructor(public source: any[], public definition: SourceDefinition, public validator?: Function) {
    
    this.#columns   = defineColumns(definition);
    this.#entries   = [];

    this.source     = source;
    this.definition = definition;
    this.validator  = validator;
  }

  [Symbol.iterator] = () => {

    const state = initState(this.source, this.definition);
    let entry   = {};
    let index   = 0;

    const next = () => {
      const result = defineEntry(state, entry);
      this.#entries.push(result.value);
      return result;
    }

    const nextFromEntries = () => {
      const done = (index = this.#entries.length - 1);
      return { done: done, value: this.#entries[index]};
    }

    return this.#entries.length ? { next: nextFromEntries } : { next };
  }

  get entries() {

    populate(this, this.#entries);
    return this.#entries;
  }

  get length() {

    populate(this, this.#entries);
    return this.#entries.length;
  }

  get columns() {

    return this.#columns;
  }
}