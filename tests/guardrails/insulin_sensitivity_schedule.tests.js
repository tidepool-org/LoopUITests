const { limits } = require('../../src/index');

var insulinSensitivityScheduleTests = (test) => {
    var screen;
    it('open', async () => {
        screen = await test.settingsScreen.OpenInsulinSensitivitiesScreen();
    });
    it('cannot set above max limit', async () => {
        try {
            await screen.Apply({ time: '12:00 AM', bgValuePerInsulinUnit: limits.insulinSensitivities.max.limit + limits.insulinSensitivities.step });
        } catch (error) {
            //TODO assert cannot be set
            await screen.Save();
        }
    });
    it('can set max limit', async () => {
        await screen.Edit({ time: '12:00 AM', bgValuePerInsulinUnit: limits.insulinSensitivities.max.limit });
        await screen.Save();
        //TODO assert on warning
    });
    it('can set max warning', async () => {
        await screen.Edit({ time: '12:00 AM', bgValuePerInsulinUnit: limits.insulinSensitivities.max.warning });
        await screen.Save();
        //TODO assert on warning
    });
    it('can set below max warning', async () => {
        await screen.Edit({ time: '12:00 AM', bgValuePerInsulinUnit: limits.insulinSensitivities.max.warning - limits.insulinSensitivities.step });
        await screen.Save();
        //TODO assert NO warning
    });
    it('can set above min warning', async () => {
        await screen.Edit({ time: '12:00 AM', bgValuePerInsulinUnit: limits.insulinSensitivities.min.warning + limits.insulinSensitivities.step });
        await screen.Save();
        //TODO assert NO warning
    });
    it('can set min warning', async () => {
        await screen.Edit({ time: '12:00 AM', bgValuePerInsulinUnit: limits.insulinSensitivities.min.warning });
        await screen.Save();
        //TODO assert on warning
    });
    it('can set at min', async () => {
        await screen.Edit({ time: '12:00 AM', bgValuePerInsulinUnit: limits.insulinSensitivities.min.limit });
        await screen.Save();
        //TODO assert on warning
    });

    it('cannot set below the min limit', async () => {
        try {
            await screen.Edit({ time: '12:00 AM', bgValuePerInsulinUnit: limits.insulinSensitivities.min.limit - limits.insulinSensitivities.step });
        } catch (error) {
            //TODO assert cannot be set
            await screen.Save();
        }
    });
    it('close', async () => {
        await screen.Close();
    });
};

module.exports = { insulinSensitivityScheduleTests };
