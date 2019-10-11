/*
  Question: Construct a DFA that accepts strings over {a,b}
            that does not contain the sub-string 'aabb' in it
            L = {w: w ∈ {a,b}*, aabb ∉ w}
            Σ = {a,b}
*/

const DFA = require('../src');

const sigma = ['a', 'b'];

const dfa = new DFA(sigma, {
  initial: 'A',
  final: ['A', 'B', 'C', 'D'],
  states: {
    A: { on: { a: 'B', b: 'A' } },
    B: { on: { a: 'C', b: 'A' } },
    C: { on: { a: 'C', b: 'D' } },
    D: { on: { a: 'B', b: 'E' } },
    E: { on: { a: 'E', b: 'E' } },
  },
});

dfa.validate('').printStatus(); // expected: sucess
dfa.validate('aabaabaabbb').printStatus(); // expected: fail
dfa.validate('aaaaaaaababbbbbbba').printStatus(); // expected: sucess
dfa.validate('bbbbbbbbbbbbbabaaaaaaaaaababbbbbbbbbbaabb').printStatus(); // expected: sucess
