export default function initState(source: any, definition: any, state = undefined, root = '#') {

  state = state || { root, [root]: {  branch: source[Symbol.iterator](), definition: definition }};
  if(definition.subset) {
    const parentRoot = root;
    root += `.${definition.subset.root}`
    state[root] = { definition: definition.subset, parent: parentRoot };
    initState(source, definition.subset, state, root);
  }

  return state;
}