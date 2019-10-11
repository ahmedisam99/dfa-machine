const chalk = require('chalk');
const { machineSchema, sigmaSchema, stringSchema } = require('./validation');

module.exports = class DFA {
  constructor(sigma, machineObj) {
    const { error: sigmaErr, value: _sigma } = sigmaSchema.validate(sigma);
    if (sigmaErr) throw new Error(sigmaErr.details[0].message);

    const { error: machineErr, value: _machineObj } = machineSchema(
      _sigma,
    ).validate(machineObj);
    if (machineErr) throw new Error(machineErr.details[0].message);

    const { states, initial, final } = _machineObj;

    this.states = states;
    this.initialState = initial;
    this.currentState = initial;
    this.finalStates = final;
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

    const { error: stringErr, value: _string } = stringSchema.validate(string);

    if (stringErr) throw new Error(stringErr.details[0].message);

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
    const state = chalk.yellow(this.currentState);
    let status;

    process.stdout.write(`Machine's current state: ${state}`);
    if (this.getStatus() === 'Fail') status = chalk.red('Fail');
    else status = chalk.green('Valid');
    process.stdout.write(`\n${chalk.dim('Status:')} ${status}\n\n`);
  }

  getStatus() {
    return this.finalStates.find(state => state === this.currentState)
      !== undefined
      ? 'Sucess'
      : 'Fail';
  }
};
