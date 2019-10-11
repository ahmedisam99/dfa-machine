const chalk = require('chalk');
const joi = require('@hapi/joi');
const { machineSchema, sigmaSchema } = require('./validation');

module.exports = class DFA {
  constructor(sigma, machineObj) {
    const { error: sigmaError, value: _sigma } = sigmaSchema.validate(sigma);
    if (sigmaError) throw new Error(sigmaError.details[0].message);

    const { error: machineError, value: _machineObj } = machineSchema(
      _sigma,
    ).validate(machineObj);
    if (machineError) throw new Error(machineError.details[0].message);

    const { states, initial, final } = _machineObj;

    this.states = states;
    this.initialState = initial;
    this.currentState = initial;
    this.finalState = final;
    this.sigma = _sigma;

    this.resetState = this.resetState.bind(this);
    this.transition = this.transition.bind(this);
    this.validate = this.validate.bind(this);
    this.printStatus = this.printStatus.bind(this);
    this.getStatus = this.getStatus.bind(this);
  }

  resetState() {
    this.currentState = this.initialState;
  }

  transition(currentState, input) {
    this.currentState = this.states[currentState].on[input];
  }

  validate(string = '') {
    this.resetState();

    const { error, value: _string } = joi
      .string()
      .allow('')
      .validate(string);

    if (error) throw new Error(error.details[0].message);

    if (!_string) {
      return {
        printStatus: this.printStatus,
        state: this.currentState,
        status: this.getStatus(),
      };
    }

    const { transition } = this;

    _string.split('').forEach(_input => {
      const input = this.sigma.find(
        allowedInput => String(allowedInput) === _input,
      );

      if (input === undefined) throw new Error(`Invalid input "${_input}"`);

      transition(this.currentState, input);
    });

    return {
      printStatus: this.printStatus,
      state: this.currentState,
      status: this.getStatus(),
    };
  }

  printStatus() {
    const state = chalk.magenta(this.currentState);
    let status;

    process.stdout.write(`\n\nMachine's current state: ${state}`);
    if (this.currentState !== this.finalState) status = chalk.red('Fail');
    else status = chalk.green('Valid');
    process.stdout.write(`\n${chalk.yellow('Status:')} ${status}`);
  }

  getStatus() {
    return this.currentState === this.finalState ? 'Sucess' : 'Fail';
  }
};
