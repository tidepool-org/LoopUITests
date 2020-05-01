
const { limits } = require('../../src/index');

var maxTempBasalRateTests = (test) => {
    var testDefaultBolus = 1.0;
    var screen;
    it('open', async () => {
        screen = await test.settingsScreen.OpenDeliveryLimitsScreen();
    });
    it('set below max limit', async () => {
        await screen.Apply({
            maxBolus: testDefaultBolus,
            maxBasalRate: limits.basalDelivery.max.limit - limits.basalDelivery.step
        });
        //TODO assert NO warning
    });

    it('set at max limit', async () => {
        await screen.Apply({
            maxBolus: testDefaultBolus,
            maxBasalRate: limits.basalDelivery.max.limit
        });
        //TODO assert on warning
    });
    it('cannot above max limit', async () => {
        await screen.Apply({
            maxBolus: testDefaultBolus,
            maxBasalRate: limits.basalDelivery.max.limit + limits.basalDelivery.step
        });
        //TODO assert warning
    });
    it('close', async () => {
        await screen.Close();
    });
};

module.exports = { maxTempBasalRateTests };
