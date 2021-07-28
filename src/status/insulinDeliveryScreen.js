const match = require('../match');
const base = require('../base/index');

class InsulinDeliveryScreen extends base.Screen {
  constructor(language) {
    super({
      screenText: language.screenText,
      generalText: language.generalText,
      header: {
        backLabel: language.generalText.Status,
      },
      open: {
        isBtn: false,
        label: language.screenText.Header,
      },
    });
  }

  get Header() {
    return match.Label(this.screenText.Header);
  }

  get IOBLabel() {
    return match.Label(this.screenText.IOB);
  }

  get TotalLabel() {
    return match.Label(this.screenText.Total);
  }

  get EventHistoryLabel() {
    return match.Label(this.screenText.EventHistory).atIndex(0);
  }

  get ReservoirLabel() {
    return match.Label(this.screenText.Reservoir).atIndex(0);
  }
}

module.exports = {
  Screen: InsulinDeliveryScreen,
};
