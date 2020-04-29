
const { limits } = require('../../src/index');

var maxTempBasalRate = (test) => {
    it('set below max limit', async () => {
        await test.settingsScreen.SetDeliveryLimits({
            maxBolus: '1.0',
            maxBasalRate: limits.basalDelivery.max.limit - limits.basalDelivery.step
        });
        //TODO assert NO warning
    });

    it('set at max limit', async () => {
        await test.settingsScreen.SetDeliveryLimits({
            maxBolus: '1.0',
            maxBasalRate: limits.basalDelivery.max.limit
        });
        //TODO assert on warning
    });
    it('cannot above max limit', async () => {
        await test.settingsScreen.SetDeliveryLimits({
            maxBolus: '1.0',
            maxBasalRate: limits.basalDelivery.max.limit + limits.basalDelivery.step
        });
        //TODO assert warning
    });
};

module.exports = { maxTempBasalRate };
