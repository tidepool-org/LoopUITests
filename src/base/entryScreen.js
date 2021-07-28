const match = require('../match');
const base = require('./screen');

class EntryScreen extends base.Screen {
  constructor(parentScreen) {
    parentScreen.header.editable = true;
    super(parentScreen);
  }

  get AddButton() {
    return match.accessible.Button(this.generalText.Add);
  }

  get PlusButton() {
    return match.accessible.Button(this.generalText.ButtonLabel.Plus);
  }

  get EditButton() {
    return match.accessible.Button(this.generalText.Edit);
  }

  get SaveButton() {
    return match.accessible.Button(this.generalText.Save);
  }

  get ContinueButton() {
    return match.accessible.ButtonBarButton(this.generalText.Continue);
  }

  get InfoLabel() {
    return match.Label(this.screenText.Info);
  }

  get InfoButton() {
    return match.accessible.Button(this.generalText.ButtonLabel.InfoCircle);
  }

  get GuardrailWarningIconPicker() {
    return match.accessible
      .Image(this.generalText.Alert.Warning)
      .atIndex(0);
  }

  get CancelNewEntryButton() {
    return match.accessible.Button(this.generalText.Cancel);
  }

  GuardrailMessage(text) {
    return match.Label(text);
  }

  async OpenPicker(value) {
    try {
      await match.Label(String(value)).toBeVisible();
      await match.Label(String(value)).tap();
    } catch (e) {
      await match.Label(String(value)).tap({ x: 20, y: 20 });
    }
  }
}

module.exports = {
  Screen: EntryScreen,
};
