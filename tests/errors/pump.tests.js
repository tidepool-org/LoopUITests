module.exports = (test) => {
    var screen;
    it('open simulator', async () => {
        screen = await test.openPumpScreen();
    });
    describe('error on suspend', () => {
        it('set to error', async () => {
            await screen.Apply({ errorOnSuspend: true });
        });
        it('suspend delivery', async () => {
            await screen.SuspendDelivery();
        });
        it('check the error is shown in loop', async () => {
            await screen.HasAlert();
        });
        it('dismiss the error', async () => {
            await screen.DismissAlert();
            await screen.Apply({ errorOnSuspend: false });
        });
        it('check no error on home screen', async () => {
            await screen.Back();
            home = await test.OpenHomeScreen();
            await home.HeaderSection().NoPumpError();
        });
    });
    describe('detect pump error', () => {
        var home;
        it('error is generated', async () => {
            screen = await test.openPumpScreen();
            await screen.CausePumpError();
        });
        it('then we return to home screen', async () => {
            await screen.Back();
            home = await test.OpenHomeScreen();
        });
        it('and check the error is shown in loop', async () => {
            await home.HeaderSection().PumpError();
        });
        it('now resolve the error', async () => {
            screen = await test.openPumpScreen();
            await screen.ResolvePumpError();
        });
    });
    describe('detect occlusion error', () => {
        var home;
        it('error is generated', async () => {
            await screen.DetectOcclusionError();
        });
        it('then we return to home screen', async () => {
            await screen.Back();
            home = await test.OpenHomeScreen();
        });
        it('and check the occlusion error is shown in loop', async () => {
            await home.HeaderSection().PumpOcclusionError();
        });
        it('now resolve the error', async () => {
            screen = await test.openPumpScreen();
            await screen.ResolveOcclusionError();
        });
    });
    describe('error on bolus', () => {
        var bolusScreen;
        it('set simulator to create error', async () => {
            await screen.Apply({ errorOnBolus: true });
            await screen.Back();
        });
        it('open bolus screen', async () => {
            bolusScreen = await test.OpenBolusScreen();
        });
        it('set bolus amount ', async () => {
            await bolusScreen.SetBolusAmount(0.5);
        });
        it('deliver the bolus', async () => {
            await bolusScreen.Deliver();
            await bolusScreen.Authenticate();
        });
        it.skip('check error dialog is shown', async () => {
            let bolusErrorText = test.language.general.Alert.BolusError;
            home = await test.OpenHomeScreen();
            await expect(home.Alert(bolusErrorText)).toBeVisible();
        });
    });
    describe('comms error on bolus', () => {
        var bolusScreen;
        it('set simulator to create error', async () => {
            screen = await test.openPumpScreen();
            await screen.Apply({ nextDeliveryCommandUncertain: true });
            await screen.Back();
        });
        it('open bolus screen', async () => {
            bolusScreen = await test.OpenBolusScreen();
        });
        it('set bolus amount ', async () => {
            await bolusScreen.SetBolusAmount(0.5);
        });
        it('deliver the bolus', async () => {
            await bolusScreen.Deliver();
            await bolusScreen.Authenticate();
        });
        it('check error dialog is shown in loop', async () => {
            home = await test.OpenHomeScreen();
            await expect(home.Alert('Unable To Reach Pump')).toBeVisible();
        });
    });
};
