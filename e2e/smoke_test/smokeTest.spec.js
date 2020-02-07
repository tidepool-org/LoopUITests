const { setup, assert, match, pump, cgm } = require('../../src/index');

describe('smoke test', () => {
    beforeAll(async () => {
        console.log('smoke test setup');
        await setup.launchLoop();
    });
    describe('simulators', () => {
        it('should set closed loop', async () => {
            console.log('smoke test simulators ...');
            await setup.setClosedLoop();
        });
        it('should add simulator pump', async () => {
            await pump.add();
        });
        it('should configure simulator pump', async () => {
            await pump.setBasal('0.1 U/hr');
            await pump.setDeliveryLimits('1.0', '10.0');
        });
        it('should add simulator CGM', async () => {
            await cgm.add();
        });
        it.skip('should configure simulator CGM', async () => {
            await cgm.setModel(cgm.simulatorModel.Constant, ['100']);
            await cgm.setEffect(cgm.simulatorEffects.GlucoseNoise);
        });
    });
    describe.skip('charts', () => {
        it('should have Active Carbohydrates section', async () => {
            assert.isAccessibilityText('Active Carbohydrates');
        });
        it('should be able to drill into Active Carbohydrates section', async () => {
            await match.accessibilityText('Active Carbohydrates').tap();
            await assert.isAccessibilityHeader('Carbohydrates');
            //await device.takeScreenshot('Active Carbohydrates');
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
            await assert.isAccessibilityHeader('Predicted Glucose');
            //await device.takeScreenshot('Glucose');
            await match.accessibilityBackButton('Status').tap();
        });
    });
    describe.skip('menu items', () => {
        it('should include Add Meal option', async () => {
            await assert.isAccessibilityButton('Add Meal');
        });
        it('should be able to add a meal', async () => {
            await setup.addMeal('5');
        });
        it('should include Bolus option', async () => {
            assert.isAccessibilityButton('Bolus');
        });
        it.skip('should be to do a bolus', async () => {
            await setup.addBolus('1');
        });
        it('should include Settings option', async () => {
            assert.isAccessibilityButton('Settings');
        });
    });
});

