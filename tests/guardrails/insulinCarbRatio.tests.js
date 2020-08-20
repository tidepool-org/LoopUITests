module.exports = (test) => {
    var screen;
    var settings;
    var screenLimit;
    it('open screen', async () => {
        settings = await test.OpenSettingsScreen();
        screen = await settings.OpenCarbRatioScreen();
        screenLimit = test.limits.insulinCarbRatio;
    });
    it('can set max units at limit', async () => {
        await screen.Plus();
        await screen.ApplyOne({
            expected: { carbGramsPerInsulinUnit: screenLimit.max.limit }
        });
        await screen.Add();
        await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeVisible();
        await expect(screen.GuardrailMessage('High Carb Ratio')).toBeVisible();
    });
    it('can set max units with warning', async () => {
        await screen.Plus();
        await screen.ApplyOne({
            expected: { carbGramsPerInsulinUnit: screenLimit.max.warning },
            current: { carbGramsPerInsulinUnit: screenLimit.max.limit },
        });
        await screen.Add();
        await expect(screen.GuardrailWarningIconPicker({ index: 1 })).toBeVisible();
    });
    it('can set max units with no warning', async () => {
        await screen.Plus();
        await screen.ApplyOne({
            expected: { carbGramsPerInsulinUnit: screenLimit.max.noWarning },
            current: { carbGramsPerInsulinUnit: screenLimit.max.warning },
        });
        await screen.Add();
        await expect(screen.GuardrailWarningIconPicker({ index: 2 })).toBeNotVisible();
    });
    it('can set min units with no warning', async () => {
        await screen.Plus();
        await screen.ApplyOne({
            expected: { carbGramsPerInsulinUnit: screenLimit.min.noWarning },
            current: { carbGramsPerInsulinUnit: screenLimit.max.noWarning }
        });
        await screen.Add();
        await expect(screen.GuardrailWarningIconPicker({ index: 3 })).toBeNotVisible();
    });
    it('can set min units with warning', async () => {
        await screen.Plus();
        await screen.ApplyOne({
            expected: { carbGramsPerInsulinUnit: screenLimit.min.warning },
            current: { carbGramsPerInsulinUnit: screenLimit.min.noWarning }
        });
        await screen.Add();
        await expect(screen.GuardrailWarningIconPicker({ index: 4 })).toBeVisible();
    });
    it('can set min units at limit', async () => {
        await screen.Plus();
        await screen.ApplyOne({
            expected: { carbGramsPerInsulinUnit: screenLimit.min.limit },
            current: { carbGramsPerInsulinUnit: screenLimit.min.warning }
        });
        await screen.Add();
        await expect(screen.GuardrailWarningIconPicker({ index: 5 })).toBeVisible();
    });
    it('can canel and close screen', async () => {
        await screen.CancelAndClose();
        await settings.BackToHome();
    });
};
