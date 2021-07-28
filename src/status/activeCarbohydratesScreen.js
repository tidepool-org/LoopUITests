const match = require('../match');
const base = require('../base/index');

class ActiveCarbohydratesScreen extends base.Screen {
  constructor(language) {
    super({
      screenText: language.screenText,
      generalText: language.generalText,
      header: {
        backLabel: language.generalText.Status,
      },
      open: {
        isBtn: false,
        label: language.screenText.ActiveCarbohydrates,
      },
    });
  }

  // TODO: not accessible
  get Header() {
    return match.Label(this.screenText.Header);
  }

  get GramsActiveCarbsLabel() {
    return match.Label(this.screenText.GramsActiveCarbs);
  }

  get GramsTotalCarbsLabel() {
    return match.Label(this.screenText.GramsTotalCarbs);
  }

  get GlucoseChangeLabel() {
    return match.Label(this.screenText.GlucoseChange);
  }

  get ObservedLabel() {
    return match.Label(this.screenText.Observed);
  }

  get PredictedLabel() {
    return match.Label(this.screenText.Predicted);
  }
}

module.exports = {
  Screen: ActiveCarbohydratesScreen,
};
