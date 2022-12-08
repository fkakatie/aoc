import { test, input } from './input.js';

function sanitizeInput(list) {
  return list.split('\n').map((l) => l.split('').map((m) => parseInt(m, 10)));
}

function surveyForest(forest) {
  const numOfRows = forest.length;
  const numOfCols = forest[0].length;
  let numOfVisible = 0;
  forest.forEach((row, rowNum) => { // check row
    row.forEach((tree, colNum) => { // check col
      // trees on the edge of the forest
      if (rowNum === 0
        || rowNum === (numOfRows - 1)
        || colNum === 0
        || colNum === (numOfCols - 1)
      ) numOfVisible += 1; // always visible
      else { // compare tree to others in row
        let visible = false;
        const westTrees = row.slice(0, colNum);
        const eastTrees = row.slice(colNum + 1);
        const westMax = Math.max(...westTrees);
        const eastMax = Math.max(...eastTrees);
        if (tree > westMax || tree > eastMax) visible = true;
        else { // compare tree to others in col
          const col = [];
          forest.forEach((r) => col.push(r[colNum]));
          const northTrees = col.slice(0, rowNum);
          const southTrees = col.slice(rowNum + 1);
          const northMax = Math.max(...northTrees);
          const southMax = Math.max(...southTrees);
          if (tree > northMax || tree > southMax) visible = true;
        }
        if (visible) numOfVisible += 1;
      }
    });
  });
  return numOfVisible;
}

function checkAdjacentTrees(trees, tree) {
  let visibleTrees = 0;
  let i = 0;
  let viewUnobstructed = true;
  while (viewUnobstructed && i < trees.length) {
    // view is obstructed by visible tree
    if (tree <= trees[i]) viewUnobstructed = false;
    visibleTrees += 1;
    i += 1;
  }
  return visibleTrees;
}

function findBestView(forest) {
  const numOfRows = forest.length;
  const numOfCols = forest[0].length;
  let maxScore = 0;
  forest.forEach((row, rowNum) => {
    row.forEach((tree, colNum) => {
      // trees on the edge of the forest
      if (rowNum === 0
        || rowNum === (numOfRows - 1)
        || colNum === 0
        || colNum === (numOfCols - 1)
      // eslint-disable-next-line no-useless-return
      ) return; // score will be 0
      const col = [];
      forest.forEach((r) => col.push(r[colNum]));
      const southTrees = col.slice(rowNum + 1);
      const eastTrees = row.slice(colNum + 1);
      const northTrees = col.slice(0, rowNum);
      const westTrees = row.slice(0, colNum);
      const views = [];

      // check view in all directions
      views.push(checkAdjacentTrees(northTrees.reverse(), tree));
      views.push(checkAdjacentTrees(eastTrees, tree));
      views.push(checkAdjacentTrees(southTrees, tree));
      views.push(checkAdjacentTrees(westTrees.reverse(), tree));

      // calculate scenic score
      const score = views.reduce((a, b) => a * b, 1);
      if (score > maxScore) maxScore = score;
    });
  });
  return maxScore;
}

/* PART ONE */
function countVisibleTrees(list) {
  const forest = sanitizeInput(list);

  const visible = surveyForest(forest);

  console.log('visible trees:', visible);
}

countVisibleTrees(input);

/* PART TWO */
function calculateScenicScore(list) {
  const forest = sanitizeInput(list);

  const score = findBestView(forest);

  console.log(' scenic score:', score);
}

calculateScenicScore(input);
