const description = require('./testDescriptions');

module.exports = (test) => {
    var screen;
    var therapySettingsScreen;
    var screenLimit;
    it('open basal rates', async () => {
        therapySettingsScreen = await test.OpenTherapySettingsScreen();
        screen = await therapySettingsScreen.OpenBasalRateScreen();
        await screen.OpenPicker('12:00 AM');
        screenLimit = test.limits.basalRates;
    });
    describe(description.MinimumLimit, () => {
        it(description.SetValue, async () => {
            await screen.ApplyOne({
                expected: { time: '12:00 AM', unitsPerHour: screenLimit.min.limit },
                current: { time: '12:00 AM', unitsPerHour: 1 }
            });
        });
        it(description.HasGuardrailIcon, async () => {
            await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeVisible();
        });
        it(description.HasGuardrailMessage, async () => {
            await expect(screen.NoBasalInsulinGuardrailMessage()).toBeVisible();
        });
    });
    describe(description.MaximumNoWarning, () => {
        it(description.SetValue, async () => {
            await screen.ApplyOne({
                expected: { time: '12:00 AM', unitsPerHour: screenLimit.min.noWarning },
                current: { time: '12:00 AM', unitsPerHour: screenLimit.min.limit }
            });
        });
        it(description.HasNoGuardrailIcon, async () => {
            await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeNotVisible();
        });
        it(description.HasNoGuardrailMessage, async () => {
            await expect(screen.NoBasalInsulinGuardrailMessage()).toBeNotVisible();
        });
    });
    describe(description.MaximumLimit, () => {
        it(description.SetValue, async () => {
            await screen.ApplyOne({
                expected: { time: '12:00 AM', unitsPerHour: screenLimit.max.limit },
                current: { time: '12:00 AM', unitsPerHour: screenLimit.min.noWarning }
            });
        });
        it(description.HasNoGuardrailIcon, async () => {
            await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeNotVisible();
        });
        it(description.HasNoGuardrailMessage, async () => {
            await expect(screen.NoBasalInsulinGuardrailMessage()).toBeNotVisible();
        });
    });
    it('can close screen', async () => {
        await screen.CancelNewEntry();
        await therapySettingsScreen.ReturnToHomeScreen();
    });
};
