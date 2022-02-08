import { readFileSync } from 'fs';
import { join } from 'path';
import { should, expect } from 'chai';
import moment from 'moment';
import gettingValues from './gettingValues/gettingValues';
import descriptValues from './descriptValues/descriptValues';
import testDefineEntryFromSingleLevelSource from './defineEntry/testDefineEntryFromSingleLevelSource';
import DataRoll from '../../build/dataroll';

describe('xDataSource testings', () => {
  gettingValues();
  descriptValues();
  testDefineEntryFromSingleLevelSource();
});

function handler(value, property) {
  
  if(property === 'Category') {
    return value[0].value;
  } else {
    return value[1].value;
  }
}
const definition = {
  attributes: [
    { id: ['id', 'S', 36] },
    { created: ['createdAt', 'D'] },
    { updated: ['updatedAt', 'D'] },
    { category: ['properties', 'S', handler, 'Category'] },
    { brand: ['properties', 'S', handler, 'Brand'] },
  ],
  subset: {
    attributes: [
      { skuId: ['id', 'S', 36] },
      { code: ['code', 'S', 10] },
      { retailPrice: ['prices.retail', 'N', 10, 2] },
      { wholesalePrice: ['prices.wholesale', 'N', 10, 2] },
    ],
    root: 'sku',
    subset: {
      attributes: [
        { barcode: ['*', 'S'] }
      ],
      root: 'barcodes'
    }
  }
};

const etalons = [{ 
  id: '88564ba5-0194-58ff-8fd2-a7b46e1b670e',
  created: moment("2021-07-14T17:00:18Z").toDate(),
  updated: moment("2021-09-22T14:25:51Z").toDate(),
  category: 'Computers',
  brand: 'IBM',
  skuId: '7902975e-81b5-469e-806d-364b55ca7f5c',
  code: '1/01',
  retailPrice: 999.99,
  wholesalePrice: 899.99,
  barcode: "comp-01"
 }, { 
  id: '88564ba5-0194-58ff-8fd2-a7b46e1b670e',
  created: moment("2021-07-14T17:00:18Z").toDate(),
  updated: moment("2021-09-22T14:25:51Z").toDate(),
  category: 'Computers',
  brand: 'IBM',
  skuId: '7902975e-81b5-469e-806d-364b55ca7f5c',
  code: '1/02',
  retailPrice: 0,
  wholesalePrice: 0,
  barcode: "comp-1/02/1"
 }, { 
  id: '88564ba5-0194-58ff-8fd2-a7b46e1b670e',
  created: moment("2021-07-14T17:00:18Z").toDate(),
  updated: moment("2021-09-22T14:25:51Z").toDate(),
  category: 'Computers',
  brand: 'IBM',
  skuId: '7902975e-81b5-469e-806d-364b55ca7f5c',
  code: '1/02',
  retailPrice: 0,
  wholesalePrice: 0,
  barcode: "comp-1/02/2"
 }, { 
  id: 'db58c35c-d554-41d7-8ae3-590cce87d355',
  created: moment("2021-07-14T17:00:18Z").toDate(),
  updated: moment("2021-09-22T14:25:51Z").toDate(),
  category: 'Computers',
  brand: 'Lenovo',
  skuId: 'd25c6774-6ed4-4829-9c3b-fe57f565c655',
  code: '2/01',
  retailPrice: 0,
  wholesalePrice: 0,
  barcode: "comp-02"
 }, { 
  id: 'db58c35c-d554-41d7-8ae3-590cce87d355',
  created: moment("2021-07-14T17:00:18Z").toDate(),
  updated: moment("2021-09-22T14:25:51Z").toDate(),
  category: 'Computers',
  brand: 'Lenovo',
  skuId: '1885f785-0e02-491d-a31a-3dcabeddfc68',
  code: '2/02',
  retailPrice: 0,
  wholesalePrice: 0,
  barcode: "comp-2/02/1"
 }, { 
  id: 'db58c35c-d554-41d7-8ae3-590cce87d355',
  created: moment("2021-07-14T17:00:18Z").toDate(),
  updated: moment("2021-09-22T14:25:51Z").toDate(),
  category: 'Computers',
  brand: 'Lenovo',
  skuId: '1885f785-0e02-491d-a31a-3dcabeddfc68',
  code: '2/02',
  retailPrice: 0,
  wholesalePrice: 0,
  barcode: "comp-2/02/2"
 }, { 
  id: 'db58c35c-d554-41d7-8ae3-590cce87d355',
  created: moment("2021-07-14T17:00:18Z").toDate(),
  updated: moment("2021-09-22T14:25:51Z").toDate(),
  category: 'Computers',
  brand: 'Lenovo',
  skuId: '1885f785-0e02-491d-a31a-3dcabeddfc68',
  code: '2/02',
  retailPrice: 0,
  wholesalePrice: 0,
  barcode: "comp-2/02/3"
 }
]

describe('Iterating throw all entries of source', () => {
  it('should iterate throw all entries', () => {
    const sourceFile = readFileSync(join(__dirname, './sources/dataset.json'), 'utf8');
    const source = JSON.parse(sourceFile);
    const ds = new DataRoll(source, definition);
    let index = 0;
    for(let entry of ds) {
      expect(entry).to.deep.equal(etalons[index]);
      index++;
    }
  })
});
