const { Test, setting } = require('../../src/index');

describe('Closed loop is not allowed when settings are not applied for correction ranges', () => {
    var test;
    it('should without correction ranges applied', async () => {
        test = new Test()
            .withSettings(setting.default)
            .addSettingsFilter([setting.type.CorrectionRanges]);;
        await test.prepare();
    });
    it('should not be in closed loop mode', async () => {
        await test.homeScreen.ExpectLoopNotYetRun();
    });
    it('should show error that indicates why not in closed loop mode', async () => {
        await test.homeScreen.ExpectLoopStatusConfigurationAlert();
    });
});
