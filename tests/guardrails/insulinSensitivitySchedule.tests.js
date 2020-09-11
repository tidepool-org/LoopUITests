const description = require('./testDescriptions');

module.exports = (test) => {
    var screen;
    var therapySettingsScreen;
    var screenLimit;
    it('open screen', async () => {
        therapySettingsScreen = await test.OpenTherapySettingsScreen();
        screen = await therapySettingsScreen.OpenInsulinSensitivitiesScreen();
        await screen.OpenPicker('12:00 AM');
        screenLimit = test.limits.insulinSensitivities;
    });
    describe(description.MinimumLimit, () => {
        it(description.SetValue, async () => {
            await screen.ApplyOne({
                expected: { time: '12:00 AM', bgValuePerInsulinUnit: screenLimit.min.limit },
                current: { time: '12:00 AM', bgValuePerInsulinUnit: 45 }
            });
        });
        it(description.HasGuardrailIcon, async () => {
            await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeVisible();
        });
        it(description.HasGuardrailMessage, async () => {
            await expect(screen.LowInsulinSensitivityGuardrailMessage()).toBeVisible();
        });
    });
    describe(description.MinimumWarning, () => {
        it(description.SetValue, async () => {
            await screen.ApplyOne({
                expected: { time: '12:00 AM', bgValuePerInsulinUnit: screenLimit.min.warning },
                current: { time: '12:00 AM', bgValuePerInsulinUnit: screenLimit.min.limit }
            });
        });
        it(description.HasGuardrailIcon, async () => {
            await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeVisible();
        });
        it(description.HasGuardrailMessage, async () => {
            await expect(screen.LowInsulinSensitivityGuardrailMessage()()).toBeVisible();
        });
    });
    describe(description.MinimumNoWarning, () => {
        it(description.SetValue, async () => {
            await screen.ApplyOne({
                expected: { time: '12:00 AM', bgValuePerInsulinUnit: screenLimit.min.noWarning },
                current: { time: '12:00 AM', bgValuePerInsulinUnit: screenLimit.min.warning }
            });
        });
        it(description.HasNoGuardrailIcon, async () => {
            await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeNotVisible();
        });
        it(description.HasNoGuardrailMessage, async () => {
            await expect(screen.LowInsulinSensitivityGuardrailMessage()).toBeNotVisible();
        });
    });
    describe(description.MaximumNoWarning, () => {
        it(description.SetValue, async () => {
            await screen.ApplyOne({
                expected: { time: '12:00 AM', bgValuePerInsulinUnit: screenLimit.max.noWarning },
                current: { time: '12:00 AM', bgValuePerInsulinUnit: screenLimit.min.noWarning }
            });
        });
        it(description.HasNoGuardrailIcon, async () => {
            await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeNotVisible();
        });
        it(description.HasNoGuardrailMessage, async () => {
            await expect(screen.HighInsulinSensitivityGuardrailMessage()).toBeNotVisible();
        });
    });
    describe(description.MaximumWarning, () => {
        it(description.SetValue, async () => {
            await screen.ApplyOne({
                expected: { time: '12:00 AM', bgValuePerInsulinUnit: screenLimit.max.warning },
                current: { time: '12:00 AM', bgValuePerInsulinUnit: screenLimit.max.noWarning }
            });
        });
        it(description.HasGuardrailIcon, async () => {
            await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeVisible();
        });
        it(description.HasGuardrailMessage, async () => {
            await expect(screen.HighInsulinSensitivityGuardrailMessage()).toBeVisible();
        });
    });
    describe(description.MaximumLimit, () => {
        it(description.SetValue, async () => {
            await screen.ApplyOne({
                expected: { time: '12:00 AM', bgValuePerInsulinUnit: screenLimit.max.limit },
                current: { time: '12:00 AM', bgValuePerInsulinUnit: screenLimit.max.warning },

            });
        });
        it(description.HasGuardrailIcon, async () => {
            await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeVisible();
        });
        it(description.HasGuardrailMessage, async () => {
            await expect(screen.HighInsulinSensitivityGuardrailMessage()).toBeVisible();
        });
    });
    it('can close screen', async () => {
        await screen.CancelNewEntry();
        await therapySettingsScreen.ReturnToHomeScreen();
    });
};
