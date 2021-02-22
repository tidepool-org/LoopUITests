const match = require('../utilities/match');

module.exports = class BolusCalcScreen {
  constructor(language) {
    this.language = language;
  }

  get BolusCalcHeader() {
    return match.accessible.Header(this.language.BolusCalculatorScreen.Header);
  }

  get BolusTextField() {
    return match.UITextField();
  }

  get DeliverButton() {
    return match.accessible.Button(this.language.BolusCalculatorScreen.Deliver);
  }
};
