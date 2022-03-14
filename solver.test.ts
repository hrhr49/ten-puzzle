import {
  solve10puzzle,
  node2String,
} from './solver';

test('test-solver', () => {
  const problems: [number, number, number, number][] = [];
  for (let i = 0; i < 10; i++) {
    for (let j = i; j < 10; j++) {
      for (let k = j; k < 10; k++) {
        for (let l = k; l < 10; l++) {
          problems.push([i, j, k, l]);
        }
      }
    }
  }
  problems.forEach((problem) => {
    const answers = solve10puzzle(...problem);
    const answerStrings: string[] = [...new Set(answers.map(node2String))];
    answerStrings.forEach((answerString) => {
      expect(eval(answerString)).toBeCloseTo(10);
    });
  });
});
