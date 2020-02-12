const { setup, pump, cgm } = require('../../src/index');

describe('Pump Settings', () => {
    beforeAll(async () => {
        await setup.launchLoop();
        await setup.loadScenarios(device.id);
        await cgm.add();
        await pump.add();
        await setup.loadScenario('Flat cgm');
    });
    describe('Closed loop is not allowed', () => {
        describe('When correction range is not set', () => {
            it('should not have correction range set', async () => {
                await pump.checkCorrectionRange(false);
            });
            it('should set the suspend threshold', async () => {
                await pump.setSuspend('130');
            });
            it('should set the basal rates', async () => {
                await pump.setBasalRates('0.1');
            });
            it('should set the delivery limits', async () => {
                await pump.setDeliveryLimits('0.5', '10.0');
            });
            it('should set the insulin model', async () => {
                await pump.setInsulinModel(pump.insulinModel.RapidAdults);
            });
            it('should set the carb ratios', async () => {
                await pump.setCarbRatios('8');
            });
            it('should set insulin sensitivites set', async () => {
                await pump.setInsulinSensitivities('500');
            });
            it('should not allow closed loop mode', async () => {
                await setup.setClosedLoop();
            });
        });
    });
});

