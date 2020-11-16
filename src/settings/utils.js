var _parts = function (val) {
  return String(val).split(".");
};

var _testDescription = {
  hasHeader: "has a header element",
  hasInfoLabel: "has an information label",
  hasInfoButton: "has more information button",
  hasPlusButton: "has a '+' button",
  hasBackButton: "has a back button",
  hasSaveButton: "has a save button",
  hasEditButton: "has an edit button",
  closeScreen: "close the screen without saving",
  openScreen: "open therapy setting",
};

var _baseThreapyScreenTests = async function (testData, openScreenFunc) {
  var screen;
  it("can open", async () => {
    screen = await openScreenFunc(testData);
  });
  it(_testDescription.hasHeader, async () => {
    await expect(screen.Header).toBeVisible();
  });
  // it(_testDescription.hasInfoLabel, async () => {
  //   await expect(screen.InfoLabel).toBeVisible();
  // });
  // it(_testDescription.hasInfoButton, async () => {
  //   await expect(screen.InfoButton).toBeVisible();
  // });
  // it(_testDescription.hasPlusButton, async () => {
  //   await expect(screen.PlusButton).toBeVisible();
  // });
  // it(_testDescription.hasEditButton, async () => {
  //   await expect(screen.EditButton).toBeVisible();
  // });
  it(_testDescription.hasBackButton, async () => {
    await expect(screen.BackButton).toBeVisible();
  });
  // it(_testDescription.hasSaveButton, async () => {
  //   await expect(screen.SaveButton).toBeVisible();
  // });
  it(_testDescription.closeScreen, async () => {
    await screen.BackButton.tap();
    //await screen.BackButton.tap();
  });
};

module.exports = {
  numericPartsFromString: _parts,
  testDescription: _testDescription,
  baseThreapyScreenTests: _baseThreapyScreenTests,
};
