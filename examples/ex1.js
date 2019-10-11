/*
  Question: Construct a DFA that accepts strings over {0,1}
            that only contains even number of 1's
            L = {w: w ∈ {0,1}*, n0(w) mod 2 = 0}
            Σ = {0,1}
*/

const DFA = require('../src');

const sigma = [0, 1];

const dfa = new DFA(sigma, {
  initial: 'initial',
  final: ['even'],
  states: {
    initial: { on: { 0: 'initial', 1: 'odd' } },
    even: { on: { 0: 'even', 1: 'odd' } },
    odd: { on: { 0: 'odd', 1: 'even' } },
  },
});

dfa.validate('01010101101').printStatus();
dfa.validate('00010100100').printStatus();
dfa.validate('01010100001').printStatus();
dfa.validate('11010111000').printStatus();
dfa.validate('11001011110').printStatus();
dfa.validate('00101010001').printStatus();
dfa.validate('11101000101').printStatus();
dfa.validate('11000000100').printStatus();
dfa.validate('00000011101').printStatus();
dfa.validate('10010101111').printStatus();
dfa.validate('11110011000').printStatus();
dfa.validate('11011001101').printStatus();
