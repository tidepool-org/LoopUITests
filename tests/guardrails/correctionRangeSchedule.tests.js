const description = require('./testDescriptions');

module.exports = (test) => {
    var screen;
    var therapySettingsScreen;
    var screenLimit;
    it('open correction range', async () => {
        therapySettingsScreen = await test.OpenTherapySettingsScreen();
        screen = await therapySettingsScreen.OpenCorrectionRangeScreen();
        await screen.OpenPicker('12:00 AM');
        screenLimit = test.getLimitsForSetting('correctionRange');
    });
    describe(description.MinimumLimit, () => {
        it(description.SetValue, async () => {
            await screen.ApplyOne({
                expected: {
                    min: screenLimit.min.limit,
                    max: 110,
                },
                current: {
                    min: 100,
                    max: 110,
                }
            });
        });
        it(description.NoGuardrailIcon, async () => {
            await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeNotVisible();
        });
        it(description.NoGuardrailMessage, async () => {
            await expect(screen.LowCorrectionValueGuardrailMessage).toBeNotVisible();
        });
    });
    describe(description.MaximumNoWarning, () => {
        it(description.SetValue, async () => {
            await screen.ApplyOne({
                expected: {
                    min: screenLimit.min.limit,
                    max: screenLimit.max.noWarning,
                },
                current: {
                    min: screenLimit.min.limit,
                    max: 110,
                },
            });
        });
        it(description.NoGuardrailIcon, async () => {
            await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeNotVisible();
        });
        it(description.NoGuardrailMessage, async () => {
            await expect(screen.LowCorrectionValueGuardrailMessage).toBeNotVisible();
        });
    });
    describe(description.MaximumWarning, () => {
        it(description.SetValue, async () => {
            await screen.ApplyOne({
                expected: {
                    min: screenLimit.min.limit,
                    max: screenLimit.max.warning,
                },
                current: {
                    min: screenLimit.min.limit,
                    max: screenLimit.max.noWarning,
                },
            });
        });
        it(description.GuardrailIcon, async () => {
            await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeVisible();
        });
        it(description.GuardrailMessage, async () => {
            await expect(screen.HighCorrectionValueGuardrailMessage).toBeVisible();
        });
    });
    describe(description.MaximumLimit, () => {
        it(description.SetValue, async () => {
            await screen.ApplyOne({
                expected: {
                    min: screenLimit.min.limit,
                    max: screenLimit.max.limit,
                },
                current: {
                    min: screenLimit.min.limit,
                    max: screenLimit.max.warning,
                },
            });
        });
        it(description.GuardrailIcon, async () => {
            await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeVisible();
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
