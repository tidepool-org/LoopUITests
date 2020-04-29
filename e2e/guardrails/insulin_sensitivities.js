const { limits } = require('../../src/index');

var insulinSensitivities = (test) => {

    it('can set max limit', async () => {
        await test.settingsScreen.SetInsulinSensitivities(
            [{ time: '12:00 AM', bgValuePerInsulinUnit: limits.insulinSensitivities.max.limit }],
            { fromSettings: true, toSettings: false }
        );
        //TODO assert on warning
    });
    it('can set max warning', async () => {
        await test.settingsScreen.SetInsulinSensitivities(
            [{ time: '12:30 AM', bgValuePerInsulinUnit: limits.insulinSensitivities.max.warning }],
            { fromSettings: false, toSettings: false }
        );
        //TODO assert on warning
    });
    it('can set below max warning', async () => {
        await test.settingsScreen.SetInsulinSensitivities(
            [{ time: '1:00 AM', bgValuePerInsulinUnit: limits.insulinSensitivities.max.warning - limits.insulinSensitivities.step }],
            { fromSettings: false, toSettings: false }
        );
        //TODO assert NO warning
    });
    it('can set above min warning', async () => {
        await test.settingsScreen.SetInsulinSensitivities(
            [{ time: '1:30 AM', bgValuePerInsulinUnit: limits.insulinSensitivities.min.warning + limits.insulinSensitivities.step }],
            { fromSettings: false, toSettings: false }
        );
        //TODO assert NO warning
    });
    it('can set min warning', async () => {
        await test.settingsScreen.SetInsulinSensitivities(
            [{ time: '2:00 AM', bgValuePerInsulinUnit: limits.insulinSensitivities.min.warning }],
            { fromSettings: false, toSettings: false }
        );
        //TODO assert on warning
    });
    it('can set at min', async () => {
        await test.settingsScreen.SetInsulinSensitivities(
            [{ time: '2:30 AM', bgValuePerInsulinUnit: limits.insulinSensitivities.min.limit }],
            { fromSettings: false, toSettings: false }
        );
        //TODO assert on warning
    });
    it('cannot set above max limit', async () => {
        try {
            await test.settingsScreen.SetInsulinSensitivities(
                [{ time: '3:00 AM', bgValuePerInsulinUnit: limits.insulinSensitivities.max.limit + limits.insulinSensitivities.step }],
                { fromSettings: false, toSettings: false }
            );
        } catch (error) {
            //TODO assert cannot be set
        }
    });
    it('cannot set below the min limit', async () => {
        try {
            await test.settingsScreen.SetInsulinSensitivities(
                [{ time: '3:30 AM', bgValuePerInsulinUnit: limits.insulinSensitivities.min.limit - limits.insulinSensitivities.step }],
                { fromSettings: false, toSettings: true }
            );
        } catch (error) {
            //TODO assert cannot be set
        }
    });
};

module.exports = { insulinSensitivities };
