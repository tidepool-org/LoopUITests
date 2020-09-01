module.exports = (test) => {
    var screen;
    it('add simulator', async () => {
        await test.addUnconfiguredPump();
    });
    it('open simulator', async () => {
        screen = await test.openPumpScreen();
    });

    it('create pump error on suspend', async () => {
        await screen.Apply({ errorOnSuspend: true });
        await screen.SuspendDelivery();
        await screen.HasAlert();
        await screen.DismissAlert();
    });
    // TODO: cannot interact with screen and enter passcode
    // it.skip('create pump error on bolus', async () => {
    //     await screen.Apply({ errorOnBolus: true });
    //     await screen.Close();
    //     await settingsScreen.Close();
    //     var bolusScreen = await test.OpenBolusScreen();
    //     await bolusScreen.SetBolusAmount(1);
    //     await bolusScreen.Deliver();
    // });
    it('create general pump error', async () => {
        await screen.CausePumpError();
        await screen.Back();
        var home = await test.OpenHomeScreen();
        await home.Header().PumpError();
        screen = await test.openPumpScreen();
        await screen.ResolvePumpError();
    });
};
