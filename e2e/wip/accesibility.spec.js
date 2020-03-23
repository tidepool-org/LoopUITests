const { setup, screen } = require('../../src/index');

describe('quick test', () => {
    beforeAll(async () => {
        await setup.LaunchLoop();
    });
    describe('overrides', () => {
        describe('override', () => {
            it('can open overrides screen', async () => {
                await screen.overrides.Open();
            });
            // afterAll(async () => {
            //     await screen.overrides.Cancel();
            // });
            it('has a Custom Preset Header', async () => {
                await expect(screen.overrides.CustomPresetHeader()).toExist();
            });
            // it('has a Cancel Header Button', async () => {
            //     await expect(screen.overrides.CancelHeaderButton()).toExist();
            // });
            // it('has a Edit Header Button', async () => {
            //     await expect(screen.overrides.EditHeaderButton()).toExist();
            // });
            // it('has a Add Header Button', async () => {
            //     await expect(screen.overrides.AddHeaderButton()).toExist();
            // });
            // it('has a Add Preset Message', async () => {
            //     await expect(screen.overrides.AddPresetMessage()).toExist();
            // });
        });
    });
});
