const { Test, Config } = require('../../src/index');
const guardrails = require('../../tests/guardrails/index');

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
        guardrails.insulinSensitivityScheduleTest(test);
    });
    describe.skip('suspend threshold', () => {
        guardrails.suspendThresholdTest(test);
    });
    describe.skip('insulin carb ratio', () => {
        guardrails.insulinCarbRatioTest(test);
    });
    describe.skip('correction range schedule', () => {
        guardrails.correctionRangeScheduleTest(test);
    });
    describe.skip('basal rate schedule', () => {
        guardrails.basalRateScheduleTest(test);
    });
    describe('delivery limits', () => {
        guardrails.deliveryLimitsTest(test);
    });
});
