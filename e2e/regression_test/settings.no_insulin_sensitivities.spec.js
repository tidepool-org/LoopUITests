const { loop } = require('../../src/index');

describe('Closed loop is not allowed when settings are not applied for Insulin Sensitivities', () => {
    afterAll(async () => {
        await loop.app.RemoveData();
    });
    it('setup without Insulin Sensitivities applied', async () => {
        await (await loop.app.Launch()).AndConfigure({
            scenario: 'flat_cgm_trace',
            settings: loop.settings.filter(loop.settings.default, [loop.settings.type.InsulinSensitivities])
        });
    });
    it('should not be in closed loop mode', async () => {
        await loop.screen.home.ExpectLoopNotYetRun();
    });
    it('should show error that indicates why not in closed loop mode', async () => {
        await loop.screen.home.ExpectLoopStatusCarbsAlert();
    });
});

