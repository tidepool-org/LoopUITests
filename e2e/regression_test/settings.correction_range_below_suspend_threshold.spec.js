const { setup, loopSettings, screen, SettingDefault } = require('../../src/index');

describe('Bolus not given', () => {
    beforeAll(async () => {
        await setup.LaunchLoop();
    });
    afterAll(async () => {
        await loopSettings.RemoveData();
    });
    it('when settings are applied with correction ranges below suspend threshold', async () => {
        let applySettings = SettingDefault;
        applySettings.CorrectionRanges = [{ time: '12:00 AM', min: '120', max: '140' }];
        applySettings.SuspendThreshold = { value: '150' };
        await loopSettings.Configure({
            scenario: 'flat_cgm_trace',
            settings: applySettings
        });
    });
    it('should not be in closed loop mode', async () => {
        await screen.home.ExpectLoopNotYetRun();
    });
    it('should show error that indicates why not in closed loop mode', async () => {
        //TODO: confirm this??
        await screen.home.ExpectLoopStatusCarbsAlert();
    });
    it('should only enter carbs', async () => {
        await screen.carbEntry.Open();
        await screen.carbEntry.SetCarbs('30');
    });
    it('should then only be given option to save without bolus and warn about predicted glucose', async () => {
        await screen.carbEntry.ContinueToBolus();
        await screen.carbEntry.ExpectPredictedGlucoseWarning('110 mg/dL');
        await screen.carbEntry.SaveWithoutBolus();
    });
});
