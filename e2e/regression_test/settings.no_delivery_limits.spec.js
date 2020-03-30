const { loop } = require('../../src/index');

describe('Closed loop is not allowed when settings are not applied for delivery limits', () => {
    afterAll(async () => {
        await loopSettings.RemoveData();
    });
    it('setup without delivery limits applied', async () => {
        await loop.app.Launch().then(() => loop.app.Configure({
            scenario: 'flat_cgm_trace',
            settings: loop.settings.filter(loop.settings.default, [loop.settings.type.DeliveryLimits])
        }));
    });
    it('should not be in closed loop mode', async () => {
        await screen.home.ExpectLoopNotYetRun();
    });
    it('should show error that indicates why not in closed loop mode', async () => {
        await screen.home.ExpectLoopStatusConfigurationAlert();
    });
});

