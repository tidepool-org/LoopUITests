const match = require("../match");
const base = require("./screen");

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
    return match.accessible.TextLabel(this.screenText.Info);
  }
  get InfoButton() {
    return match.accessible.Button(this.generalText.ButtonLabel.InfoCircle);
  }
  get GuardrailWarningIconPicker() {
    return match.accessible
      .Image(this.generalText.Alert.ExclamationMark)
      .atIndex(0);
  }
  get CancelNewEntryButton() {
    return match.accessible.Button(this.generalText.Cancel);
  }
  GuardrailMessage(text) {
    return match.accessible.TextLabel(text);
  }
  async OpenPicker(value) {
    await match.accessible.TextLabel(String(value)).tap();
  }
}

var _baseEntryScreenTests = async function ({
  openScreenFunc,
  checkEditing = false,
  skipInfo = false,
  skipClose = false,
}) {
  let screen;
  it("can open", async () => {
    screen = await openScreenFunc();
  });
  it("has a Header", async () => {
    await expect(screen.Header).toBeVisible();
  });
  it("has a Save Button", async () => {
    await expect(screen.SaveButton).toBeVisible();
  });
  it("has a Back Button", async () => {
    await expect(screen.BackButton).toBeVisible();
  });
  if (!skipInfo) {
    it("has a Info Label", async () => {
      await expect(screen.InfoLabel).toBeVisible();
    });
    it("has a Info Button", async () => {
      await expect(screen.InfoButton).toBeVisible();
    });
  }
  if (checkEditing) {
    it("has a Cancel New Entry Button", async () => {
      await expect(screen.CancelNewEntryButton).toBeVisible();
    });
    it("has a Plus Button", async () => {
      await expect(screen.PlusButton).toBeVisible();
    });
    it("has a Edit Button", async () => {
      await expect(screen.EditButton).toBeVisible();
    });
  }
  if (!skipClose) {
    it("can close", async () => {
      await screen.BackButton.tap();
    });
  }
};

module.exports = {
  Screen: EntryScreen,
  tests: _baseEntryScreenTests,
};
