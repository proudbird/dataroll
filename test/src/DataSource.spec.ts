import { readFileSync } from 'fs';
import { join } from 'path';
import moment from 'moment';
import gettingValues from './gettingValues/gettingValues';
import descriptValues from './descriptValues/descriptValues';
import testDefineEntryFromSingleLevelSource from './defineEntry/testDefineEntryFromSingleLevelSource.spec';
import DataRoll from '../../build/dataroll';
import _ from 'lodash';

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
  test('should iterate throw all entries', () => {
    const sourceFile = readFileSync(join(__dirname, './sources/dataset.json'), 'utf8');
    const source = JSON.parse(sourceFile);
    const ds = new DataRoll(source, definition);
    let index = 0;
    for(let entry of ds) {
      expect(entry).toEqual(etalons[index]);
      index++;
    }
    expect(ds.length).toBe(7);
  })
});

describe('Getting length of the source', () => {
  test('should get the length of the source', () => {
    const sourceFile = readFileSync(join(__dirname, './sources/dataset.json'), 'utf8');
    const source = JSON.parse(sourceFile);
    const ds = new DataRoll(source, definition);
    expect(ds.length).toBe(7);
  })
});


describe('Getting length of the source', () => {
  test('should get the length of the source', () => {

    function castDate(value: string, offset: number) {
      const date = moment(value).add('hours', offset).toDate();
      return date;
    }
  
    function addin(addIn, type: string): string {
  
      const node = _.find(addIn, { type: type});
      const value = _.get(node, 'params[0].value');
    
      return value;
    }
    
    function price(addIn, type: string): string {
    
      const node = _.find(addIn, { type: type});
      const value = _.get(node, 'params[0].count');
    
      return value;
    }

    const definition = {
      attributes: [
        { cardId:   ['imtId' , 'N', 10 ] },
        { object:   ['object', 'S', 100] },
        { category: ['parent', 'S', 100] },
        { created:  ['createdAt', 'D', castDate] },
        { updated:  ['updatedAt', 'D', castDate] },
        { name:  ['addin', 'S', 255, addin, 'Наименование'] },
        { brand: ['addin', 'S', 255, addin, 'Бренд'] }
      ],
      subset: {
        root: 'nomenclatures',
        attributes: [
          { productId: ['nmId'      , 'S', 10 ] },
          { vednodSKU: ['vendorCode', 'S', 150] },
          { color: ['addin', 'S', 100, addin, 'Основной цвет'] },
          { size: ['addin', 'S', 50, addin, 'Размер'] }
        ],
        subset: {
          root: 'variations',
          attributes: [
            { skuId: ['chrtId', 'S', 10 ] },
            { price: ['addin', 'N', 10, 2, price, 'Розничная цена' ] }
          ],
          subset: {
            root: 'barcodes',
            attributes: [{ barcode: ['*', 'S', 100 ] }]
          }
        }
      }
    };

    const lastTimeUpdate = new Date(2021, 6, 5);

    function validator(record: any): boolean {

      let result = false;
      if(record.updated > lastTimeUpdate) {
        result = true;
      }
  
      return result;
    }
  
    const sourceFile = readFileSync(join(__dirname, './sources/listing.json'), 'utf8');
    const source = JSON.parse(sourceFile);
    const ds = new DataRoll(source.cards, definition, validator);
    expect(ds.length).toBe(36);
  })
});