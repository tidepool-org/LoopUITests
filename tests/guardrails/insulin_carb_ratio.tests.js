const { limits } = require('../../src/index');

var insulinCarbRatioTests = (test) => {
    var screen;
    it('open', async () => {
        screen = await test.settingsScreen.OpenCarbRatiosScreen();
    });
    it('cannot set above max limit', async () => {
        await screen.Apply({ time: '12:00 AM', carbGramsPerInsulinUnit: limits.insulinCarbRatio.max.limit + limits.insulinCarbRatio.step });
        //TODO assert on warning
    });
    it('can set max limit', async () => {
        await screen.Apply({ time: '12:00 AM', carbGramsPerInsulinUnit: limits.insulinCarbRatio.max.limit });
        //TODO assert on warning
    });
    it('can set max warning', async () => {
        await screen.Apply({ time: '12:00 AM', carbGramsPerInsulinUnit: limits.insulinCarbRatio.max.warning });
        //TODO assert on warning
    });
    it('can set below max warning', async () => {
        await screen.Apply({ time: '12:00 AM', carbGramsPerInsulinUnit: limits.insulinCarbRatio.max.warning - limits.insulinCarbRatio.step });
        //TODO assert NO warning
    });
    it('can set above min warning', async () => {
        await screen.Apply({ time: '12:00 AM', carbGramsPerInsulinUnit: limits.insulinCarbRatio.min.warning + limits.insulinCarbRatio.step });
        //TODO assert NO warning
    });
    it('can set min warning', async () => {
        await screen.Apply({ time: '12:00 AM', carbGramsPerInsulinUnit: limits.insulinCarbRatio.min.warning });
        //TODO assert on warning
    });
    it('can set at min', async () => {
        await screen.Apply({ time: '12:00 AM', carbGramsPerInsulinUnit: limits.insulinCarbRatio.min.limit });
        //TODO assert on warning
    });

    it('cannot set below the min limit', async () => {
        await screen.Apply({ time: '12:00 AM', carbGramsPerInsulinUnit: limits.insulinCarbRatio.min.limit - limits.insulinCarbRatio.step });
    });
    it('close', async () => {
        await screen.Close();
    });
};

module.exports = { insulinCarbRatioTests };
