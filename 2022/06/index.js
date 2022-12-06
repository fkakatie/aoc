import { test, input } from './input.js';

function sanitizeInput(list) {
  return list.split('\n');
}

function checkIfArraysEqual(a, b) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i += 1) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function removeDups(arr) {
  return [...new Set(arr)];
}

function findEndOfUniqueSequence(str, chars) {
  let sequence = str.slice(0, chars);
  if (checkIfArraysEqual(sequence.split(''), removeDups(sequence.split('')))) return chars;
  sequence = sequence.slice(1);
  for (let i = 1; i < str.length; i += 1) {
    sequence += str[i];
    if (checkIfArraysEqual(sequence.split(''), removeDups(sequence.split('')))) return i + 1;
    sequence = sequence.slice(1);
  }
  return -1;
}

/* PART ONE */
function findStartOfPacket(list) {
  const datastream = sanitizeInput(list);

  datastream.forEach((stream) => {
    const start = findEndOfUniqueSequence(stream, 4);
    console.log(' start of packet:', start);
  });
}

findStartOfPacket(input);

/* PART TWO */
function findStartOfMessage(list) {
  const datastream = sanitizeInput(list);

  datastream.forEach((stream) => {
    const start = findEndOfUniqueSequence(stream, 14);
    console.log('start of message:', start);
  });
}

findStartOfMessage(input);
