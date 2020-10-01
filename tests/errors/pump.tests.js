module.exports = (test) => {
    describe('generate error on bolus', () => {
        beforeAll(async () => {
            let pumpScreen = await test.OpenPumpScreen();
            await pumpScreen.Apply({ errorOnBolus: true });
            await pumpScreen.Back();
        });
        afterAll(async () => {
            let pumpScreen = await test.OpenPumpScreen();
            await pumpScreen.Apply({ errorOnBolus: false });
            await pumpScreen.Back();
        });
        it('attempt to deliver bolus', async () => {
            await test.LoopUtilities.deliverBolus(0.7);
        });
        it.skip('and check error dialog is shown', async () => {
            let homeScreen = await test.OpenHomeScreen();
            await expect(homeScreen.Alert('todo')).toBeVisible();
        });
    });
    describe('generate error on suspend', () => {
        var pumpScreen;
        beforeAll(async () => {
            pumpScreen = await test.OpenPumpScreen();
            await pumpScreen.Apply({ errorOnSuspend: true });
            await pumpScreen.SuspendDelivery();
        });
        it('and check the error is shown in loop', async () => {
            await pumpScreen.HasAlert();
        });
        it('then dismiss the error', async () => {
            await pumpScreen.DismissAlert();
            await pumpScreen.Apply({ errorOnSuspend: false });
            await pumpScreen.Back();
        });
        it('and check no error on home screen', async () => {
            let home = await test.OpenHomeScreen();
            await home.HeaderSection().NoPumpError();
        });
    });
    describe('generate general pump error', () => {
        var homeScreen;
        var pumpScreen;
        beforeAll(async () => {
            pumpScreen = await test.OpenPumpScreen();
            await pumpScreen.CausePumpError();
            await pumpScreen.Back();
            homeScreen = await test.OpenHomeScreen();
        });
        afterAll(async () => {
            pumpScreen = await test.OpenPumpScreen();
            await pumpScreen.ResolvePumpError();
            await pumpScreen.Back();
        });
        it('and check the error is shown in loop', async () => {
            await homeScreen.HeaderSection().PumpError();
        });
    });
    describe('generate occlusion error', () => {
        var homeScreen;
        var pumpScreen;
        beforeAll(async () => {
            pumpScreen = await test.OpenPumpScreen();
            await pumpScreen.DetectOcclusionError();
            await pumpScreen.Back();
            homeScreen = await test.OpenHomeScreen();
        });
        afterAll(async () => {
            pumpScreen = await test.OpenPumpScreen();
            await pumpScreen.ResolveOcclusionError();
            await pumpScreen.Back();
        });
        it('and check the error is shown in loop', async () => {
            await homeScreen.HeaderSection().PumpOcclusionError();
        });
    });
    describe.skip('generate error on bolus when no insulin', () => {
        beforeAll(async () => {
            await test.LoopUtilities.updateInsulinReservoir(5);
        });
        afterAll(async () => {
            await test.LoopUtilities.updateInsulinReservoir(150);
        });
        it('attempt to deliver bolus that is greater than is in the reservoir', async () => {
            await test.LoopUtilities.deliverBolus(10);
        });
        it('and check the error is shown in loop', async () => {
            let homeScreen = await test.OpenHomeScreen();
        });
    });
    describe('generate error when pump battery is flat', () => {
        beforeAll(async () => {
            await test.LoopUtilities.updatePumpBattery(0);
        });
        afterAll(async () => {
            await test.LoopUtilities.updatePumpBattery(85);
        });
        it.skip('and check the error is shown in loop', async () => {
            let homeScreen = await test.OpenHomeScreen();
            await expect(homeScreen.Alert('Pump Battery Low')).toBeVisible();
        });
    });
    describe('generate comms error on bolus', () => {
        var homeScreen;
        beforeAll(async () => {
            let pumpScreen = await test.OpenPumpScreen();
            await pumpScreen.Apply({ nextDeliveryCommandUncertain: true });
            await pumpScreen.Back();
        });
        it('attempt to deliver bolus', async () => {
            await test.LoopUtilities.deliverBolus(0.2);
        });
        it('and check the alert dialog in loop', async () => {
            homeScreen = await test.OpenHomeScreen();
            await expect(homeScreen.Alert('Unable To Reach Pump')).toBeVisible();
        });
        it('and check the error is shown in loop', async () => {
            await homeScreen.HeaderSection().PumpCommsError();
        });
    });
};
