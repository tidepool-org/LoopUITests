var pumpTests = (test) => {
    var screen;
    var settingsScreen;
    beforeEach(async () => {
        settingsScreen = await test.OpenSettingsScreen();
        await settingsScreen.AddPumpSimulator();
        screen = await settingsScreen.OpenPumpSimulatorScreen();
    });
    afterEach(async () => {
        settingsScreen = await test.OpenSettingsScreen();
        await settingsScreen.RemovePumpSimulator();
        await settingsScreen.Close();
    });
    it.skip('set low battery', async () => {
        //config
        await screen.Apply({ batteryRemaining: 2 });
        await screen.Close();
        await settingsScreen.Close();
    });
    it.skip('set low reservoir', async () => {
        //config
        await screen.Apply({ reservoirRemaining: 5 });
        await screen.Close();
        await settingsScreen.Close();
    });
    it.skip('set error on temp basal', async () => {
        await screen.Apply({ errorOnTempBasal: true });
        await screen.Close();
        await settingsScreen.Close();
    });
    it('set error on suspend', async () => {
        await screen.Apply({ errorOnSuspend: true });
        await screen.SuspendDelivery();
        await screen.HasAlert();
        await screen.DismissAlert();
        // await screen.Close();
        // await settingsScreen.Close();
    });
    it.skip('set error on resume', async () => {
        await screen.Apply({ errorOnResume: true });
        await screen.SuspendDelivery();
        await screen.ResumeDelivery();
        //check error
        await screen.HasAlert();
        await screen.DismissAlert();
        await screen.Close();
        await settingsScreen.Close();
    });
};

module.exports = {
    pumpTests
};
