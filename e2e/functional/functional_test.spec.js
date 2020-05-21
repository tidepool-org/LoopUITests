const { Test } = require('../../src/index');
const { guardrailsTests } = require('../../tests/guardrails/index');

describe('functional test', () => {
    var test = new Test();
    it('prepare test', async () => {
        await test.prepare();
        let settings = await test.OpenSettingsScreen();
        await settings.AddPumpSimulator();
    });
    describe('guardrails', () => {
        // describe('max bolus', () => {
        //     guardrailsTests.maxBolusTests(test);
        // });
        // describe('basal rate schedule', () => {
        //     guardrailsTests.basalRateScheduleTests(test);
        // });
        describe('insulin sensitivity schedule', () => {
            guardrailsTests.insulinSensitivityScheduleTests(test);
        });
        // describe('max temp basal rate', () => {
        //     guardrailsTests.maxTempBasalRateTests(test);
        // });
        // describe('suspend threshold', () => {
        //     guardrailsTests.suspendThresholdTests(test);
        // });
        //TODO: update when development work complete
        describe.skip('correction range schedule', () => {
            guardrailsTests.correctionRangeScheduleTests(test);
        });
        //TODO: update when development work complete
        describe.skip('insulin carb ratio', () => {
            guardrailsTests.insulinCarbRatioTests(test);
        });
        describe.skip('insulin sensitivity schedule', () => {
            guardrailsTests.insulinSensitivityScheduleTests(test);
        });
    });
});
