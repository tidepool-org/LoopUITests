const match = require('../utilities/match');

module.exports = class SimpleBolusCalcScreen {
  constructor(language) {
    this.language = language;
  }

  get SimpleBolusCalcHeader() {
    return match.accessible.Header(this.language.SimpleBolusCalculatorScreen.Header);
  }

  get CurrentGlucoseEntryField() {
    return match.UITextField().atIndex(0);
  }

  get DoneButton() {
    return match.accessible.ButtonBarButton(this.language.SimpleBolusCalculatorScreen.Done);
  }

  get SaveAndDeliverButton() {
    return match.accessible.Button(this.language.SimpleBolusCalculatorScreen.SaveAndDeliver);
  }
};
