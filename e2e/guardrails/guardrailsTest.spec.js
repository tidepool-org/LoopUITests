const { Test, Config } = require('../../src/index');
const guardrailsTests = require('../../tests/guardrails/index');

//TODO: the following require settings and pump setup once ready
describe.skip('guardrails test', () => {
    var test = new Test();
    var config = new Config();
    it('prepare test', async () => {
        config = await config.prepare();
        test = test.withLanguage(config.text)
            .withLimits(config.limits)
            .withScreenDefaults(config.screenDefaults)
            .withStartScreen('home');
        await test.prepare();
    });
    it('add required pump simulator', async () => {
        let settings = await test.OpenSettingsScreen();
        await settings.AddPumpSimulator();
    });
    describe('insulin sensitivity schedule', () => {
        guardrailsTests.insulinSensitivitySchedule(test);
    });
    describe('suspend threshold', () => {
        guardrailsTests.suspendThreshold(test);
    });
    describe('insulin carb ratio', () => {
        guardrailsTests.insulinCarbRatio(test);
    });
    describe('correction range schedule', () => {
        guardrailsTests.correctionRangeSchedule(test);
    });
    describe('basal rate schedule', () => {
        guardrailsTests.basalRateSchedule(test);
    });
    describe('delivery limits', () => {
        guardrailsTests.deliveryLimits(test);
    });
});
