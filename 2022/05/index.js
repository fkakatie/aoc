/* eslint-disable for-direction */
import { test, input } from './input.js';

function sanitizeInput(list) {
  return list.split('\n\n').map((l) => l.split('\n'));
}

function buildStacks(crates) {
  const numOfStacks = crates.pop().split(' ').filter((c) => c.trim());
  crates.reverse();
  const stacks = {};
  crates.forEach((row) => {
    let i = 0;
    while (row.length) {
      const crate = row.slice(0, 4).replace('[', '').replace(']', '').trim();
      if (!stacks[numOfStacks[i]] && crate) stacks[numOfStacks[i]] = [crate];
      else if (stacks[numOfStacks[i]] && crate) stacks[numOfStacks[i]].push(crate);
      // eslint-disable-next-line no-param-reassign
      row = row.slice(4);
      i += 1;
    }
  });
  return stacks;
}

function writeProcedure(procedure) {
  const instructions = [];
  procedure.forEach((line) => {
    const [, numToMove, , start, , destination] = line.split(' ').map((l) => parseInt(l, 10));
    instructions.push({
      numToMove, start, destination,
    });
  });
  return instructions;
}

function reorganizeOneByOne(stacks, instructions) {
  instructions.forEach((instruction) => {
    const startStack = stacks[instruction.start];
    const endStack = stacks[instruction.destination];
    for (let i = instruction.numToMove; i > 0; i -= 1) {
      const box = startStack.pop();
      endStack.push(box);
    }
  });
  return stacks;
}

function reorganizeMultiStack(stacks, instructions) {
  instructions.forEach((instruction) => {
    const startStack = stacks[instruction.start];
    const endStack = stacks[instruction.destination];
    const { numToMove } = instruction;
    const boxes = startStack.slice(-1 * numToMove);
    startStack.splice(startStack.length - numToMove, numToMove);
    boxes.forEach((box) => endStack.push(box));
  });
  return stacks;
}

/* PART ONE */
function simpleCrateReorg(list) {
  const [crates, procedure] = sanitizeInput(list);
  const stacks = buildStacks(crates);
  const instructions = writeProcedure(procedure);

  const reorganized = reorganizeOneByOne(stacks, instructions);
  let top = '';
  Object.keys(reorganized).forEach((col) => {
    top += reorganized[col].pop();
  });
  console.log('crates on top:', top);
}

simpleCrateReorg(input);

/* PART TWO */
function multiCrateReorg(list) {
  const [crates, procedure] = sanitizeInput(list);
  const stacks = buildStacks(crates);
  const instructions = writeProcedure(procedure);

  const reorganized = reorganizeMultiStack(stacks, instructions);
  let top = '';
  Object.keys(reorganized).forEach((col) => {
    top += reorganized[col].pop();
  });
  console.log('crates on top:', top);
}

multiCrateReorg(input);
