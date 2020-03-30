const { loop } = require('../../src/index');

describe('Closed loop is not allowed when settings are not applied for basal rates', () => {
    afterAll(async () => {
        await loop.app.RemoveData();
    });
    it('setup without basal rates applied', async () => {
        await loop.app.Launch().then(() => loop.app.Configure({
            scenario: 'flat_cgm_trace',
            settings: loop.settings.filter(loop.settings.default, [loop.settings.type.BasalRates])
        }));
    });
    it('should not be in closed loop mode', async () => {
        await loop.screen.home.ExpectLoopNotYetRun();
    });
    it('should show error that indicates why not in closed loop mode', async () => {
        await loop.screen.home.ExpectLoopStatusInsulinAlert()
    });
});

