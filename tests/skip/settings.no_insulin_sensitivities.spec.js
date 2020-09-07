const { Test, setting } = require('../../src/index');

describe('Closed loop is not allowed when settings are not applied for Insulin Sensitivities', () => {
    var test;
    it('should without Insulin Sensitivities applied', async () => {
        test = new Test()
            .withSettings(setting.default)
            .addSettingsFilter([setting.type.InsulinSensitivities]);
        await test.prepare();
    });
    it('should not be in closed loop mode', async () => {
        await test.homeScreen.ExpectLoopNotYetRun();
    });
    it('should show error that indicates why not in closed loop mode', async () => {
        await test.homeScreen.ExpectLoopStatusCarbsAlert();
    });
});

