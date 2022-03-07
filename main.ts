import {
  solve10puzzle,
  node2String,
} from './solver';


const nextProblem = () => {
  let answers = [];
  let problem: [number, number, number, number];
  while (answers.length === 0) {
    problem = [
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
    ];
    answers = solve10puzzle(...problem);
  }
  const answerStrings = new Set(answers.map(node2String));

  const probDiv = document.getElementById('problem');
  probDiv.textContent = problem.join(' ');

  const ansElem = document.getElementById('answer');
  ansElem.style.display = 'none';

  while (ansElem.firstChild) {
    ansElem.removeChild(ansElem.firstChild);
  }

  answerStrings.forEach((ansString) => {
    const newElem = document.createElement('li');
    newElem.textContent = ansString;
    ansElem.appendChild(newElem);
  });

};

const showAnswer = () => {
  const div = document.getElementById('answer');
  div.style.display = 'block';
};

document.getElementById('show-answer').addEventListener('click', () => {
  showAnswer();
});

document.getElementById('next-problem').addEventListener('click', () => {
  nextProblem();
});

// for first problem
nextProblem();
