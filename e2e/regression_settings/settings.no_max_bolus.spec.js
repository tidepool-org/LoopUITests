const { loop } = require('../../src/index');

describe('Closed loop is not allowed when settings are not applied for max bolus', () => {
    it('launch loop', async () => {
        await loop.Launch();
    });
    it('setup without max bolus rates applied', async () => {
        let noMaxBolus = loop.settings.default;
        noMaxBolus.DeliveryLimits = { maxBolus: '', maxBasalRate: '5.0' };
        await loop.Configure({ scenario: 'flat_cgm_trace', settings: noMaxBolus });
    });
    it('should not be in closed loop mode', async () => {
        await loop.screens.home.ExpectLoopNotYetRun();
    });
    it('should show error that indicates why not in closed loop mode', async () => {
        await loop.screens.home.ExpectLoopStatusInsulinAlert()
    });
});

