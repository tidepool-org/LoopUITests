const { Test, Config } = require('../../src/index');
const functionalityTests = require('../../tests/functionality/index');

describe('functional test', () => {
    var test = new Test();
    var config = new Config();
    it('prepare test', async () => {
        config = await config.prepare();
        test = test.withLanguage(config.text)
            .withLimits(config.limits)
            .withScreenDefaults(config.screenDefaults)
            .withSettingDefault(config.settingDefault)
            .withStartScreen('home')
            .withAuth();
        await test.prepare();

    });
    describe('home screen', () => {
        functionalityTests.homeScreen(test);
    });
    describe('cgm simulator screen', () => {
        functionalityTests.cgmSimulatorScreen(test);
    });
    describe('settings screen', () => {
        functionalityTests.settingsScreen(test);
    });
    describe('pump simulator screen', () => {
        functionalityTests.pumpSimulatorScreen(test);
    });
    describe('configured pump', () => {
        it('add pump', async () => {
            await test.addConfiguredPump({
                correctionRange: {
                    expected: { min: 100, max: 120, }
                },
                deliveryLimits: {
                    basal: { expected: { rate: 34.00 }, },
                    bolus: { expected: { amount: 18.00 }, },
                }
            });
        });
        describe('carb entry screen', () => {
            functionalityTests.carbEntryScreen(test);
        });
        describe('bolus screen', () => {
            functionalityTests.bolusScreen(test);
        });
    });
});
