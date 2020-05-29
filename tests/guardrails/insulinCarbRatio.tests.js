const { limits } = require('../../src/index');

var insulinCarbRatioTests = (test) => {
    var screen;
    beforeAll(async () => {
        screen = await test.settingsScreen.OpenCarbRatioScreen();
    });
    afterAll(async () => {
        await screen.Cancel();
    });
    it('can set max units at limit', async () => {
        await screen.Add();
        await screen.ApplyOne({
            carbGramsPerInsulinUnit: limits.insulinCarbRatio.max.limit,
        });
        await screen.AddNewEntry();
        await expect(screen.GuardrailWarningIconPicker(0)).toBeVisible();
    });
    it('can set max units with warning', async () => {
        await screen.Add();
        await screen.ApplyOne(
            {
                carbGramsPerInsulinUnit: limits.insulinCarbRatio.max.warning,
            },
            {
                carbGramsPerInsulinUnit: limits.insulinCarbRatio.max.limit,
            });
        await screen.AddNewEntry();
        await expect(screen.GuardrailWarningIconPicker(1)).toBeVisible();
    });
    it('can set max units with no warning', async () => {
        await screen.Add();
        await screen.ApplyOne(
            {
                carbGramsPerInsulinUnit: limits.insulinCarbRatio.max.noWarning,
            },
            {
                carbGramsPerInsulinUnit: limits.insulinCarbRatio.max.warning,
            });
        await screen.AddNewEntry();
        await expect(screen.GuardrailWarningIconPicker(2)).toBeNotVisible();
    });
    it('can set min units with no warning', async () => {
        await screen.Add();
        await screen.ApplyOne(
            {
                carbGramsPerInsulinUnit: limits.insulinCarbRatio.min.noWarning,
            },
            {
                carbGramsPerInsulinUnit: limits.insulinCarbRatio.max.noWarning,
            });
        await screen.AddNewEntry();
        await expect(screen.GuardrailWarningIconPicker(3)).toBeNotVisible();
    });
    it('can set min units with warning', async () => {
        await screen.Add();
        await screen.ApplyOne(
            {
                carbGramsPerInsulinUnit: limits.insulinCarbRatio.min.warning,
            },
            {
                carbGramsPerInsulinUnit: limits.insulinCarbRatio.min.noWarning,
            });
        await screen.AddNewEntry();
        await expect(screen.GuardrailWarningIconPicker(4)).toBeVisible();
    });
    it('can set min units at limit', async () => {
        await screen.Add();
        await screen.ApplyOne(
            {
                carbGramsPerInsulinUnit: limits.insulinCarbRatio.min.limit,
            },
            {
                carbGramsPerInsulinUnit: limits.insulinCarbRatio.min.warning,
            });
        await screen.AddNewEntry();
        await expect(screen.GuardrailWarningIconPicker(5)).toBeVisible();
    });
};

module.exports = { insulinCarbRatioTests };
