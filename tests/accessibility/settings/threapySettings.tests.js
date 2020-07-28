var threapySettings = (test) => {
    var settingsScreen;
    // beforeAll(async () => {
    //     settingsScreen = await test.OpenSettingsScreen();
    // });
    // afterAll(async () => {
    //     await settingsScreen.ScrollToTop();
    //     await settingsScreen.Close();
    // });
    it('open settings', async () => {
        settingsScreen = await test.OpenSettingsScreen();
    });
    it('close loop', async () => {
        await settingsScreen.ClosedLoop();
        await expect(settingsScreen._closedLoopButton()).toHaveValue('1');
    });
    it('open loop', async () => {
        await settingsScreen.OpenLoop();
        await expect(settingsScreen._closedLoopButton()).toHaveValue('0');
    });
    it.skip('open therapy settings', async () => {
        var screen = await settingsScreen.OpenTherapySettingsScreen();
    });
    it.skip('add pump', async () => {
        await settingsScreen.AddPump();
    });
    it.skip('add CGM', async () => {
        settingsScreen = await test.OpenSettingsScreen();
        await settingsScreen.AddCGM();
    });
};

module.exports = {
    threapySettings
};
