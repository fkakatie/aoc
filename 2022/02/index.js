import { test, input } from './input.js';

function sanitizeInput(guide) {
  return guide.split('\n').map((p) => p.split(' '));
}

const col1 = {
  A: 'rock', B: 'paper', C: 'scissors',
};

const shape = {
  X: 1,
  Y: 2,
  Z: 3,
  rock: 1,
  paper: 2,
  scissors: 3,
};

const score = {
  lose: 0, draw: 3, win: 6,
};

/* PART ONE */
function calculatePartOneScore(guide) {
  const col2 = {
    X: 'rock', Y: 'paper', Z: 'scissors',
  };

  const rounds = sanitizeInput(guide);
  let totalPoints = 0;
  rounds.forEach((round, i) => {
    const [a, b] = round;
    let points = shape[b];
    const op = col1[a];
    const me = col2[b];
    let outcome;
    if (op === me) outcome = 'draw';
    else if ((op === 'rock' && me === 'paper')
    || (op === 'paper' && me === 'scissors')
    || (op === 'scissors' && me === 'rock')) outcome = 'win';
    else outcome = 'lose';
    points += score[outcome];
    totalPoints += points;
  });

  console.log('points:', totalPoints);
}

calculatePartOneScore(input);

/* PART TWO */
function calculatePartTwoScore(guide) {
  const col2 = {
    X: 'lose', Y: 'draw', Z: 'win',
  };

  const rounds = sanitizeInput(guide);
  let totalPoints = 0;
  rounds.forEach((round, i) => {
    const [a, b] = round;
    const op = col1[a];
    const outcome = col2[b];
    let points = score[outcome];
    let me;
    if (outcome === 'draw') me = shape[op];
    else if (outcome === 'win') {
      if (op === 'rock') me = shape.paper;
      else if (op === 'paper') me = shape.scissors;
      else if (op === 'scissors') me = shape.rock;
    } else if (outcome === 'lose') {
      if (op === 'rock') me = shape.scissors;
      else if (op === 'paper') me = shape.rock;
      else if (op === 'scissors') me = shape.paper;
    }
    points += me;
    totalPoints += points;
  });

  console.log('points:', totalPoints);
}

calculatePartTwoScore(input);
