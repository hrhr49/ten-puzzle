import {
  solve10puzzle,
  node2String,
} from './solver';

import type {
  OpNode,
} from './solver';

const getElemById = (id: string): HTMLElement => {
  const elem = document.getElementById(id);
  if (elem == null) throw Error(`id: ${id} is not found`);
  return elem;
};

const probElem = getElemById('problem');
const ansAreaElem = getElemById('answer-area');
const ansElem = getElemById('answer');
const allAnsElem = getElemById('all-answer');

const ansBtnElem = getElemById('answer-btn');
const nextBtnElem = getElemById('next-btn');

const nextProblem = () => {
  let answers: OpNode[] = [];
  let problem: [number, number, number, number] = [0, 0, 0, 0];

  while (answers.length === 0) {
    problem = [
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
    ];
    answers = solve10puzzle(...problem);
  }
  const answerStrings: string[] = [...new Set(answers.map(node2String))];

  probElem.textContent = problem.join(' ');

  ansAreaElem.style.display = 'none';
  ansAreaElem.removeAttribute('open');

  ansElem.textContent = answerStrings[0];

  while (allAnsElem.firstChild) {
    allAnsElem.removeChild(allAnsElem.firstChild);
  }

  answerStrings.forEach((ansString) => {
    const newElem = document.createElement('li');
    newElem.textContent = ansString;
    allAnsElem.appendChild(newElem);
  });

};

ansBtnElem.addEventListener('click', () => {
  ansAreaElem.style.display = 'block';
});

nextBtnElem.addEventListener('click', () => {
  nextProblem();
});

// for first problem
nextProblem();
