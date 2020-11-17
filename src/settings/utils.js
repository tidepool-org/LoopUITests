var _parts = function (val) {
  return String(val).split(".");
};

var _testDescription = {
  hasHeader: "has a header element",
  hasInfoLabel: "has a information label",
  hasInfoButton: "has a information button",
  hasPlusButton: "has a '+' button",
  hasBackButton: "has a back button",
  hasSaveButton: "has a save button",
  hasEditButton: "has a edit button",
  closeScreen: "can close therapy setting",
  openScreen: "can open therapy setting",
};

/**
 *
 * @param {object} testData
 * @param {Function} testData.openScreenFunc
 * @param {boolean} testData.checkInfo, default `true`
 * @param {boolean} testData.checkEditing, default `false`
 * @param {boolean} testData.skipClose, default `false`
 */
var _baseThreapyScreenTests = async function ({
  openScreenFunc,
  checkInfo = true,
  checkEditing = false,
  skipClose = false,
}) {
  describe("standard", () => {
    let screen;
    it(_testDescription.openScreen, async () => {
      screen = await openScreenFunc();
    });
    it(_testDescription.hasHeader, async () => {
      await expect(screen.Header).toBeVisible();
    });
    if (checkInfo) {
      it(_testDescription.hasInfoLabel, async () => {
        await expect(screen.InfoLabel).toBeVisible();
      });
      it(_testDescription.hasInfoButton, async () => {
        await expect(screen.InfoButton).toBeVisible();
      });
    }
    if (checkEditing) {
      it(_testDescription.hasPlusButton, async () => {
        await expect(screen.PlusButton).toBeVisible();
      });
      it(_testDescription.hasEditButton, async () => {
        await expect(screen.EditButton).toBeVisible();
      });
    }
    it(_testDescription.hasSaveButton, async () => {
      await expect(screen.SaveButton).toBeVisible();
    });
    it(_testDescription.hasBackButton, async () => {
      await expect(screen.BackButton).toBeVisible();
    });
    if (!skipClose) {
      it(_testDescription.closeScreen, async () => {
        await screen.BackButton.tap();
      });
    }
  });
};

module.exports = {
  numericPartsFromString: _parts,
  testDescription: _testDescription,
  baseThreapyScreenTests: _baseThreapyScreenTests,
};
