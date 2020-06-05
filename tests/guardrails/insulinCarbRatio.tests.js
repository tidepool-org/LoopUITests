var insulinCarbRatioTests = (test) => {
    var screen;
    var screenLimit;
    beforeAll(async () => {
        screen = await test.settingsScreen.OpenCarbRatioScreen();
        screenLimit = test.limits.insulinCarbRatio;
    });
    afterAll(async () => {
        await screen.Cancel();
    });
    it('can set max units at limit', async () => {
        await screen.Add();
        await screen.ApplyOne({
            carbGramsPerInsulinUnit: screenLimit.max.limit,
        });
        await screen.AddNewEntry();
        await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeVisible();
    });
    it('can set max units with warning', async () => {
        await screen.Add();
        await screen.ApplyOne(
            {
                carbGramsPerInsulinUnit: screenLimit.max.warning,
            },
            {
                carbGramsPerInsulinUnit: screenLimit.max.limit,
            });
        await screen.AddNewEntry();
        await expect(screen.GuardrailWarningIconPicker({ index: 1 })).toBeVisible();
    });
    it('can set max units with no warning', async () => {
        await screen.Add();
        await screen.ApplyOne(
            {
                carbGramsPerInsulinUnit: screenLimit.max.noWarning,
            },
            {
                carbGramsPerInsulinUnit: screenLimit.max.warning,
            });
        await screen.AddNewEntry();
        await expect(screen.GuardrailWarningIconPicker({ index: 2 })).toBeNotVisible();
    });
    it('can set min units with no warning', async () => {
        await screen.Add();
        await screen.ApplyOne(
            {
                carbGramsPerInsulinUnit: screenLimit.min.noWarning,
            },
            {
                carbGramsPerInsulinUnit: screenLimit.max.noWarning,
            });
        await screen.AddNewEntry();
        await expect(screen.GuardrailWarningIconPicker({ index: 3 })).toBeNotVisible();
    });
    it('can set min units with warning', async () => {
        await screen.Add();
        await screen.ApplyOne(
            {
                carbGramsPerInsulinUnit: screenLimit.min.warning,
            },
            {
                carbGramsPerInsulinUnit: screenLimit.min.noWarning,
            });
        await screen.AddNewEntry();
        await expect(screen.GuardrailWarningIconPicker({ index: 4 })).toBeVisible();
    });
    it('can set min units at limit', async () => {
        await screen.Add();
        await screen.ApplyOne(
            {
                carbGramsPerInsulinUnit: screenLimit.min.limit,
            },
            {
                carbGramsPerInsulinUnit: screenLimit.min.warning,
            });
        await screen.AddNewEntry();
        await expect(screen.GuardrailWarningIconPicker({ index: 5 })).toBeVisible();
    });
};

module.exports = { insulinCarbRatioTests };
