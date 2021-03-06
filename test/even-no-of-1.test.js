const tape = require('tape');
const DFA = require('../src');

tape("Testing DFA to validate strings on {0, 1} with even number of 1's", t => {
  const dfa = new DFA([0, 1], {
    initial: 'initial',
    final: ['even'],
    states: {
      initial: { on: { 0: 'initial', 1: 'odd' } },
      even: { on: { 0: 'even', 1: 'odd' } },
      odd: { on: { 0: 'odd', 1: 'even' } },
    },
  });

  t.equal(dfa.validate('').status, 'Fail', '#0 should fail');
  t.equal(dfa.validate('01010101101').status, 'Valid', '#1 should success');
  t.equal(dfa.validate('00010100100').status, 'Fail', '#2 should fail');
  t.equal(dfa.validate('01010100001').status, 'Valid', '#3 should success');
  t.equal(dfa.validate('11010111000').status, 'Valid', '#4 should success');
  t.equal(dfa.validate('11001011110').status, 'Fail', '#5 should fail');
  t.equal(dfa.validate('00101010001').status, 'Valid', '#6 should success');
  t.equal(dfa.validate('11101000101').status, 'Valid', '#7 should success');
  t.equal(dfa.validate('11000000100').status, 'Fail', '#8 should fail');
  t.equal(dfa.validate('00000011101').status, 'Valid', '#9 should success');
  t.equal(dfa.validate('10010101111').status, 'Fail', '#10 should fail');
  t.equal(dfa.validate('11110011000').status, 'Valid', '#11 should success');
  t.equal(dfa.validate('11011001101').status, 'Fail', '#12 should fail');

  t.end();
});
