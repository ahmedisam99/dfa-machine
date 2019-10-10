const chalk = require('chalk');
const machineSchema = require('./machineSchema');

module.exports = class DFA {
  constructor(machineObj) {
    const { error, value } = machineSchema.validate(machineObj);

    if (error) throw new Error(error.details[0].message);

    const { states, initial, final } = value;

    this.states = states;
    this.initialState = initial;
    this.currentState = initial;
    this.finalState = final;

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

  validate(inputString) {
    this.resetState();

    const { setState, transition } = this;

    for (const input of inputString) {
      if (input !== '0' && input !== '1')
        throw new Error(`Invalid input "${input}"`);

      setState(transition(this.currentState, input));
    }

    return {
      printStatus: this.printStatus,
      currentState: this.currentState,
      status: this.getStatus(),
    };
  }

  printStatus() {
    let state = chalk.magenta(this.currentState),
      status;

    console.log(`\nMachine's current state: ${state}`);
    if (this.currentState !== this.finalState) status = chalk.red('Fail');
    else status = chalk.green('Valid');
    console.log(`${chalk.yellow('Status:')} ${status}`);
  }

  getStatus() {
    return this.currentState === this.finalState ? 'Sucess' : 'Fail';
  }
};
