const match = require('../match');
const entry = require('./entryScreen');

class EntriesScreen extends entry.Screen {
  constructor(parentScreen, config) {
    super(parentScreen);
    this.config = config;
  }

  get NewEntryLabel() {
    return match.accessible.ClickableLabel(this.generalText.NewEntry);
  }

  /**
   *
   * @param {object} entry
   * @param {number} entry.index
   */
  GuardrailWarningIconPicker(entry) {
    let scheduleItemMask = `schedule_item_${entry.index}`;
    return match.accessible.ImageAndId(
      this.generalText.Alert.Warning,
      scheduleItemMask,
    );
  }
}

module.exports = {
  Screen: EntriesScreen,
};
