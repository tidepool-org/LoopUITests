const description = require('./testDescriptions');

module.exports = (test) => {
  var screen;
  var therapySettingsScreen;
  var screenLimit;
  var startMin = 105;
  var startMax = 115;
  it('open correction range', async () => {
    therapySettingsScreen = await test.OpenTherapySettingsScreen();
    screen = await therapySettingsScreen.OpenCorrectionRangeScreen();
    await screen.OpenPicker('8:00 AM');
    screenLimit = test.getLimitsForSetting('correctionRange');
  });
  describe(description.MinimumNoWarning, () => {
    it(description.SetValue, async () => {
      await screen.ApplyOne({
        expected: {
          min: screenLimit.min.noWarning,
          max: startMax,
        },
        current: {
          min: startMin,
          max: startMax,
        },
      });
    });
    it(description.NoGuardrailIcon, async () => {
      await expect(screen.GuardrailWarningIconPicker({ index: 1 })).toNotExist();
    });
    it(description.NoGuardrailMessage, async () => {
      await expect(screen.LowCorrectionValueGuardrailMessage).toNotExist();
    });
  });
  describe(description.MinimumWarning, () => {
    it(description.SetValue, async () => {
      await screen.ApplyOne({
        expected: {
          min: screenLimit.min.warning,
          max: startMax,
        },
        current: {
          min: screenLimit.min.noWarning,
          max: startMax,
        },
      });
    });
    it(description.GuardrailIcon, async () => {
      await expect(screen.GuardrailWarningIconPicker({ index: 1 })).toBeVisible();
    });
    it(description.GuardrailMessage, async () => {
      await expect(screen.LowCorrectionValueGuardrailMessage).toBeVisible();
    });
  });
  describe(description.MinimumLimit, () => {
    it(description.SetValue, async () => {
      await screen.ApplyOne({
        expected: {
          min: screenLimit.min.limit,
          max: startMax,
        },
        current: {
          min: screenLimit.min.warning,
          max: startMax,
        },
      });
    });
    it(description.GuardrailIcon, async () => {
      await expect(screen.GuardrailWarningIconPicker({ index: 1 })).toBeVisible();
    });
    it(description.GuardrailMessage, async () => {
      await expect(screen.LowCorrectionValueGuardrailMessage).toBeVisible();
    });
  });
  describe(description.MaximumNoWarning, () => {
    it(description.SetValue, async () => {
      await screen.ApplyOne({
        expected: {
          min: screenLimit.min.noWarning,
          max: screenLimit.max.noWarning,
        },
        current: {
          min: screenLimit.min.limit,
          max: startMax,
        },
      });
    });
    it(description.NoGuardrailIcon, async () => {
      await expect(screen.GuardrailWarningIconPicker({ index: 1 })).toNotExist();
    });
    it(description.NoGuardrailMessage, async () => {
      await expect(screen.LowCorrectionValueGuardrailMessage).toNotExist();
    });
  });
  describe(description.MaximumWarning, () => {
    it(description.SetValue, async () => {
      await screen.ApplyOne({
        expected: {
          min: screenLimit.min.noWarning,
          max: screenLimit.max.warning,
        },
        current: {
          min: screenLimit.min.noWarning,
          max: screenLimit.max.noWarning,
        },
      });
    });
    it(description.GuardrailIcon, async () => {
      await expect(screen.GuardrailWarningIconPicker({ index: 1 })).toBeVisible();
    });
    it(description.GuardrailMessage, async () => {
      await expect(screen.HighCorrectionValueGuardrailMessage).toBeVisible();
    });
  });
  describe(description.MaximumLimit, () => {
    it(description.SetValue, async () => {
      await screen.ApplyOne({
        expected: {
          min: screenLimit.min.noWarning,
          max: screenLimit.max.limit,
        },
        current: {
          min: screenLimit.min.noWarning,
          max: screenLimit.max.warning,
        },
      });
    });
    it(description.GuardrailIcon, async () => {
      await expect(screen.GuardrailWarningIconPicker({ index: 1 })).toBeVisible();
    });
    it(description.GuardrailMessage, async () => {
      await expect(screen.HighCorrectionValueGuardrailMessage).toBeVisible();
    });
  });
  it('can close screen', async () => {
    await screen.CancelNewEntryButton.tap();
    await therapySettingsScreen.ReturnToHomeScreen();
  });
};
