const { Test, screenName } = require('../../src/index');
const { guardrailsTests } = require('../../tests/guardrails/index');

describe('functional test', () => {
    var test = new Test().withSettings({ AddPumpSimulator: true }).withStartScreen(screenName.settings);
    it('should setup with pump simulator', async () => {
        await test.prepare();
    });
    describe('guardrails', () => {
        describe('insulin sensitivity schedule', () => {
            guardrailsTests.insulinSensitivityScheduleTests(test);
        });
        describe('max bolus', () => {
            guardrailsTests.maxBolusTests(test);
        });
        describe('basal rate schedule', () => {
            guardrailsTests.basalRateScheduleTests(test);
        });
        describe('insulin sensitivity schedule', () => {
            guardrailsTests.insulinSensitivityScheduleTests(test);
        });
        describe('max temp basal rate', () => {
            guardrailsTests.maxTempBasalRateTests(test);
        });
        describe('correction range schedule', () => {
            guardrailsTests.correctionRangeScheduleTests(test);
        });
        describe.skip('insulin carb ratio', () => {
            guardrailsTests.insulinCarbRatioTests(test);
        });
        describe.skip('suspend threshold', () => {
            guardrailsTests.suspendThresholdTests(test);
        });
    });

});
