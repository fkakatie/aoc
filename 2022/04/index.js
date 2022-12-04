import { test, input } from './input.js';

function getFullSection(sections) {
  // eslint-disable-next-line prefer-const
  let [a, b] = sections.split('-').map((r) => parseInt(r, 10));
  const range = [];
  while (a <= b) {
    range.push(a);
    a += 1;
  }
  return range;
}

function sanitizeInput(list) {
  return list.split('\n').map((l) => l.split(',').map((s) => getFullSection(s)));
}

function findDuplicates(one, two) {
  if (two.length < one.length) return findDuplicates(two, one);
  const dups = [];
  one.forEach((item) => {
    if (two.indexOf(item) !== -1) dups.push(item);
  });
  return [...new Set(dups)];
}

function checkIfArraysEqual(a, b) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i += 1) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

/* PART ONE */
function findInclusivePairs(list) {
  const pairs = sanitizeInput(list);
  let inclusivePairs = 0;
  pairs.forEach((pair) => {
    const [a, b] = pair;
    const dups = findDuplicates(a, b);
    const arraysEqual = checkIfArraysEqual(dups, a) || checkIfArraysEqual(dups, b);
    if (arraysEqual) inclusivePairs += 1;
  });

  console.log('  inclusive pairs:', inclusivePairs);
}

findInclusivePairs(input);

/* PART TWO */
function findOverlappingPairs(list) {
  const pairs = sanitizeInput(list);
  let overlappingPairs = 0;
  pairs.forEach((pair) => {
    const [a, b] = pair;
    const dups = findDuplicates(a, b);
    if (dups.length) overlappingPairs += 1;
  });

  console.log('overlapping pairs:', overlappingPairs);
}

findOverlappingPairs(input);
