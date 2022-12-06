import { test, input } from './input.js';

function sanitizeInput(list) {
  return list.split('\n');
}

function sum(arr) {
  return arr.reduce((a, b) => a + b, 0);
}

function sort(arr) {
  return arr.sort((a, b) => a - b);
}

function removeDups(arr) {
  return [...new Set(arr)];
}

function checkIfArraysEqual(a, b) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i += 1) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

/* PART ONE */
function partOne(list) {
  const sanitized = sanitizeInput(list);

  console.log('solution:', sanitized);
}

partOne(test);

/* PART TWO */
function partTwo(list) {
  const sanitized = sanitizeInput(list);

  console.log('solution:', sanitized);
}

partTwo(test);
