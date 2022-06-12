import DataSourceColumnDescriptor from './columnDescriptor';
import defineColumns from './helpers/defineColumns';
import defineEntry from './helpers/defineEntry';
import populate from './helpers/populate';
import initState from './helpers/state';
import { SourceDefinition } from './types';

export default class DataRoll {

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
      if(this.validator && !result.done) {
        if(this.validator(result.value)) {
          this.#entries.push(result.value);
          return result;
        } else {
          return next();
        }
      } else {
        if(!result.done) {
          this.#entries.push(result.value);
        }
        return result;
      }
    }

    const nextFromEntries = () => {
      const done  = (index = this.#entries.length - 1);
      const value = done ? undefined : this.#entries[index];
      return { done, value };
    }

    return this.#entries.length ? { next: nextFromEntries } : { next };
  }

  get entries() {

    this.#entries = populate(this, this.#entries);
    return this.#entries;
  }

  get length() {

    this.#entries = populate(this, this.#entries);
    return this.#entries.length;
  }

  get columns() {

    return this.#columns;
  }
}