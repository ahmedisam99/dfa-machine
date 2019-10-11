/*
  Question: Construct a DFA that recognizes all strings over {0,1}
            if and only if the value of the string interpreted as
            a binary representation of an integer which is zero
            modulo five (e.g. ((0101 = 5) % 5 = 0) is accepted)
*/

const DFA = require('../src');

const sigma = [0, 1];

const dfa = new DFA(sigma, {
  initial: 'm0',
  final: ['m0'],
  states: {
    m0: { on: { 0: 'm0', 1: 'm1' } },
    m1: { on: { 0: 'm2', 1: 'm3' } },
    m2: { on: { 0: 'm4', 1: 'm0' } },
    m3: { on: { 0: 'm1', 1: 'm2' } },
    m4: { on: { 0: 'm3', 1: 'm4' } },
  },
});

dfa.validate('0101').printStatus(); // = 5 expected: sucess
dfa.validate('1111').printStatus(); // = 15 expected: sucess
dfa.validate('1000').printStatus(); // = 8 expected: fail, state: m3
dfa.validate('1010').printStatus(); // = 10 expected: sucess
dfa.validate('11000').printStatus(); // = 24 expected: fail, state: m4
dfa.validate('11010').printStatus(); // = 26 expected: fail, state: m1
dfa.validate('11001').printStatus(); // = 25 expected: sucess
dfa.validate('11110000011').printStatus(); // = 1923 expected: fail, state: m3
dfa.validate('110101110010000000110').printStatus(); // = 1,762,310 expected: sucess
dfa.validate('1000011001110100000111101').printStatus(); // = 17,623,101 expected: fail, state: m1
