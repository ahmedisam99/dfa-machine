const joi = require('@hapi/joi');

module.exports = joi.object({
  initial: joi.string().required(),
  final: joi.string().required(),
  states: joi
    .object()
    .pattern(
      /[a-zA-Z0-9]/,
      joi.object({ on: joi.object().pattern(/[a-zA-Z0-9]/, joi.string()) }),
    )
    .required(),
});
