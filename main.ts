import {
  solve10puzzle,
  node2String,
} from './solver';


const problems: [number, number, number, number][] = [
  [1, 2, 3, 4],
  [2, 2, 3, 3],
  [1, 1, 5, 8],
  [9, 9, 9, 9],
  [1, 1, 1, 1],
];

for (let i = 0; i < 10; i++) {
  problems.push(
    [
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
    ]
  );
}

problems.forEach(problem => {
  const node = solve10puzzle(...problem);
  let msg: string;
  if (node === null) {
    msg = `can not solve ${problem.join(' ')}`;
  } else {
    msg = `${node2String(node)}`;
  }
  console.log(msg);
});
