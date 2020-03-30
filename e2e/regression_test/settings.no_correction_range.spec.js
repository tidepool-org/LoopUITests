const { loop } = require('../../src/index');

describe('Closed loop is not allowed when settings are not applied for correction ranges', () => {
    afterAll(async () => {
        await loopSettings.RemoveData();
    });
    it('setup without correction ranges applied', async () => {
        await loop.app.Launch().then(() => loop.app.Configure({
            scenario: 'flat_cgm_trace',
            settings: loop.settings.filter(loop.settings.default, [loop.settings.type.CorrectionRanges])
        }));
    });
    it('should not be in closed loop mode', async () => {
        await screen.home.ExpectLoopNotYetRun();
    });
    it('should show error that indicates why not in closed loop mode', async () => {
        await screen.home.ExpectLoopStatusConfigurationAlert();
    });
});
