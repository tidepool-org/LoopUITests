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
        await test.prepare();
    });
    describe('insulin carb ratio', () => {
        guardrails.insulinCarbRatioTest(test);
    });
    describe('correction range schedule', () => {
        guardrails.correctionRangeScheduleTest(test);
    });
    describe('basal rate schedule', () => {
        guardrails.basalRateScheduleTest(test);
    });
});
