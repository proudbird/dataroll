export default function initState(source: any, definition: any, state = undefined, root = '#') {

  if (source == null || typeof source[Symbol.iterator] !== 'function') {
    let message: string;
    if (root == '#') {
      message = `Data source is not iterable`;
    } else {
      message = `Subset ${root} is not iterable`;
    }
    throw new Error(message);
  }

  state = state || { root, [root]: {  branch: source[Symbol.iterator](), definition: definition }};
  if(definition.subset) {
    const parentRoot = root;
    root += `.${definition.subset.root}`
    state[root] = { definition: definition.subset, parent: parentRoot };
    initState(source, definition.subset, state, root);
  }

  return state;
}