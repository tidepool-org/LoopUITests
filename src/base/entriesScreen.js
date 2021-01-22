const match = require("../match");
const entry = require("./entryScreen");

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
      this.generalText.Alert.ExclamationMark,
      scheduleItemMask
    );
  }
}

var _baseEntriesScreenTests = async function ({
  openScreenFunc,
  checkEditing = false,
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
  it("has a Info Label", async () => {
    await expect(screen.InfoLabel).toBeVisible();
  });
  it("has a Info Button", async () => {
    await expect(screen.InfoButton).toBeVisible();
  });
  if (checkEditing) {
    it("has a New Entry Label", async () => {
      await expect(screen.NewEntryLabel).toBeVisible();
    });
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
  Screen: EntriesScreen,
  tests: _baseEntriesScreenTests,
};
