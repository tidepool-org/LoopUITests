const { loop } = require('../../src/index');

describe('Closed loop is not allowed when settings', () => {
    afterAll(async () => {
        await loop.RemoveData();
    });
    it('are not applied for carb ratios', async () => {
        await loop.Launch();
        await loop.Configure({
            scenario: 'flat_cgm_trace',
            settings: loop.settings.filter(loop.settings.default, [loop.settings.type.CarbRatios])
        });
    });
    it('should not be in closed loop mode', async () => {
        await loop.screens.home.ExpectLoopNotYetRun();
    });
    it('should show error that indicates why not in closed loop mode', async () => {
        await loop.screens.home.ExpectLoopStatusCarbsAlert();
    });
});

