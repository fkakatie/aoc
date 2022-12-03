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
