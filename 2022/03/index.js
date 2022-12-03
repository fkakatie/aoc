import { test, input } from './input.js';

function getPriority(item) {
  const arr = [null];
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  alphabet.forEach((a) => arr.push(a));
  alphabet.forEach((a) => arr.push(a.toUpperCase()));
  return arr.indexOf(item);
}

function findDuplicate(one, two) {
  return one.find((item) => {
    if (two.indexOf(item) !== -1) return item;
    return false;
  });
}

function findDuplicates(one, two) {
  if (two.length < one.length) return findDuplicates(two, one);
  const dups = [];
  one.forEach((item) => {
    if (two.indexOf(item) !== -1) dups.push(item);
  });
  return [...new Set(dups)];
}

function sanitizeInput(list) {
  return list.split('\n');
}

function makeGroups(list) {
  const groups = [];
  let group = [];
  list.forEach((rucksack) => {
    if (group.length < 3) group.push(rucksack.split(''));
    else {
      groups.push(group);
      group = [rucksack.split('')];
    }
  });
  if (group.length === 3) groups.push(group);
  return groups;
}

/* PART ONE */
function partOne(list) {
  const rucksacks = sanitizeInput(list);
  let sum = 0;

  rucksacks.forEach((sack) => {
    const compOne = sack.slice(0, sack.length / 2).split('');
    const compTwo = sack.slice(sack.length / 2).split('');
    const dup = findDuplicate(compOne, compTwo);
    sum += getPriority(dup);
  });

  console.log('sum:', sum);
}

partOne(input);

/* PART TWO */
function partTwo(list) {
  const rucksacks = sanitizeInput(list);
  const groups = makeGroups(rucksacks);
  let sum = 0;

  groups.forEach((group) => {
    const [a, b, c] = group;
    const abDups = findDuplicates(a, b);
    const bcDups = findDuplicates(b, c);
    const dup = findDuplicate(abDups, bcDups);
    sum += getPriority(dup);
  });

  console.log('sum:', sum);
}

partTwo(input);
