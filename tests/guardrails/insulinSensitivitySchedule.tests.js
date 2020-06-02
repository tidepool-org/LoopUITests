const { limits } = require('../../src/index');

var insulinSensitivityScheduleTests = (test) => {
    var screen;
    beforeAll(async () => {
        screen = await test.settingsScreen.OpenInsulinSensitivitiesScreen();
    });
    afterAll(async () => {
        await screen.Cancel();
    });
    it('can set max units with warning', async () => {
        await screen.Add();
        await screen.ApplyOne(
            {
                time: '12:00 AM',
                bgValuePerInsulinUnit: limits.insulinSensitivities.max.limit
            }
        );
        await screen.AddNewEntry();
        await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeVisible();
    });
    it('can set max lower boundary units with warning', async () => {
        await screen.Add();
        await screen.ApplyOne(
            { time: '12:00 AM', bgValuePerInsulinUnit: limits.insulinSensitivities.max.warning },
            { time: '12:00 AM', bgValuePerInsulinUnit: limits.insulinSensitivities.max.limit }
        );
        await screen.AddNewEntry();
        await expect(screen.GuardrailWarningIconPicker({ index: 1 })).toBeVisible();
    });
    it('can set below max lower boundary units without warning', async () => {
        await screen.Add();
        await screen.ApplyOne(
            { time: '12:00 AM', bgValuePerInsulinUnit: limits.insulinSensitivities.max.noWarning },
            { time: '12:00 AM', bgValuePerInsulinUnit: limits.insulinSensitivities.max.warning },
        );
        await screen.AddNewEntry();
        await expect(screen.GuardrailWarningIconPicker({ index: 2 })).toBeNotVisible();
    });

    it('can set above min lower boundary units without warning', async () => {
        await screen.Add();
        await screen.ApplyOne(
            { time: '12:00 AM', bgValuePerInsulinUnit: limits.insulinSensitivities.min.noWarning },
            { time: '12:00 AM', bgValuePerInsulinUnit: limits.insulinSensitivities.max.noWarning },
        );
        await screen.AddNewEntry();
        await expect(screen.GuardrailWarningIconPicker({ index: 3 })).toBeNotVisible();
    });

    it('can set at min lower boundary units with warning', async () => {
        await screen.Add();
        await screen.ApplyOne(
            { time: '12:00 AM', bgValuePerInsulinUnit: limits.insulinSensitivities.min.warning },
            { time: '12:00 AM', bgValuePerInsulinUnit: limits.insulinSensitivities.min.noWarning },
        );
        await screen.AddNewEntry();
        await expect(screen.GuardrailWarningIconPicker({ index: 4 })).toBeVisible();
    });
    it('can set at min limit with warning', async () => {
        await screen.Add();
        await screen.ApplyOne(
            { time: '12:00 AM', bgValuePerInsulinUnit: limits.insulinSensitivities.min.limit },
            { time: '12:00 AM', bgValuePerInsulinUnit: limits.insulinSensitivities.min.warning },
        );
        await screen.AddNewEntry();
        await expect(screen.GuardrailWarningIconPicker({ index: 5 })).toBeVisible();
    });
};

module.exports = { insulinSensitivityScheduleTests };
