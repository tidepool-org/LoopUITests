const { setup, match, pump, cgm } = require('../../src/index');

describe('settings test', () => {
    beforeAll(async () => {
        await setup.launchLoop();
        await setup.loadScenarios(device.id);
        await cgm.add();
        await pump.add();
        await setup.loadScenario('Flat cgm');
    });
    describe('Does not add correction range', () => {
        it('should not have correction range set', async () => {
            await match.accessibilityButtonBarButton('Settings').tap();
            await expect(element(by.text('Correction Range'))).toExist();
            await element(by.text('Correction Range')).tap();
            await expect(match.accessibilityButtonBarButton('Edit', false)).toExist();
            await match.accessibilityBackButton('Settings').tap();
            await match.accessibilityButtonBarButton('Done').tap();
        });
        it('should not allow closed loop mode', async () => {
            await setup.setClosedLoop();
        });
    });
    describe.skip('Does not add suspend threshold range', () => {
        it('should not have suspend threshold range set', async () => {
            await match.accessibilityButtonBarButton('Settings').tap();
            await expect(element(by.text('Suspend Threshold'))).toExist();
            await element(by.text('Suspend Threshold')).tap();
            expect(element(by.type('UIAccessibilityTextFieldElement'))).toHaveValue('Enter Suspend Threshold');
            await match.accessibilityBackButton('Settings').tap();
            await match.accessibilityButtonBarButton('Done').tap();
        });
        it('should not allow closed loop mode', async () => {
            await setup.setClosedLoop();
        });
    });
    describe.skip('Does not add basal rates', () => {
        it('should not have basal rates set', async () => {
            await match.accessibilityButtonBarButton('Settings').tap();
            await expect(element(by.text('Basal Rates'))).toExist();
            await element(by.text('Basal Rates')).tap();
            await expect(match.accessibilityButtonBarButton('Edit', false)).toExist();
            await match.accessibilityBackButton('Settings').tap();
            await match.accessibilityButtonBarButton('Done').tap();
        });
        it('should not allow closed loop mode', async () => {
            await setup.setClosedLoop();
        });
    });
    describe.skip('Does not set delivery Limits', () => {
        it('should not have delivery Limits set', async () => {
            await match.accessibilityButtonBarButton('Settings').tap();
            await expect(element(by.text('Delivery Limits'))).toExist();
            await element(by.text('Delivery Limits')).tap();

            //maximum basal rate

            //maximum bolus

            await match.accessibilityBackButton('Settings').tap();
            await match.accessibilityButtonBarButton('Done').tap();
        });
        it('should not allow closed loop mode', async () => {
            await setup.setClosedLoop();
        });
    });
    //Does not set delivery Limits
});

