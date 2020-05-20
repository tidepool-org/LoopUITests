const { Test, } = require('../../src/index');
const { smokeTests } = require('../../tests/smoke/index');

describe('smoke test', () => {
    var test = new Test();
    it('prepare test', async () => {
        await test.prepare();
    });
    describe('accessibility', () => {
        describe('home screen', () => {
            smokeTests.homeScreenAccessibilityTests(test);
        });
        describe('carb entry screen', () => {
            smokeTests.carbEntryScreenAccessibilityTests(test);
        });
        describe('settings screen', () => {
            smokeTests.settingsScreenAccessibilityTests(test);
        });
        describe('bolus screen', () => {
            smokeTests.bolusScreenAccessibilityTests(test);
        });
        describe('delivery limits settings screen', () => {
            smokeTests.settingsDeliveryLimitsScreenAccessibilityTests(test);
        });
        //TODO: update when development work complete
        describe.skip('carb ratios settings screen', () => {
            smokeTests.settingsCarbRatiosScreenAccessibilityTests(test);
        });
        //TODO: update when development work complete
        describe.skip('insulin sensitivities settings screen', () => {
            smokeTests.settingsInsulinSensitivitiesScreenAccessibilityTests(test);
        });
        //TODO: update when development work complete
        describe.skip('correction range settings screen', () => {
            smokeTests.settingsCorrectionRangeScreenAccessibilityTests(test);
        });
        //TODO: investigate issue
        describe.skip('basal rates settings screen', () => {
            smokeTests.settingsBasalRatesScreenAccessibilityTests(test);
        });
    });
    describe('functionality', () => {
        describe('home screen', () => {
            smokeTests.homeScreenFunctionalityTests(test);
        });
        describe('carb entry screen', () => {
            smokeTests.carbEntryScreenFunctionalityTests(test);
        });
        describe('settings screen', () => {
            smokeTests.settingsScreenFunctionalityTests(test);
        });
        describe('cleanup', () => {
            smokeTests.cleanupFunctionalityTests(test);
        });
    });
});
