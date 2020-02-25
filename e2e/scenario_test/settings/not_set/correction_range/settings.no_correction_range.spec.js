const { setup, pump, cgm, match, settings } = require('../../../../../src/index');

describe('Pump Settings', () => {
    beforeAll(async () => {
        await setup.LaunchLoop();
        await setup.LoadDeviceScenariosFromDisk(device.id);
        await cgm.AddSimulator();
        await pump.AddSimulator();
    });
    describe('Closed loop is not allowed', () => {
        describe('When correction range is not set', () => {
            beforeAll(async () => {
                await setup.LoadScenario('flat_cgm');
            });
            it('should set the suspend threshold', async () => {
                await settings.SuspendThreshold('130');
            });
            it('should set the basal rates', async () => {
                await settings.BasalRates([{time:'12:00 AM', unitsPerHour:'0.1'}]);
            });
            it('should set the delivery limits', async () => {
                await settings.DeliveryLimits({maxBasalRate:'0.5', maxBolus:'10.0'});
            });
            it('should set the insulin model', async () => {
                await settings.SelectInsulinModel(settings.InsulinModel.RapidAdults);
            });
            it('should set the carb ratios', async () => {
                await settings.CarbRatios([{time:'12:00 AM', carbGramsPerInsulinUnit:'8'}]);
            });
            it('should set insulin sensitivites set', async () => {
                await settings.InsulinSensitivities([{time:'12:00 AM', bgValuePerInsulinUnit:'500'}]);
            });
            it('should toggle on closed loop', async () => {
                await settings.ClosedLoop();
            });
            it('should not be in closed loop mode', async () => {
                await expect(match.loop.Icon()).toHaveLabel('Waiting for first run');
            });
            it('should show configuration error that indicates why not in closed loop mode', async () => {
                await match.loop.Icon().tap();
                await waitFor(match.accessible.AlertLabel('Configuration Error: Check Settings')).toExist().withTimeout(2000);
                await match.accessible.Button('OK').tap();
            });
        });
    });
});

