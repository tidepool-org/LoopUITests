const { loop } = require('../../src/index');

describe('Closed loop is not allowed when settings are not applied for correction ranges', () => {
    afterAll(async () => {
        await loopSettings.RemoveData();
    });
    it('setup without correction ranges applied', async () => {
        await (await loop.app.Launch()).AndConfigure({
            scenario: 'flat_cgm_trace',
            settings: loop.settings.filter(loop.settings.default, [loop.settings.type.CorrectionRanges])
        });
    });
    it('should not be in closed loop mode', async () => {
        await screen.home.ExpectLoopNotYetRun();
    });
    it('should show error that indicates why not in closed loop mode', async () => {
        await screen.home.ExpectLoopStatusConfigurationAlert();
    });
});
