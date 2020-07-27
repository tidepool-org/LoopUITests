var settingsScreen = (test) => {
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
    it('support opened', async () => {
        await settingsScreen.OpenSupport();
    });
    it(' supportclosed', async () => {
        await settingsScreen.CloseSupport();
    });
    it.skip('therapy settings opened', async () => {
        await settingsScreen.OpenTherapySettings();
    });
    it('can close', async () => {
        await settingsScreen.BackToHome();
    });
};

module.exports = {
    settingsScreen
};
