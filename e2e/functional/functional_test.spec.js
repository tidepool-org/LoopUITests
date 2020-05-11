const { Test } = require('../../src/index');
const { guardrailsTests } = require('../../tests/guardrails/index');

describe('functional test', () => {
    var test = new Test();
    beforeAll(async () => {
        await test.prepare();
        let settings = await test.OpenSettingsScreen();
        await settings.AddPumpSimulator();
    });
    describe('guardrails', () => {
        describe.skip('insulin sensitivity schedule', () => {
            guardrailsTests.insulinSensitivityScheduleTests(test);
        });
        describe.skip('max bolus', () => {
            guardrailsTests.maxBolusTests(test);
        });
        describe.skip('basal rate schedule', () => {
            guardrailsTests.basalRateScheduleTests(test);
        });
        describe.skip('insulin sensitivity schedule', () => {
            guardrailsTests.insulinSensitivityScheduleTests(test);
        });
        describe.skip('max temp basal rate', () => {
            guardrailsTests.maxTempBasalRateTests(test);
        });
        describe.skip('correction range schedule', () => {
            guardrailsTests.correctionRangeScheduleTests(test);
        });
        describe.skip('insulin carb ratio', () => {
            guardrailsTests.insulinCarbRatioTests(test);
        });
        describe('suspend threshold', () => {
            guardrailsTests.suspendThresholdTests(test);
        });
    });
});
