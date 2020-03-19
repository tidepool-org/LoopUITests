const { setup, screen } = require('../../src/index');

describe('quick test', () => {
    beforeAll(async () => {
        await setup.LaunchLoop();
    });
    describe('settings', () => {
        beforeAll(async () => {
            await screen.settings.Open();
        });
        afterAll(async () => {
            await screen.settings.Close();
        });
        it('can be go set to closed loop', async () => {
            await screen.settings.ClosedLoop();
        });
        it('can be go set to open loop', async () => {
            await screen.settings.OpenLoop();
        });
    });
});
