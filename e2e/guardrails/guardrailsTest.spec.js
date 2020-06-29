const { Test, Config } = require('../../src/index');
const guardrailsTests = require('../../tests/guardrails/index');

describe('guardrails test', () => {
    var test = new Test();
    var config = new Config();
    it('prepare test', async () => {
        config = await config.prepare();
        test = test.withLanguage(config.text).withLimits(config.limits).withScreenDefaults(config.screenDefaults);
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
    //TODO: add back when guardrails work is complete
    describe.skip('basal rate schedule', () => {
        guardrailsTests.basalRateSchedule(test);
    });
    //TODO: add back when guardrails work is complete
    describe.skip('max temp basal rate', () => {
        guardrailsTests.maxTempBasalRate(test);
    });
    //TODO: add back when guardrails work is complete
    describe.skip('max bolus', () => {
        guardrailsTests.maxBolus(test);
    });
});
