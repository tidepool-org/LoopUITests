const { setup, screen, SettingDefault } = require('../../src/index');

describe('smoke test', () => {
    beforeAll(async () => {
        await setup.LaunchLoop();
    });
    describe('settings', () => {
        beforeAll(async () => {
            await screen.settings.Open();
        });
        it('cgm can be added', async () => {
            await screen.settings.AddCGMSimulator();
        });
        it('pump can be added', async () => {
            await screen.settings.AddPumpSimulator();
        });
        it('set basal rates', async () => {
            await screen.settings.SetBasalRates([{ time: '12:00 AM', unitsPerHour: '1.1' }]);
        });
    });
});
