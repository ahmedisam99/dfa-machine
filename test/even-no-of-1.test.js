const tape = require('tape');
const DFA = require('../src');

tape("Testing DFA to validate strings on {0, 1} with even number of 1's", t => {
  const dfa = new DFA({
    initial: 'initial',
    final: 'even',
    states: {
      initial: { on: { 0: 'initial', 1: 'odd' } },
      even: { on: { 0: 'even', 1: 'odd' } },
      odd: { on: { 0: 'odd', 1: 'even' } },
    },
  });

  t.equal(dfa.validate('').status, 'Fail', '#0 should fail');
  t.equal(dfa.validate('01010101101').status, 'Sucess', '#1 should sucess');
  t.equal(dfa.validate('00010100100').status, 'Fail', '#2 should fail');
  t.equal(dfa.validate('01010100001').status, 'Sucess', '#3 should sucess');
  t.equal(dfa.validate('11010111000').status, 'Sucess', '#4 should sucess');
  t.equal(dfa.validate('11001011110').status, 'Fail', '#5 should fail');
  t.equal(dfa.validate('00101010001').status, 'Sucess', '#6 should sucess');
  t.equal(dfa.validate('11101000101').status, 'Sucess', '#7 should sucess');
  t.equal(dfa.validate('11000000100').status, 'Fail', '#8 should fail');
  t.equal(dfa.validate('00000011101').status, 'Sucess', '#9 should sucess');
  t.equal(dfa.validate('10010101111').status, 'Fail', '#10 should fail');
  t.equal(dfa.validate('11110011000').status, 'Sucess', '#11 should sucess');
  t.equal(dfa.validate('11011001101').status, 'Fail', '#12 should fail');

  t.end();
});
