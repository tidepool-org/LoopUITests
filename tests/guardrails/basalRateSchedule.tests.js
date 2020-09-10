const name = require('./testNames');

module.exports = (test) => {
    var screen;
    var therapyScreen;
    var screenLimit;
    it('open basal rates', async () => {
        therapyScreen = await test.OpenTherapySettingsScreen();
        screen = await therapyScreen.OpenBasalRateScreen();
        await screen.OpenPicker('12:00 AM');
        screenLimit = test.limits.basalRates;
    });
    describe(name.MinimumLimit, () => {
        it(name.SetValue, async () => {
            await screen.ApplyOne({
                expected: { time: '12:00 AM', unitsPerHour: screenLimit.min.limit },
                current: { time: '12:00 AM', unitsPerHour: 1 }
            });
        });
        it(name.HasGuardrailIcon, async () => {
            await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeVisible();
        });
        it(name.HasGuardrailMessage, async () => {
            await expect(screen.GuardrailMessage('No Basal Insulin')).toBeVisible();
        });
    });
    describe(name.MaximumNoWarning, () => {
        it(name.SetValue, async () => {
            await screen.ApplyOne({
                expected: { time: '12:00 AM', unitsPerHour: screenLimit.min.noWarning },
                current: { time: '12:00 AM', unitsPerHour: screenLimit.min.limit }
            });
        });
        it(name.HasNoGuardrailIcon, async () => {
            await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeNotVisible();
        });
        it(name.HasNoGuardrailMessage, async () => {
            await expect(screen.GuardrailMessage('No Basal Insulin')).toBeNotVisible();
        });
    });
    describe(name.MaximumLimit, () => {
        it(name.SetValue, async () => {
            await screen.ApplyOne({
                expected: { time: '12:00 AM', unitsPerHour: screenLimit.max.limit },
                current: { time: '12:00 AM', unitsPerHour: screenLimit.min.noWarning }
            });
        });
        it(name.HasNoGuardrailIcon, async () => {
            await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeNotVisible();
        });
        it(name.HasNoGuardrailMessage, async () => {
            await expect(screen.GuardrailMessage('No Basal Insulin')).toBeNotVisible();
        });
    });
    it('can close screen', async () => {
        await screen.CancelNewEntry();
        await therapyScreen.ReturnToHomeScreen();
    });
};
