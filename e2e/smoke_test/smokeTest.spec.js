const {setup, assert, match} = require('../../src/loopUI');

describe('smoke test', () => {
    beforeAll(async () => {
        await setup.lauchLoop();
    });
    describe.skip('simulators', () => {
        it('should set closed loop', async () => {
            await setup.setClosedLoop();
        });
        it('should add simulator pump', async () => {
            await setup.addSimulatorPump();
        });
        it('should configure simulator pump', async () => {
            await setup.simulatorPumpBasalSettings('0.1 U/hr');
            await setup.simulatorPumpDeliveryLimitsSettings('1.0', '10.0');
        });
        it('should add simulator CGM', async () => {
            await setup.addSimulatorCGM();
        });
        it('should configure simulator CGM', async () => {
            await setup.addSimulatorCGMModel(setup.CGMSimulatorModel.Constant, ['100']);
            await setup.addSimulatorCGMEffect(setup.CGMSimulatorEffects.GlucoseNoise);
        });
    });
    describe('charts', () => {
        it('should have Active Carbohydrates section', async () => {
            await assert.isAccessibilityText('Active Carbohydrates');
        });
        it('should be able to drill into Active Carbohydrates section', async () => {
            await match.accessibilityText('Active Carbohydrates').tap();
            await device.takeScreenshot('Active Carbohydrates');
            await match.accessibilityBackButton('Status').tap();
        });
        it('should have Active Insulin section', async () => {
            await assert.isAccessibilityText('Active Insulin');
        });
        it('should have Insulin Delivery section', async () => {
            await assert.isAccessibilityText('Insulin Delivery');
        });
        it('should have Glucose section', async () => {
            await assert.isAccessibilityText('Glucose');
        });
        it('should be able to drill into Glucose section', async () => {
            await match.accessibilityText('Glucose').tap();
            await device.takeScreenshot('Glucose');
            await match.accessibilityBackButton('Status').tap();
        });
    });
    describe('menu', () => {
        it('should include Add Meal option', async () => {
            await assert.isAccessibilityButton('Add Meal');
        });
        it('should include Bolus option', async () => {
            await assert.isAccessibilityButton('Bolus');
        });
        it('should include Settings option', async () => {
            await assert.isAccessibilityButton('Settings');
        });
    });
});

