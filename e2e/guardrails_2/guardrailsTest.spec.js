const { Test, Config } = require('../../src/index');
const guardrails = require('../../tests/guardrails/index');

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
    describe('insulin sensitivity schedule', () => {
        guardrails.insulinSensitivityScheduleTest(test);
    });
    describe('delivery limits', () => {
        guardrails.deliveryLimitsTest(test);
    });
    describe('suspend threshold', () => {
        guardrails.suspendThresholdTest(test);
    });
});
