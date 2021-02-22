const match = require('../utilities/match');

module.exports = class InsulinDeliveryScreen {
  constructor(language) {
    this.language = language;
  }

  get BackToHomeScreenButton() {
    return match.accessible.ButtonBarButton(this.language.InsulinDeliveryScreen.Back);
  }

  get BolusEvent() {
    return match.Label(this.language.InsulinDeliveryScreen.BolusEvent);
  }

  get InterruptedBolusEvent() {
    return match.Label(this.language.InsulinDeliveryScreen.InterruptedBolusEvent);
  }
};
