const { loop } = require('../../src/index');

describe('Bolus not given', () => {
    afterAll(async () => {
        await loop.app.RemoveData();
    });
    it('when settings are applied with correction ranges below suspend threshold', async () => {
        let applySettings = loop.settings.default;
        applySettings.CorrectionRanges = [{ time: '12:00 AM', min: '120', max: '140' }];
        applySettings.SuspendThreshold = { value: '150' };
        await (await loop.app.Launch()).AndConfigure({
            scenario: 'flat_cgm_trace',
            settings: applySettings,
        });
    });
    it('should not be in closed loop mode', async () => {
        await loo.screen.home.ExpectLoopNotYetRun();
    });
    it('should show error that indicates why not in closed loop mode', async () => {
        //TODO: confirm this??
        await loop.screen.home.ExpectLoopStatusCarbsAlert();
    });
    it('should only enter carbs', async () => {
        await loop.screen.carbEntry.Open();
        await loop.screen.carbEntry.SetCarbs('30');
    });
    it('should then only be given option to save without bolus and warn about predicted glucose', async () => {
        await loop.screen.carbEntry.ContinueToBolus();
        await loop.screen.carbEntry.ExpectPredictedGlucoseWarning('110 mg/dL');
        await loop.screen.carbEntry.SaveWithoutBolus();
    });
});
