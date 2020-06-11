var settingsPumpSimulatorScreenTests = (test) => {
    var screen;
    var settingsScreen;
    beforeAll(async () => {
        settingsScreen = await test.OpenSettingsScreen();
        await settingsScreen.AddPumpSimulator();
        screen = await settingsScreen.OpenPumpSimulatorScreen();
    });
    afterAll(async () => {
        await screen.RemoveSimulator();
        await settingsScreen.Close();
    });
    it('has a header', async () => {
        await expect(screen.Header()).toExist();
    });
    it('has a done button', async () => {
        await expect(screen.DoneButton()).toExist();
    });
};

module.exports = {
    settingsPumpSimulatorScreenTests
};
