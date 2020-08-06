const { Test, Config } = require('../../src/index');
const guardrailsTests = require('../../tests/guardrails/index');

//TODO: the following require settings and pump setup once ready
describe('guardrails test', () => {
    var test = new Test();
    var config = new Config();
    it('prepare test', async () => {
        config = await config.prepare();
        test = test.withLanguage(config.text)
            .withLimits(config.limits)
            .withScreenDefaults(config.screenDefaults)
            .withSimulators({ pump: true })
            .withStartScreen('home');
        await test.prepare();
    });
    describe.skip('insulin sensitivity schedule', () => {
        guardrailsTests.insulinSensitivitySchedule(test);
    });
    describe.skip('suspend threshold', () => {
        guardrailsTests.suspendThreshold(test);
    });
    describe.skip('insulin carb ratio', () => {
        guardrailsTests.insulinCarbRatio(test);
    });
    describe.skip('correction range schedule', () => {
        guardrailsTests.correctionRangeSchedule(test);
    });
    describe.skip('basal rate schedule', () => {
        guardrailsTests.basalRateSchedule(test);
    });
    describe('delivery limits', () => {
        guardrailsTests.deliveryLimits(test);
    });
});
