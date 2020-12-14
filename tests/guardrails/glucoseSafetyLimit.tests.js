const description = require('./testDescriptions');

module.exports = (test) => {
    var screen;
    var therapySettingsScreen;
    var screenLimit;
    const therapySettingsValue = 75;
    it('open screen', async () => {
        therapySettingsScreen = await test.OpenTherapySettingsScreen();
        screen = await therapySettingsScreen.OpenGlucoseSafetyLimitScreen();
        screenLimit = test.getLimitsForSetting('glucoseSafetyLimit');
        await screen.OpenPicker(therapySettingsValue);
    });
    describe(description.MinimumLimit, () => {
        it(description.SetValue, async () => {
            await screen.ApplyOne({
                expected: { value: screenLimit.min.limit },
                current: { value: therapySettingsValue },
            });
        });
        it(description.GuardrailIcon, async () => {
            await expect(screen.GuardrailWarningIconPicker).toBeVisible();
        });
        it(description.GuardrailMessage, async () => {
            await expect(screen.LowGlucoseSafetyLimitGuardrailMessage).toBeVisible();
        });
    });
    describe(description.MinimumWarning, () => {
        it(description.SetValue, async () => {
            await screen.ApplyOne({
                expected: { value: screenLimit.min.warning },
                current: { value: screenLimit.min.limit },
            });
        });
        it(description.GuardrailIcon, async () => {
            await expect(screen.GuardrailWarningIconPicker).toBeVisible();
        });
        it(description.GuardrailMessage, async () => {
            await expect(screen.LowGlucoseSafetyLimitGuardrailMessage).toBeVisible();
        });
    });
    describe(description.MinimumNoWarning, () => {
        it(description.SetValue, async () => {
            await screen.ApplyOne({
                expected: { value: screenLimit.min.noWarning },
                current: { value: screenLimit.min.warning },
            });
        });
        it(description.NoGuardrailIcon, async () => {
            await expect(screen.GuardrailWarningIconPicker).toNotExist();
        });
        it(description.NoGuardrailMessage, async () => {
            await expect(screen.LowGlucoseSafetyLimitGuardrailMessage).toNotExist();
        });
    });
    describe(description.MaximumNoWarning, () => {
        it(description.SetValue, async () => {
            await screen.ApplyOne({
                expected: { value: screenLimit.max.limit },
                current: { value: screenLimit.min.noWarning },
            });
        });
        it(description.NoGuardrailIcon, async () => {
            await expect(screen.GuardrailWarningIconPicker).toNotExist();
        });
        it(description.NoGuardrailMessage, async () => {
            await expect(screen.HighGlucoseSafetyLimitGuardrailMessage).toNotExist();
        });
    });
    it('can close screen', async () => {
        await screen.CancelNewEntryButton.tap();
        await therapySettingsScreen.ReturnToHomeScreen();
    });
};
