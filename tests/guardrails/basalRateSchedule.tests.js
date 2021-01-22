const description = require('./testDescriptions');

module.exports = (test) => {
  var screen;
  var therapySettingsScreen;
  var screenLimit;
  it('open basal rates', async () => {
    therapySettingsScreen = await test.OpenTherapySettingsScreen();
    screen = await therapySettingsScreen.OpenBasalRateScreen();
    await screen.OpenPicker('12:00 AM');
    screenLimit = test.getLimitsForSetting('basalRates');
  });
  describe(description.MinimumNoWarning, () => {
    it(description.SetValue, async () => {
      await screen.ApplyOne({
        expected: { time: '12:00 AM', unitsPerHour: screenLimit.min.limit },
        current: { time: '12:00 AM', unitsPerHour: 1 },
      });
    });
    it(description.GuardrailIcon, async () => {
      await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toNotExist();
    });
    it(description.GuardrailMessage, async () => {
      await expect(screen.NoBasalInsulinGuardrailMessage).toNotExist();
    });
  });
  describe(description.MaximumNoWarning, () => {
    it(description.SetValue, async () => {
      await screen.ApplyOne({
        expected: { time: '12:00 AM', unitsPerHour: screenLimit.max.limit },
        current: { time: '12:00 AM', unitsPerHour: screenLimit.min.limit },
      });
    });
    it(description.NoGuardrailIcon, async () => {
      await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toNotExist();
    });
    it(description.NoGuardrailMessage, async () => {
      await expect(screen.NoBasalInsulinGuardrailMessage).toNotExist();
    });
  });
  it('can close screen', async () => {
    await screen.CancelNewEntryButton.tap();
    await therapySettingsScreen.ReturnToHomeScreen();
  });
};
