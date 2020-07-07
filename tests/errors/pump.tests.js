var pumpTests = (test) => {
    var screen;
    var settingsScreen;
    beforeAll(async () => {
        settingsScreen = await test.OpenSettingsScreen();
        await settingsScreen.AddPumpSimulator();
        screen = await settingsScreen.OpenPumpSimulatorScreen();
    });
    // afterAll(async () => {
    //     settingsScreen = await test.OpenSettingsScreen();
    //     await settingsScreen.RemovePumpSimulator();
    //     await settingsScreen.Close();
    // });
    it('create pump error on suspend', async () => {
        await screen.Apply({ errorOnSuspend: true });
        await screen.SuspendDelivery();
        await screen.HasAlert();
        await screen.DismissAlert();
    });
    it('create pump on bolus', async () => {
        await screen.Apply({ errorOnBolus: true });
        await screen.Close();
        await settingsScreen.Close();
        var bolusScreen = await test.OpenBolusScreen();
        await bolusScreen.SetBolusAmount(1);
        await bolusScreen.Deliver();
    });
};

module.exports = {
    pumpTests
};
