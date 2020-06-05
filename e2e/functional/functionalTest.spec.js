const { Test, Config } = require('../../src/index');
const { guardrailsTests } = require('../../tests/guardrails/index');

describe('functional test', () => {
    var test = new Test();
    var config = new Config();
    it('prepare test', async () => {
        let testConfig = config.prepare();
        test = test.withLanguage(testConfig.text).withLimits(testConfig.limits);
        await test.prepare();
        let settings = await test.OpenSettingsScreen();
        await settings.AddPumpSimulator();
    });
    describe('guardrails', () => {
        describe('max bolus', () => {
            guardrailsTests.maxBolusTests(test);
        });
        describe('insulin sensitivity schedule', () => {
            guardrailsTests.insulinSensitivityScheduleTests(test);
        });
        describe('max temp basal rate', () => {
            guardrailsTests.maxTempBasalRateTests(test);
        });
        describe('suspend threshold', () => {
            guardrailsTests.suspendThresholdTests(test);
        });
        describe('correction range schedule', () => {
            guardrailsTests.correctionRangeScheduleTests(test);
        });
        describe('insulin carb ratio', () => {
            guardrailsTests.insulinCarbRatioTests(test);
        });
        //TODO: update when development work complete
        describe.skip('basal rate schedule', () => {
            guardrailsTests.basalRateScheduleTests(test);
        });
    });
});
