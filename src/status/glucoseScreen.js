const match = require('../match');

const base = require('../base/index');

class GlucoseScreen extends base.Screen {
  constructor(language) {
    super({
      screenText: language.statusScreen.GlucoseScreen,
      generalText: language.general,
      header: {
        backLabel: language.general.Status,
      },
      open: {
        isBtn: false,
        label: language.statusScreen.GlucoseScreen.Glucose,
      },
    });
  }

  get CarbohydratesLabel() {
    return match.accessible.ClickableLabel(this.screenText.Carbohydrates);
  }

  get InsulinLabel() {
    return match.accessible.ClickableLabel(this.screenText.Insulin);
  }

  get GlucoseMomentumLabel() {
    return match.accessible.ClickableLabel(this.screenText.GlucoseMomentum);
  }

  get RetrospectiveCorrectionLabel() {
    return match.accessible.ClickableLabel(this.screenText.RetrospectiveCorrection);
  }

  async SetInsulin(turnOn) {
    if (turnOn === null) {
      return;
    }
    let allReadyOn = await this.IsButtonOn(this.InsulinLabel);
    if (turnOn === true) {
      if (allReadyOn === false) {
        await this.InsulinLabel.tap();
      }
    } else if (turnOn === false) {
      if (allReadyOn === true) {
        await this.InsulinLabel.tap();
      }
    }
  }
}

module.exports = GlucoseScreen;
