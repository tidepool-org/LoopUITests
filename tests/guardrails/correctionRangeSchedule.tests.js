const name = require('./testNames');

module.exports = (test) => {
    var screen;
    var therapyScreen;
    var screenLimit;
    it('open correction range', async () => {
        therapyScreen = await test.OpenTherapySettingsScreen();
        screen = await therapyScreen.OpenCorrectionRangeScreen();
        await screen.OpenPicker('12:00 AM');
        screenLimit = test.limits.correctionRange;
    });
    describe(name.MinimumLimit, () => {
        it(name.SetValue, async () => {
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
        it(name.HasGuardrailIcon, async () => {
            await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeNotVisible();
        });
        it(name.HasGuardrailMessage, async () => {
            await expect(screen.GuardrailMessage('Low Correction Value')).toBeNotVisible();
        });
    });
    describe(name.MaximumNoWarning, () => {
        it(name.SetValue, async () => {
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
        it(name.HasGuardrailIcon, async () => {
            await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeNotVisible();
        });
        it(name.HasGuardrailMessage, async () => {
            await expect(screen.GuardrailMessage('Low Correction Value')).toBeNotVisible();
        });
    });
    describe(name.MaximumWarning, () => {
        it(name.SetValue, async () => {
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
        it(name.HasGuardrailIcon, async () => {
            await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeVisible();
        });
        it(name.HasGuardrailMessage, async () => {
            await expect(screen.GuardrailMessage('High Correction Value')).toBeVisible();
        });
    });
    describe(name.MaximumLimit, () => {
        it(name.SetValue, async () => {
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
        it(name.HasGuardrailIcon, async () => {
            await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeVisible();
        });
        it(name.HasGuardrailMessage, async () => {
            await expect(screen.GuardrailMessage('High Correction Value')).toBeVisible();
        });
    });
    it('can close screen', async () => {
        await screen.CancelNewEntry();
        await therapyScreen.ReturnToHomeScreen();
    });
};
