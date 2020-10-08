const description = require('./testDescriptions');

module.exports = (test) => {
    var screen;
    var therapySettingsScreen;
    var screenLimit;
    const therapySettingsValue = 75;
    it('open screen', async () => {
        therapySettingsScreen = await test.OpenTherapySettingsScreen();
        screen = await therapySettingsScreen.OpenSuspendThresholdScreen();
        screenLimit = test.getLimitsForSetting('suspendThreshold');
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
            await expect(screen.GuardrailWarningIconPicker()).toBeVisible();
        });
        it(description.GuardrailMessage, async () => {
            await expect(screen.LowSuspendThresholdGuardrailMessage()).toBeVisible();
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
            await expect(screen.GuardrailWarningIconPicker()).toBeVisible();
        });
        it(description.GuardrailMessage, async () => {
            await expect(screen.LowSuspendThresholdGuardrailMessage()).toBeVisible();
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
            await expect(screen.GuardrailWarningIconPicker()).toBeNotVisible();
        });
        it(description.NoGuardrailMessage, async () => {
            await expect(screen.LowSuspendThresholdGuardrailMessage()).toBeNotVisible();
        });
    });
    describe(description.MaximumLimit, () => {
        it(description.SetValue, async () => {
            await screen.ApplyOne({
                expected: { value: screenLimit.max.limit },
                current: { value: screenLimit.min.noWarning },
            });
        });
        it(description.NoGuardrailIcon, async () => {
            await expect(screen.GuardrailWarningIconPicker()).toBeNotVisible();
        });
        it(description.NoGuardrailMessage, async () => {
            await expect(screen.HighSuspendThresholdGuardrailMessage()).toBeNotVisible();
        });
    });
    it('can close screen', async () => {
        await screen.CancelNewEntry();
        await therapySettingsScreen.ReturnToHomeScreen();
    });
};
