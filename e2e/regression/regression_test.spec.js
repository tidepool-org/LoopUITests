const { Test, screenName } = require('../../src/index');
const { guardrailsTests } = require('../guardrails/index');

describe('regression test', () => {
    var test = new Test()
        .withSettings({ AddPumpSimulator: true })
        .withStartScreen(screenName.settings);
    it('should setup with pump simulator', async () => {
        await test.prepare();
    });

    describe('guardrails', () => {
        describe('max bolus', () => {
            guardrailsTests.maxBolus(test);
        });
        describe('basal rate schedules', () => {
            guardrailsTests.basalRateSchedules(test);
        });
        describe.skip('insulin sensitivities', () => {
            guardrailsTests.insulinSensitivities(test);
        });
        describe.skip('max temp basal rate', () => {
            guardrailsTests.maxTempBasalRate(test);
        });
        describe.skip('suspend threshold', () => {
            guardrailsTests.suspendThreshold(test);
        });
        describe.skip('correction range', () => {
            guardrailsTests.correctionRange(test);
        });
    });

});
