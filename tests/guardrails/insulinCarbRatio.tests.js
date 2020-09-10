const name = require('./testNames');

module.exports = (test) => {
    const therapySettingsRatio = 10;
    var screen;
    var therapyScreen;
    var screenLimit;
    it('open carb ratio screen', async () => {
        therapyScreen = await test.OpenTherapySettingsScreen();
        screen = await therapyScreen.OpenCarbRatioScreen();
        await screen.OpenPicker(therapySettingsRatio);
        screenLimit = test.limits.insulinCarbRatio;
    });
    describe(name.MinimumLimit, () => {
        it(name.SetValue, async () => {
            await screen.ApplyOne({
                expected: { carbGramsPerInsulinUnit: screenLimit.min.limit },
                current: { carbGramsPerInsulinUnit: therapySettingsRatio }
            });
        });
        it(name.HasGuardrailIcon, async () => {
            await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeVisible();
        });
        it(name.HasGuardrailMessage, async () => {
            await expect(screen.GuardrailMessage('Low Carb Ratio')).toBeVisible();
        });
    });
    describe(name.MinimumWarning, () => {
        it(name.SetValue, async () => {
            await screen.ApplyOne({
                expected: { carbGramsPerInsulinUnit: screenLimit.min.warning },
                current: { carbGramsPerInsulinUnit: screenLimit.min.limit }
            });
        });
        it(name.HasGuardrailIcon, async () => {
            await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeVisible();
        });
        it(name.HasGuardrailMessage, async () => {
            await expect(screen.GuardrailMessage('Low Carb Ratio')).toBeVisible();
        });
    });
    describe(name.MinimumNoWarning, () => {
        it(name.SetValue, async () => {
            await screen.ApplyOne({
                expected: { carbGramsPerInsulinUnit: screenLimit.min.noWarning },
                current: { carbGramsPerInsulinUnit: screenLimit.min.warning }
            });
        });
        it(name.HasNoGuardrailIcon, async () => {
            await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeNotVisible();
        });
        it(name.HasNoGuardrailMessage, async () => {
            await expect(screen.GuardrailMessage('Low Carb Ratio')).toBeNotVisible();
        });
    });
    describe(name.MaximumNoWarning, () => {
        it(name.SetValue, async () => {
            await screen.ApplyOne({
                expected: { carbGramsPerInsulinUnit: screenLimit.max.noWarning },
                current: { carbGramsPerInsulinUnit: screenLimit.min.noWarning }
            });
        });
        it(name.HasNoGuardrailIcon, async () => {
            await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeNotVisible();
        });
        it(name.HasNoGuardrailMessage, async () => {
            await expect(screen.GuardrailMessage('Low Carb Ratio')).toBeNotVisible();
        });
    });
    describe(name.MaximumWarning, () => {
        it(name.SetValue, async () => {
            await screen.ApplyOne({
                expected: { carbGramsPerInsulinUnit: screenLimit.max.warning },
                current: { carbGramsPerInsulinUnit: screenLimit.max.noWarning }
            });
        });
        it(name.HasGuardrailIcon, async () => {
            await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeVisible();
        });
        it(name.HasGuardrailMessage, async () => {
            await expect(screen.GuardrailMessage('High Carb Ratio')).toBeVisible();
        });
    });
    describe(name.MaximumLimit, () => {
        it(name.SetValue, async () => {
            await screen.ApplyOne({
                expected: { carbGramsPerInsulinUnit: screenLimit.max.limit },
                current: { carbGramsPerInsulinUnit: screenLimit.max.warning }
            });
        });
        it(name.HasGuardrailIcon, async () => {
            await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeVisible();
        });
        it(name.HasGuardrailMessage, async () => {
            await expect(screen.GuardrailMessage('High Carb Ratio')).toBeVisible();
        });
    });
    it('can cancel and close screen', async () => {
        await screen.CancelNewEntry();
        await therapyScreen.ReturnToHomeScreen();
    });
};
