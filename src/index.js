const chalk = require('chalk');
const joi = require('@hapi/joi');
const machineSchema = require('./machineSchema');

module.exports = class DFA {
  constructor(machineObj) {
    const { error, value } = machineSchema.validate(machineObj);

    if (error) throw new Error(error.details[0].message);

    const {
      states, initial, final, inputs,
    } = value;

    this.states = states;
    this.initialState = initial;
    this.currentState = initial;
    this.finalState = final;
    this.sigma = inputs;

    this.resetState = this.resetState.bind(this);
    this.setState = this.setState.bind(this);
    this.transition = this.transition.bind(this);
    this.validate = this.validate.bind(this);
    this.printStatus = this.printStatus.bind(this);
    this.getStatus = this.getStatus.bind(this);
  }

  resetState() {
    this.currentState = this.initialState;
  }

  setState(newState) {
    this.currentState = newState;
  }

  transition(currentState, input) {
    return this.states[currentState].on[input];
  }

  validate(inputString = '') {
    this.resetState();

    const { error, value } = joi
      .string()
      .allow('')
      .validate(inputString);

    if (error) {
      throw new Error(error.details[0].message);
    }

    if (!value) {
      return {
        printStatus: this.printStatus,
        currentState: this.currentState,
        status: this.getStatus(),
      };
    }

    const { setState, transition } = this;

    value.split('').forEach((input) => {
      const validInput = this.sigma.find(
        (allowedInput) => String(allowedInput) === input,
      );

      if (validInput === undefined) {
        throw new Error(`Invalid input "${input}"`);
      }

      setState(transition(this.currentState, validInput));
    });

    return {
      printStatus: this.printStatus,
      currentState: this.currentState,
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
