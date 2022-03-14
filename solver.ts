const operators = ['+', '-', '*', '/'] as const;
type Operator = typeof operators[number];

interface OpNode {
  left: OpNode | number;
  right: OpNode | number;
  operator: Operator;
}

interface Fraction {
  // p / q
  p: number;  // numerator
  q: number;  // denominator
}

const isValidFraction = (f: Fraction) => f.q !== 0;
const isZeroFraction = (f: Fraction) => f.p === 0;
const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);

const reduce = (f: Fraction): Fraction => {
  if (!isValidFraction(f)) {
    throw new Error(`${f.p} / ${f.q} is invalid fraction`);
  }
  let {p, q} = f;
  const g = gcd(p, q);
  p /= g;
  q /= g;
  if (q < 0) {
    p *= -1;
    q *= -1;
  }
  return {p, q};
};

const add = (f1: Fraction, f2: Fraction): Fraction => {
  return reduce({
    p: f1.p * f2.q + f1.q * f2.p,
    q: f1.q * f2.q,
  });
};

const sub = (f1: Fraction, f2: Fraction): Fraction => {
  return reduce({
    p: f1.p * f2.q - f1.q * f2.p,
    q: f1.q * f2.q,
  });
};

const mul = (f1: Fraction, f2: Fraction): Fraction => {
  return reduce({
    p: f1.p * f2.p,
    q: f1.q * f2.q,
  });
};

const div = (f1: Fraction, f2: Fraction): Fraction => {
  return reduce({
    p: f1.p * f2.q,
    q: f1.q * f2.p,
  });
};

const isSameFraction = (f1: Fraction, f2: Fraction) => isZeroFraction(sub(f1, f2));

const operatorMap = {
  '+': add,
  '-': sub,
  '*': mul,
  '/': div,
} as const;

const number2Fraction = (n: number): Fraction => ({p: n, q: 1});

const evalNode = (node: OpNode | number): Fraction => {
  if (typeof node === 'number') {
    return number2Fraction(node);
  } else {
    return operatorMap[node.operator](evalNode(node.left), evalNode(node.right));
  }
};

const solve10puzzleFixedOrder = (n1: number, n2: number, n3: number, n4: number): OpNode[] => {
  // console.log(n1, n2, n3, n4);
  const ten: Fraction = number2Fraction(10);
  const answers: OpNode[] = [];

  for (const op1 of operators) {
    for (const op2 of operators) {
      for (const op3 of operators) {
        // ( n1 op1 n2 ) op2 ( n3 op3 n4 )
        const node1 = {
          left: {
            left: n1,
            right: n2,
            operator: op1,
          },
          right: {
            left: n3,
            right: n4,
            operator: op3,
          },
          operator: op2,
        };

        // ( ( n1 op1 n2 ) op2 n3 ) op3 n4 
        const node2: OpNode = {
          left: {
            left: {
              left: n1,
              right: n2,
              operator: op1,
            },
            right: n3,
            operator: op2,
          },
          right: n4,
          operator: op3,
        };

        // n1 op1 ( n2 op2 ( n3 op3 n4 ) )
        const node3: OpNode = {
          left: n1,
          right: {
            left: n2,
            right: {
              left: n3,
              right: n4,
              operator: op3,
            },
            operator: op2,
          },
          operator: op1,
        }

        for (const node of [node1, node2, node3]) {
          try {
            if (isSameFraction(evalNode(node), ten)) {
              answers.push(node);
            }
          } catch (e) {
          }
        }
      }
    }
  }
  return answers;
};

const is4Num = (nums: number[]): nums is [number, number, number, number] => nums.length === 4;

const solve10puzzle_ = (accum: number[], rest: number[]): OpNode[] => {
  if (rest.length === 0) {
    if (!is4Num(accum)) {
      throw Error();
    }
    return solve10puzzleFixedOrder(...accum);
  } else {
    const answers: OpNode[] = [];
    for (let i = 0; i < rest.length; i++) {
      const tmpAnswers = solve10puzzle_([...accum, rest[i]], [...rest.slice(0, i), ...rest.slice(i + 1)]);
      answers.push(...tmpAnswers);
    }
    return answers;
  }
};

const solve10puzzle = (n1: number, n2: number, n3: number, n4: number): OpNode[] => {
  return solve10puzzle_([], [n1, n2, n3, n4]);
};

const operatorPriorityMap = {
  '+': 1,
  '-': 1,
  '*': 2,
  '/': 2,
} as const;

const node2String = (node: OpNode | number): string => {
  if (typeof node === 'number') {
    return String(node);
  } else {
    const {left, right, operator} = node;
    let leftString = node2String(left);
    if (typeof left !== 'number' && operatorPriorityMap[left.operator] < operatorPriorityMap[operator]) {
      leftString = `( ${leftString} )`;
    }

    let rightString = node2String(right);
    if (typeof right !== 'number' && operatorPriorityMap[right.operator] <= operatorPriorityMap[operator]) {
      rightString = `( ${rightString} )`;
    }

    return `${leftString} ${operator} ${rightString}`;
  }
};

export {
  solve10puzzle,
  node2String,
}

export type {
  OpNode,
}
