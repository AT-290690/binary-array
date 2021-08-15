const create = (...initial) => {
  const list = {
    offsetRight: 0,
    offsetLeft: 0,
    vector: [[null, null]],
    size: 0
  };
  list.thunk = () => list;
  list.toArray = () => [...list];
  list[Symbol.iterator] = function* () {
    for (let i = 0; i < this.size; i++) yield get(list, i);
  };
  if (initial.length) {
    const half = Math.floor(initial.length / 2);
    for (let i = half - 1; i >= 0; i--) addToLeft(list, initial[i]);
    for (let i = half; i < initial.length; i++) addToRight(list, initial[i]);
  }
  return list;
};
const pipe =
  (...fn) =>
  x =>
    fn.reduce((v, f) => f(v), x);
const abs = key => (key < 0 ? key * -1 : key);
const remove = (list, key) => {
  const index = abs(key);
  const current = list.vector[index];
  if (!current) return null;

  if (list.size === 1) {
    list.vector = [[null, null]];
    list.size = 0;
  }

  if (key < 0) current[0] = null;
  if (key >= 0) current[1] = null;
  const next = list.vector[index + 1] || [null, null];
  const prev = list.vector[index - 1] || [null, null];
  if (
    current[0] === null &&
    current[1] === null &&
    next[0] === null &&
    next[1] === null &&
    prev[0] === null &&
    prev[1] === null
  ) {
    list.vector.length--;
  }
  list.size--;
};
const add = (list, key, value) => {
  const index = abs(key);
  if (!list.vector[index]) list.vector[index] = [null, null];
  const current = list.vector[index];
  if (key >= 0) current[1] = value;
  else current[0] = value;
  list.size++;
};
const addToLeft = (list, value) => add(list, --list.offsetLeft, value);
const addToRight = (list, value) => add(list, list.offsetRight++, value);
const removeFromLeft = list => list.size && remove(list, list.offsetLeft++);
const removeFromRight = list => list.size && remove(list, --list.offsetRight);
const access = (list, key) => {
  const index = abs(key);
  const current = list.vector[index];
  if (!current) return null;
  return key >= 0 ? current[1] : current[0];
};
const vectorIndexOf = (list, index) => {
  const key = index + list.offsetLeft;
  return key < 0 ? [key * -1, -1] : [key, 1];
};
const get = (list, index) => access(list, index + list.offsetLeft);
const clear = list => {
  list.vector = [[null, null]];
  list.size = 0;
  list.offsetLeft = 0;
  list.offsetRight = 0;
};
const set = (list, key, value) => {
  const index = vectorIndexOf(list, key);
  return index[1] >= 0
    ? (list.vector[index[0]][1] = value)
    : (list.vector[index[0]][0] = value);
};
const first = list => get(list, 0);
const last = list => get(list, this.size - 1);
const pivot = list => list.vector[0][1];
const push =
  (...items) =>
  list => {
    for (let i = 0; i < items.length; i++) addToRight(list, items[i]);
    return list;
  };
const unshift =
  (...items) =>
  list => {
    for (let i = items.length - 1; i >= 0; i--) addToLeft(list, items[i]);
    return list;
  };
const pop = () => list => {
  removeFromRight(list);
  return list;
};
const shift = () => list => {
  removeFromLeft(list);
  return list;
};

const map = callback => list => {
  const result = create();
  const half = Math.floor(list.size / 2);
  for (let i = half - 1; i >= 0; i--)
    addToLeft(result, callback(get(list, i), i, list));
  for (let i = half; i < list.size; i++)
    addToRight(result, callback(get(list, i), i, list));
  return result;
};

const filter = callback => list => {
  const out = [];
  for (let i = 0; i < list.size; i++) {
    const current = get(list, i);
    const predicat = callback(current, i, list);
    if (predicat) out.push(current);
  }
  return create(...out);
};

const reverse = () => list => {
  if (list.size <= 2) {
    if (list.size === 1) {
      return list;
    }
    const temp = get(list, 0);
    set(list, 0, get(list, 1));
    set(list, 1, temp);
    return list;
  }
  const temp = list.offsetRight * -1;
  list.offsetRight = list.offsetLeft * -1 + 1;
  list.offsetLeft = temp + 1;
  for (let i = 0; i < list.size; i++) {
    const right = list.vector[i]?.[1] ?? null;
    const left = list.vector[i]?.[0] ?? null;
    list.vector[i] = [right, left];
  }
  if (list.vector[0][1] === null)
    list.vector[0] = [list.vector[0][1], list.vector[0][0]];
  return list;
};

const loop = n => callback => {
  let res;
  for (let i = 0; i < n; i++) res = callback();
  return res;
};

export {
  create,
  remove,
  get,
  clear,
  set,
  first,
  last,
  pivot,
  push,
  pop,
  shift,
  unshift,
  map,
  filter,
  reverse,
  pipe,
  loop
};
