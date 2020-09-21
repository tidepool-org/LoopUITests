module.exports = (test) => {
    var settingsScreen;
    it('can open', async () => {
        settingsScreen = await test.OpenSettingsScreen();
    });
    it('set to closed loop', async () => {
        await settingsScreen.ClosedLoop();
    });
    it('set to open loop', async () => {
        await settingsScreen.OpenLoop();
    });
    describe('support', () => {
        var screen;
        it('opened', async () => {
            screen = await settingsScreen.OpenSupport();
        });
        it('closed', async () => {
            await screen.Back();
        });
    });
    describe('therapy settings', () => {
        var screen;
        it('opened', async () => {
            screen = await settingsScreen.OpenTherapySettings();
        });
        it('closed', async () => {
            await screen.Back();
        });
    });
    it('can close', async () => {
        await settingsScreen.Back();
    });
};
