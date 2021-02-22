const match = require('../utilities/match');

module.exports = class LoopSettingsScreen {
  constructor(language) {
    this.language = language;
  }

  get ClosedLoopToggle() {
    return match.accessible.SwitchButton(this.language.LoopSettingsScreen.ClosedLoop);
  }

  get DoneButton() {
    return match.accessible.Button(this.language.LoopSettingsScreen.Done);
  }
};
