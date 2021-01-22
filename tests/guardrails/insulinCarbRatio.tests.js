const description = require('./testDescriptions');

module.exports = (test) => {
  const therapySettingsRatio = 10;
  var screen;
  var therapySettingsScreen;
  var screenLimit;
  it('open carb ratio screen', async () => {
    therapySettingsScreen = await test.OpenTherapySettingsScreen();
    screen = await therapySettingsScreen.OpenCarbRatioScreen();
    await screen.OpenPicker(therapySettingsRatio);
    screenLimit = test.getLimitsForSetting('insulinCarbRatio');
  });
  describe(description.MinimumLimit, () => {
    it(description.SetValue, async () => {
      await screen.ApplyOne({
        expected: { carbGramsPerInsulinUnit: screenLimit.min.limit },
        current: { carbGramsPerInsulinUnit: therapySettingsRatio },
      });
    });
    it(description.GuardrailIcon, async () => {
      await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeVisible();
    });
    it(description.GuardrailMessage, async () => {
      await expect(screen.LowCarbRatioGuardrailMessage).toBeVisible();
    });
  });
  describe(description.MinimumWarning, () => {
    it(description.SetValue, async () => {
      await screen.ApplyOne({
        expected: { carbGramsPerInsulinUnit: screenLimit.min.warning },
        current: { carbGramsPerInsulinUnit: screenLimit.min.limit },
      });
    });
    it(description.GuardrailIcon, async () => {
      await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeVisible();
    });
    it(description.GuardrailMessage, async () => {
      await expect(screen.LowCarbRatioGuardrailMessage).toBeVisible();
    });
  });
  describe(description.MinimumNoWarning, () => {
    it(description.SetValue, async () => {
      await screen.ApplyOne({
        expected: { carbGramsPerInsulinUnit: screenLimit.min.noWarning },
        current: { carbGramsPerInsulinUnit: screenLimit.min.warning },
      });
    });
    it(description.NoGuardrailIcon, async () => {
      await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeNotVisible();
    });
    it(description.NoGuardrailMessage, async () => {
      await expect(screen.LowCarbRatioGuardrailMessage).toBeNotVisible();
    });
  });
  describe(description.MaximumNoWarning, () => {
    it(description.SetValue, async () => {
      await screen.ApplyOne({
        expected: { carbGramsPerInsulinUnit: screenLimit.max.noWarning },
        current: { carbGramsPerInsulinUnit: screenLimit.min.noWarning },
      });
    });
    it(description.NoGuardrailIcon, async () => {
      await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeNotVisible();
    });
    it(description.NoGuardrailMessage, async () => {
      await expect(screen.LowCarbRatioGuardrailMessage).toBeNotVisible();
    });
  });
  describe(description.MaximumWarning, () => {
    it(description.SetValue, async () => {
      await screen.ApplyOne({
        expected: { carbGramsPerInsulinUnit: screenLimit.max.warning },
        current: { carbGramsPerInsulinUnit: screenLimit.max.noWarning },
      });
    });
    it(description.GuardrailIcon, async () => {
      await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeVisible();
    });
    it(description.GuardrailMessage, async () => {
      await expect(screen.HighCarbRatioGuardrailMessage).toBeVisible();
    });
  });
  describe(description.MaximumLimit, () => {
    it(description.SetValue, async () => {
      await screen.ApplyOne({
        expected: { carbGramsPerInsulinUnit: screenLimit.max.limit },
        current: { carbGramsPerInsulinUnit: screenLimit.max.warning },
      });
    });
    it(description.GuardrailIcon, async () => {
      await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeVisible();
    });
    it(description.GuardrailMessage, async () => {
      await expect(screen.HighCarbRatioGuardrailMessage).toBeVisible();
    });
  });
  it('can cancel and close screen', async () => {
    await screen.CancelNewEntryButton.tap();
    await therapySettingsScreen.ReturnToHomeScreen();
  });
};
