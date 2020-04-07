const { loop } = require('../../src/index');

describe('Closed loop is not allowed when settings are not applied for max basal', () => {
    it('launch loop', async () => {
        await loop.Launch();
    });
    it('setup without max basal applied', async () => {
        let noMaxBasalRate = loop.settings.default;
        noMaxBasalRate.DeliveryLimits = { maxBolus: '10.0', maxBasalRate: '' };
        await loop.Configure({ scenario: 'flat_cgm_trace', settings: noMaxBasalRate });
    });
    it('should not be in closed loop mode', async () => {
        await loop.screens.home.ExpectLoopNotYetRun();
    });
    it('should show error that indicates why not in closed loop mode', async () => {
        await loop.screens.home.ExpectLoopStatusInsulinAlert()
    });
});

