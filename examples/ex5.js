/*
  Question: L = {w: w ∈ {a,b}*, w contains no runs of length less than 4}
            Σ = {a,b}

  Illustration: A run in a string is a substring of lenght at least two,
                as long as possible, and consists entirely of the same
                symbol. For instance the string 'abbbaab' contains one run
                of b's of lenght 3 and one run of a's of length 2.
*/

const DFA = require('../src');

const sigma = ['a', 'b'];

const machineObj = {
  initial: 'q0',
  final: ['q0', 'a1', 'b1', 'a4', 'b4'],
  states: {
    q0: { on: { a: 'a1', b: 'b1' } },
    a1: { on: { a: 'a2', b: 'b1' } },
    a2: { on: { a: 'a3', b: 'dead' } },
    a3: { on: { a: 'a4', b: 'dead' } },
    a4: { on: { a: 'a4', b: 'b1' } },
    b1: { on: { a: 'a1', b: 'b2' } },
    b2: { on: { a: 'dead', b: 'b3' } },
    b3: { on: { a: 'dead', b: 'b4' } },
    b4: { on: { a: 'a1', b: 'b4' } },
    dead: { on: { a: 'dead', b: 'dead' } },
  },
};

const dfa = new DFA(sigma, machineObj);

dfa.validate('').printStatus(); // valid
dfa.validate('a').printStatus(); // valid
dfa.validate('ab').printStatus(); // valid
dfa.validate('abab').printStatus(); // valid
dfa.validate('aaaaabbbb').printStatus(); // valid
dfa.validate('aaaaabbbbaa').printStatus(); // not valid
dfa.validate('aa').printStatus(); // not valid
dfa.validate('bb').printStatus(); // not valid
dfa.validate('aabbbbbb').printStatus(); // not valid
