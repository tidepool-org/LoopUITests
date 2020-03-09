const { setup, match, loopSettings, FilterSettings, SettingDefault, SettingType } = require('../../src/index');

describe('Closed loop is not allowed when settings', () => {
    beforeAll(async () => {
        await setup.LaunchLoop();
    });
    it('are not applied for insulin sensitivities', async () => {
        let config = {
            scenario: 'flat_cgm_trace',
            settings: FilterSettings(SettingDefault, [SettingType.InsulinSensitivities])
        };
        await loopSettings.Configure(config);
    });
    it('should not be in closed loop mode', async () => {
        await expect(match.loop.Icon()).toHaveLabel('Waiting for first run');
    });
    it('should show configuration error that indicates why not in closed loop mode', async () => {
        await waitFor(match.loop.Icon()).toBeVisible().withTimeout(2000);
        await match.loop.Icon().tap();
        await waitFor(match.accessible.AlertLabel('Missing Data: Carb Effects')).toExist().withTimeout(2000);
        await match.accessible.Button('OK').tap();
    });
});

