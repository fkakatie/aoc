/* eslint-disable no-param-reassign */
import { test as testInput, input } from './input.js';

function sanitizeInput(list) {
  const m = [];
  const monkeys = list.split('\n\n');
  monkeys.forEach((monkey, num) => {
    const [, i, o, t, iT, iF] = monkey.split('\n').map((monke) => monke.trim());
    const items = i.split(': ')[1].split(' ').map((item) => parseInt(item.trim(), 10));
    const obj = { num, items, inspections: 0 };
    // setup operation
    const [a, op, b] = o.split('= ')[1].split(' ');
    if (op === '+') {
      if (b === 'old') {
        obj.operation = (val) => val + val;
      } else {
        obj.operation = (val) => val + parseInt(b, 10);
      }
    } else if (op === '*') {
      if (b === 'old') {
        obj.operation = (val) => val * val;
      } else {
        obj.operation = (val) => val * parseInt(b, 10);
      }
    }
    // setup test
    const test = parseInt(t.split(' ').pop(), 10);
    const ifTrue = parseInt(iT.split(' ').pop(), 10);
    const ifFalse = parseInt(iF.split(' ').pop(), 10);
    obj.test = (val) => {
      if (val % test === 0) return ifTrue;
      return ifFalse;
    };
    m.push(obj);
  });
  return m;
}

function sort(arr) {
  return arr.sort((a, b) => b.inspections - a.inspections);
}

function throwItems(monkeys, rounds, commonDenominator = null) {
  for (let i = 1; i <= rounds; i += 1) {
    monkeys.forEach((monkey) => {
      monkey.items.forEach((item) => {
        // monkey inspects item, worry level changes
        if (commonDenominator) item %= commonDenominator;
        monkey.inspections += 1;
        const newWorryLevel = !commonDenominator
          ? Math.floor(monkey.operation(item) / 3)
          : Math.floor(monkey.operation(item));
        // monkey tosses item to new monkey
        monkey.items = monkey.items.slice(1);
        const throwTo = monkey.test(newWorryLevel);
        monkeys[throwTo].items.push(newWorryLevel);
      });
    });
  }
  return monkeys;
}

function calculateMonkeyBusiness(monkeys) {
  const twoMostActive = sort(monkeys).slice(0, 2);
  return twoMostActive[0].inspections * twoMostActive[1].inspections;
}

function calculateCommonDenominator(monkeys) {
  let denominator = 0;
  monkeys.split('\n\n').forEach((monkey) => {
    const divisibleBy = parseInt(monkey.split('divisible by')[1].split(' ').slice(1, 2)[0].trim(), 10);
    if (denominator === 0) denominator += divisibleBy;
    else denominator *= divisibleBy;
  });
  return denominator;
}

/* PART ONE */
function throwWithRelief(list) {
  const monkeys = sanitizeInput(list);
  const rounds = 20;

  const monkeysAfterThrowing = throwItems(monkeys, rounds);
  const monkeyBusiness = calculateMonkeyBusiness(monkeysAfterThrowing);

  console.log(`   monkey business after ${rounds} rounds:`, monkeyBusiness);
}

throwWithRelief(input);

/* PART TWO */
function throwWithoutRelief(list) {
  const monkeys = sanitizeInput(list);
  const rounds = 10000;

  const commonDenominator = calculateCommonDenominator(list);
  const monkeysAfterThrowing = throwItems(monkeys, rounds, commonDenominator);
  const monkeyBusiness = calculateMonkeyBusiness(monkeysAfterThrowing);

  console.log(`monkey business after ${rounds} rounds:`, monkeyBusiness);
}

throwWithoutRelief(input);
