var pumpTests = (test) => {
    var screen;
    var settingsScreen;
    beforeAll(async () => {
        settingsScreen = await test.OpenSettingsScreen();
        await settingsScreen.AddPumpSimulator();
        screen = await settingsScreen.OpenPumpSimulatorScreen();
    });
    it('create pump error on suspend', async () => {
        await screen.Apply({ errorOnSuspend: true });
        await screen.SuspendDelivery();
        await screen.HasAlert();
        await screen.DismissAlert();
    });
    it.skip('create pump error on bolus', async () => {
        await screen.Apply({ errorOnBolus: true });
        await screen.Close();
        await settingsScreen.Close();
        var bolusScreen = await test.OpenBolusScreen();
        await bolusScreen.SetBolusAmount(1);
        await bolusScreen.Deliver();
        //TODO: cannot enter passcode
    });
    it('create general pump error', async () => {
        await screen.CausePumpError();
        await screen.Close();
        await settingsScreen.Close();
        var home = await test.OpenHomeScreen();
        await home.Header().PumpError();
        await screen.ResolvePumpError();
    });
};

module.exports = {
    pumpTests
};
