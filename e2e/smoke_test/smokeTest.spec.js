const { setup, assert, match } = require('../../src/loopUI');

describe('smoke test', () => {
    beforeAll(async () => {
        await setup.lauchLoop();
    });
    describe('simulators', () => {
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
            assert.isAccessibilityText('Active Carbohydrates');
        });
        it('should be able to drill into Active Carbohydrates section', async () => {
            await match.accessibilityText('Active Carbohydrates').tap();
            await device.takeScreenshot('Active Carbohydrates');
            await match.accessibilityBackButton('Status').tap();
        });
        it('should have Active Insulin section', async () => {
            assert.isAccessibilityText('Active Insulin');
        });
        it('should have Insulin Delivery section', async () => {
            assert.isAccessibilityText('Insulin Delivery');
        });
        it('should have Glucose section', async () => {
            assert.isAccessibilityText('Glucose');
        });
        it.skip('should be able to drill into Glucose section', async () => {
            await match.accessibilityText('Glucose').tap();
            await device.takeScreenshot('Glucose');
            await match.accessibilityBackButton('Status').tap();
        });
    });
    describe('menu', () => {
        it('should include Add Meal option', async () => {
            assert.isAccessibilityButton('Add Meal');
        });
        it('should be able to add a meal', async () => {
            await setup.addMeal('45');
        });
        it.skip('should include Bolus option', async () => {
            assert.isAccessibilityButton('Bolus');
        });
        it.skip('should be to bolus a meal', async () => {
            await setup.addBolus(5);
        });
        it('should include Settings option', async () => {
            assert.isAccessibilityButton('Settings');
        });
    });
});

