const { Test, Config } = require('../../src/index');
const guardrailsTests = require('../../tests/guardrails/index');
const functionalityTests = require('../../tests/functionality/index');

describe('functional test', () => {
    var test = new Test();
    var config = new Config();
    it('prepare test', async () => {
        config = await config.prepare();
        test = test.withLanguage(config.text).withLimits(config.limits).withScreenDefaults(config.screenDefaults);
        await test.prepare();
    });
    describe.skip('functionality', () => {
        describe('home screen', () => {
            functionalityTests.homeScreenFunctionalityTests(test);
        });
        describe('carb entry screen', () => {
            functionalityTests.carbEntryScreenFunctionalityTests(test);
        });
        describe('settings screen', () => {
            functionalityTests.settingsScreenFunctionalityTests(test);
        });
        describe('pump simulator screen', () => {
            functionalityTests.pumpSimulatorScreenTests(test);
        });
        describe('cgm simulator screen', () => {
            functionalityTests.cgmSimulatorScreenTests(test);
        });
    });
    describe('guardrails', () => {
        it('add required pump simulator', async () => {
            let settings = await test.OpenSettingsScreen();
            await settings.AddPumpSimulator();
        });
        //TODO: add back when guardrails work is complete
        describe.skip('max bolus', () => {
            guardrailsTests.maxBolusTests(test);
        });
        describe('insulin sensitivity schedule', () => {
            guardrailsTests.insulinSensitivityScheduleTests(test);
        });
        //TODO: add back when guardrails work is complete
        describe.skip('max temp basal rate', () => {
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
        //TODO: add back when guardrails work is complete
        describe.skip('basal rate schedule', () => {
            guardrailsTests.basalRateScheduleTests(test);
        });
    });
});
