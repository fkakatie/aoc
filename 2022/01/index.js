import { test, input } from './input.js';

function sanitizeInput(list) {
  return list.split('\n\n').map((p) => p.split('\n').map((i) => parseInt(i, 10)));
}

function sum(arr) {
  return arr.reduce((a, b) => a + b, 0);
}

function sort(arr) {
  return arr.sort((a, b) => a - b);
}

/* PART ONE */
function findMax(list) {
  const caloriesPer = sanitizeInput(list);

  const max = { calories: 0, elf: 0 };
  caloriesPer.forEach((perElf, i) => {
    const calories = sum(perElf);
    if (calories >= max.calories) {
      max.calories = calories;
      max.elf = i + 1;
    }
  });
  console.log('  max:', max.calories, 'calories');
}

findMax(input);

/* PART TWO */
function findTopThree(list) {
  const caloriesPer = sanitizeInput(list);

  let topThree = [];
  caloriesPer.forEach((perElf) => {
    const calories = sum(perElf);
    if (topThree.length < 3 || topThree.find((v) => v < calories)) {
      topThree.push(calories);
      sort(topThree);
      topThree = topThree.slice(-3);
    }
  });
  console.log('top 3:', sum(topThree), 'calories');
}

findTopThree(input);
