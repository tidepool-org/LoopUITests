var settingsPumpSimulatorScreenTests = (test) => {
    var screen;
    var settingsScreen;
    it('open', async () => {
        settingsScreen = await test.OpenSettingsScreen();
        screen = await settingsScreen.OpenPumpSimulatorScreen();
    });
    it('has a header', async () => {
        await expect(screen.Header()).toExist();
    });
    it('has a done button', async () => {
        await expect(screen.DoneButton()).toExist();
    });
    it('close', async () => {
        await screen.Close();
        await settingsScreen.Close();
    });
};

module.exports = {
    settingsPumpSimulatorScreenTests
};
