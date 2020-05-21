const { limits } = require('../../src/index');

var insulinSensitivityScheduleTests = (test) => {
    var screen;
    it('setup', async () => {
        screen = await test.settingsScreen.OpenInsulinSensitivitiesScreen();
    });
    it('can set max units with warning', async () => {
        await screen.Add();
        await screen.Apply({ time: '12:00 AM', bgValuePerInsulinUnit: limits.insulinSensitivities.max.limit });
        await screen.AddNewEntry();
        await expect(screen.GuardrailWarningIconPicker()).toBeVisible();
        await expect(screen.GuardrailWarningIconSave()).toBeVisible();
    });
    it.skip('can set max lower boundary units with warning', async () => {
        await screen.Edit(
            { time: '12:00 AM', bgValuePerInsulinUnit: limits.insulinSensitivities.max.warning },
            { time: '12:00 AM', bgValuePerInsulinUnit: limits.insulinSensitivities.max.limit }
        );
        await expect(screen.GuardrailWarningIconPicker()).toBeVisible();
        await expect(screen.GuardrailWarningIconSave()).toBeVisible();
    });
    it.skip('can set below max lower boundary units without warning', async () => {
        await screen.Edit(
            { time: '12:00 AM', bgValuePerInsulinUnit: limits.insulinSensitivities.max.noWarning },
            { time: '12:00 AM', bgValuePerInsulinUnit: limits.insulinSensitivities.max.warning },
        );
        await expect(screen.GuardrailWarningIconPicker()).toBeNotVisible();
        await expect(screen.GuardrailWarningIconSave()).toBeNotVisible();
    });
};

module.exports = { insulinSensitivityScheduleTests };
