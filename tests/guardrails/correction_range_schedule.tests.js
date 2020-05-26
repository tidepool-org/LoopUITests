const { limits } = require('../../src/index');

var correctionRangeScheduleTests = (test) => {
    var screen;
    beforeAll(async () => {
        screen = await test.settingsScreen.OpenCorrectionRangeScreen();
    });
    afterAll(async () => {
        await screen.Cancel();
    });
    it('can set max units at limit', async () => {
        await screen.Add();
        await screen.Apply({
            min: 100,
            max: limits.correctionRange.max.limit,
        });
        await screen.AddNewEntry();
        await expect(screen.GuardrailWarningIconPicker(0)).toBeVisible();
    });
    it('can set max units with warning', async () => {
        await screen.Add();
        await screen.Apply(
            {
                min: 100,
                max: limits.correctionRange.max.warning,
            },
            {
                min: 100,
                max: limits.correctionRange.max.limit,
            });
        await screen.AddNewEntry();
        await expect(screen.GuardrailWarningIconPicker(1)).toBeVisible();
    });
    it('can set max units with no warning', async () => {
        await screen.Add();
        await screen.Apply(
            {
                min: 100,
                max: limits.correctionRange.max.noWarning,
            },
            {
                min: 100,
                max: limits.correctionRange.max.warning,
            });
        await screen.AddNewEntry();
        await expect(screen.GuardrailWarningIconPicker(2)).toBeNotVisible();
    });
    it('can set min units with no warning', async () => {
        await screen.Add();
        await screen.Apply(
            {
                min: limits.correctionRange.min.noWarning,
                max: limits.correctionRange.max.noWarning,
            },
            {
                min: 100,
                max: limits.correctionRange.max.noWarning,
            });
        await screen.AddNewEntry();
        await expect(screen.GuardrailWarningIconPicker(3)).toBeNotVisible();
    });
    it('can set min units with warning', async () => {
        await screen.Add();
        await screen.Apply(
            {
                min: limits.correctionRange.min.warning,
                max: limits.correctionRange.max.noWarning,
            },
            {
                min: limits.correctionRange.min.noWarning,
                max: limits.correctionRange.max.noWarning,
            });
        await screen.AddNewEntry();
        await expect(screen.GuardrailWarningIconPicker(4)).toBeVisible();
    });
    it('can set min units at limit', async () => {
        await screen.Add();
        await screen.Apply(
            {
                min: limits.correctionRange.min.limit,
                max: limits.correctionRange.max.noWarning,
            },
            {
                min: limits.correctionRange.min.warning,
                max: limits.correctionRange.max.noWarning,
            });
        await screen.AddNewEntry();
        await expect(screen.GuardrailWarningIconPicker(5)).toBeVisible();
    });
};

module.exports = { correctionRangeScheduleTests };
