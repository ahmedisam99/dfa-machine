/*
  Question: Construct a DFA that recognizes all strings over {a,b}
            that begins with the sub-string 'ba'
            L = { baw: w ∈ {a,b}* }
            Σ = {a,b}
*/

const DFA = require('../src');

const sigma = ['a', 'b'];

const dfa = new DFA(sigma, {
  initial: 'q0',
  final: ['q2'],
  states: {
    q0: { on: { a: 'q3', b: 'q1' } },
    q1: { on: { a: 'q2', b: 'q3' } },
    q2: { on: { a: 'q2', b: 'q2' } },
    q3: { on: { a: 'q3', b: 'q3' } },
  },
});

dfa.validate('').printStatus(); // expected: fail
dfa.validate('abababababa').printStatus(); // expected: fail
dfa.validate('baaababababa').printStatus(); // expected: sucess
dfa.validate('abababaabbbbba').printStatus(); // expected: fail
dfa.validate('bba').printStatus(); // expected: fail
dfa.validate('b').printStatus(); // expected: fail
dfa.validate('ba').printStatus(); // expected: sucess
