const { Test, screenName } = require('../../src/index');
const { guardrailsTests } = require('../../tests/guardrails/index');

describe('functional test', () => {
    var test = new Test();
    beforeAll(async () => {
        await test.prepare();
        let settings = await test.OpenSettingsScreen();
        await settings.AddPumpSimulator();
    });
    describe('guardrails', () => {
        describe('insulin sensitivity schedule', () => {
            guardrailsTests.insulinSensitivityScheduleTests(test);
        });
        // describe('max bolus', () => {
        //     guardrailsTests.maxBolusTests(test);
        // });
        // describe('basal rate schedule', () => {
        //     guardrailsTests.basalRateScheduleTests(test);
        // });
        // describe('insulin sensitivity schedule', () => {
        //     guardrailsTests.insulinSensitivityScheduleTests(test);
        // });
        // describe('max temp basal rate', () => {
        //     guardrailsTests.maxTempBasalRateTests(test);
        // });
        // describe('correction range schedule', () => {
        //     guardrailsTests.correctionRangeScheduleTests(test);
        // });
        // describe.skip('insulin carb ratio', () => {
        //     guardrailsTests.insulinCarbRatioTests(test);
        // });
        // describe.skip('suspend threshold', () => {
        //     guardrailsTests.suspendThresholdTests(test);
        // });
    });
});
