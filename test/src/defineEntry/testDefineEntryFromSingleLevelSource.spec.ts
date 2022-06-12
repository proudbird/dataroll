import defineEntry from '../../../build/helpers/defineEntry';
import initState from '../../../build/helpers/state';

const source = [
  { id: '1fb501b5-5e0f-41a9-9643-82cb315032b9' },
  { id: '6db7c6c3-6cfe-4ecd-a21c-cc1cf897a63a' },
  { id: 'e37b1cc6-d3f0-43fd-a89a-29ca0b62fdf1' },
]

const definition = {
  attributes: [
    { id: ['id', 'S', 36] }
  ]
};

const source2 = [
  { id: '1fb501b5-5e0f-41a9-9643-82cb315032b9', 
    prices: { 
      retail: 10.99, 
      wholesale: 8.99
    }
  },
  { id: '6db7c6c3-6cfe-4ecd-a21c-cc1cf897a63a', 
    prices: { 
      retail: 12.99, 
      wholesale: 10.99
    }
  },
  { id: 'e37b1cc6-d3f0-43fd-a89a-29ca0b62fdf1', 
    prices: { 
      retail: 15.99, 
      wholesale: 13.99
    }
  },
]

const source3 = [
  { id: '1fb501b5-5e0f-41a9-9643-82cb315032b9', 
    prices: { 
      retail: 10.99, 
      wholesale: 8.99
    },
    colors: ['black', 'white'],
    properties: [{
        type: "Category",
        value: "Computers"
      }, {
        type: "Brand",
        value: "IBM"
      }
    ],
  },
  { id: '6db7c6c3-6cfe-4ecd-a21c-cc1cf897a63a', 
    prices: { 
      retail: 12.99, 
      wholesale: 10.99
    },
    colors: ['black', 'white'],
    properties: [{
        type: "Category",
        value: "Computers"
      }, {
        type: "Brand",
        value: "Lenovo"
      }
    ]
  }
]

const definition2 = {
  attributes: [
    { id: ['id', 'S', 36] },
    { retailPrice: ['prices.retail', 'N', 10, 2] },
    { wholesalePrice: ['prices.wholesale', 'N', 10, 2] },
  ]
};

const definition3 = {
  attributes: [
    { id: ['id', 'S', 36] },
    { retailPrice: ['prices.retail', 'N', 10, 2] },
    { wholesalePrice: ['prices.wholesale', 'N', 10, 2] },
  ],
  subset: {
    attributes: [
      { color: ['*', 'S'] },
    ],
    root: 'colors'
  }
};

function handler(value, property) {
  
  if(property === 'category') {
    return value[0].value;
  } else {
    return value[1].value;
  }
}

const definition4 = {
  attributes: [
    { id: ['id', 'S', 36] },
    { retailPrice: ['prices.retail', 'N', 10, 2] },
    { wholesalePrice: ['prices.wholesale', 'N', 10, 2] },
    { category: ['properties', 'S', 25, handler, 'category'] },
    { brand: ['properties', 'S', 25, handler, 'brand'] },
  ],
  subset: {
    attributes: [
      { color: ['*', 'S'] },
    ],
    root: 'colors'
  }
};

const value = { 
  id: source2[0].id,
  retailPrice: source2[0].prices.retail,
  wholesalePrice: source2[0].prices.wholesale,
 };

 const value3 = { 
  id: source3[0].id,
  retailPrice: source3[0].prices.retail,
  wholesalePrice: source3[0].prices.wholesale,
  color: source3[0].colors[0],
 };

 const value4 = { 
  id: source3[0].id,
  retailPrice: source3[0].prices.retail,
  wholesalePrice: source3[0].prices.wholesale,
  color: source3[0].colors[1],
 };
 
 const value5 = { 
  id: source3[1].id,
  retailPrice: source3[1].prices.retail,
  wholesalePrice: source3[1].prices.wholesale,
  color: source3[0].colors[0],
 };
 
 const value6 = { 
  id: source3[1].id,
  retailPrice: source3[1].prices.retail,
  wholesalePrice: source3[1].prices.wholesale,
  color: source3[1].colors[1],
 };

export default function() {
  
  describe('Getting entry from a singl level source:', function() {
    test(`should init state and define entry`, () => {
      const state = initState(source, definition);
      expect(state["#"].definition).toEqual(definition);
      expect(state.root).toEqual("#");
      expect(state).toHaveProperty("#");
      expect(state["#"]).toHaveProperty("branch");
      let result = defineEntry(state, {});
      expect(result).toHaveProperty("done");
      expect(result).toEqual({ done: false, value: { id: source[0].id }})
      result = defineEntry(state, {});
      expect(result).toEqual({ done: false, value: { id: source[1].id }})  
    });
  });

  describe('Getting entry from a nested source:', function() {
    test(`should init state and define entry`, () => {
      const state = initState(source2, definition2);
      let result = defineEntry(state, {});
      expect(result).toHaveProperty("done");
      expect(result).toEqual({ done: false, value });
      result = defineEntry(state, {});
    });
  });

  describe('Getting entry from a nested source with *:', function() {
    test(`should init state and define entry`, () => {
      const state = initState(source3, definition3);
      let result = defineEntry(state, {});
      expect(result).toHaveProperty("done");
      expect(result).toEqual({ done: false, value: value3 });
      result = defineEntry(state, result.value);
      expect(result).toEqual({ done: false, value: value4 });
      result = defineEntry(state, result.value);
      expect(result).toEqual({ done: false, value: value5 });
      result = defineEntry(state, result.value);
      result = defineEntry(state, result.value);
      expect(result).toEqual({ done: true, value: undefined });
    });
  });

  const value7 = { 
    id: source3[0].id,
    retailPrice: source3[0].prices.retail,
    wholesalePrice: source3[0].prices.wholesale,
    color: source3[0].colors[0],
    category: source3[0].properties[0].value,
    brand: source3[0].properties[1].value,
   };

  describe('Getting entry from a nested source with * and handler:', function() {
    test(`should init state and define entry`, () => {
      const state = initState(source3, definition4);
      let result = defineEntry(state, {});
      expect(result).toHaveProperty("done");
      expect(result).toEqual({ done: false, value: value7 });
    });
  });
}