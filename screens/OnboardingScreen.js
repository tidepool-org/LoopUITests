const match = require('../utilities/match');

module.exports = class OnboardingScreen {
  constructor(language) {
    this.language = language;
  }

  get CancelButton() {
    return match.Label(this.language.OnboardingScreen.Cancel);
  }
};
