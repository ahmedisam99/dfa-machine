const joi = require('@hapi/joi');

module.exports = joi.object({
  initial: joi.string().required(),
  final: joi.string().required(),
  inputs: joi
    .array()
    .items(joi.string(), joi.number())
    .required(),
  states: joi
    .object()
    .pattern(
      /[a-zA-Z0-9]/,
      joi.object({ on: joi.object().pattern(/[a-zA-Z0-9]/, joi.string()) }),
    )
    .required(),
});

// const dfa = new DFA({
//   initial: 'initial',
//   final: 'even',
//   states: {
//     initial: { on: { 0: 'initial', 1: 'odd' } },
//     even: { on: { 0: 'even', 1: 'odd' } },
//     odd: { on: { 0: 'odd', 1: 'even' } },
//   },
// });
