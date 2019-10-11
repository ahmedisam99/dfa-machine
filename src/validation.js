const joi = require('@hapi/joi');

exports.sigmaSchema = joi
  .array()
  .items(joi.string(), joi.number(), joi.boolean())
  .required()
  .label('sigma');

exports.machineSchema = sigma => joi.object({
  initial: joi.string().required(),
  final: joi.string().required(),
  states: joi
    .object()
    .pattern(
      /[a-zA-Z0-9-_]/,
      joi.object({
        on: joi
          .object()
          .pattern(/[a-zA-Z0-9]/, joi.string())
          .length(sigma.length),
      }),
    )
    .required(),
});
