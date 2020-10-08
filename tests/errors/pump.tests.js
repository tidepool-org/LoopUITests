module.exports = (test) => {
    describe('generate error on suspend', () => {
        let pumpScreen;
        let homeScreen;
        beforeAll(async () => {
            pumpScreen = await test.OpenPumpScreen();
            await pumpScreen.Apply({ errorOnSuspend: true });
            await pumpScreen.SuspendDelivery();
        });
        it('and check error shown on home screen', async () => {
            await pumpScreen.HasAlert();
        });
        it('then dismiss the error', async () => {
            await pumpScreen.DismissAlert();
        });
        it('and reset error on suspend', async () => {
            await pumpScreen.Apply({ errorOnSuspend: false });
            await pumpScreen.Back();
        });
        it('and check no error on home screen', async () => {
            homeScreen = await test.OpenHomeScreen();
            await homeScreen.HeaderSection.NoPumpError();
        });
        it('and check no loop icon error', async () => {
            await homeScreen.HeaderSection.ExpectNoLoopIconAlert();
        });
    });
    describe('generate general pump error', () => {
        let homeScreen;
        let pumpScreen;
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
        it('and check error shown on home screen', async () => {
            await homeScreen.HeaderSection.PumpError();
        });
        it('and check no loop icon error', async () => {
            await homeScreen.HeaderSection.ExpectNoLoopIconAlert();
        });
    });
    describe('generate occlusion error', () => {
        let homeScreen;
        let pumpScreen;
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
        it('and check error shown on home screen', async () => {
            await homeScreen.HeaderSection.PumpOcclusionError();
        });
        it('and check no loop icon error', async () => {
            await homeScreen.HeaderSection.ExpectNoLoopIconAlert();
        });
    });
    describe('generate error when no insulin', () => {
        beforeAll(async () => {
            await test.LoopUtilities.updateInsulinReservoir(0);
        });
        afterAll(async () => {
            await test.LoopUtilities.updateInsulinReservoir(150);
        });
        it('and check error shown on home screen', async () => {
            homeScreen = await test.OpenHomeScreen();
            await homeScreen.HeaderSection.PumpNoInsulinError();
        });
        it('and check no loop icon error', async () => {
            await homeScreen.HeaderSection.ExpectNoLoopIconAlert();
        });
    });
    // describe('generate error when pump battery is flat', () => {
    //     beforeAll(async () => {
    //         await test.LoopUtilities.updatePumpBattery(0);
    //     });
    //     afterAll(async () => {
    //         await test.LoopUtilities.updatePumpBattery(85);
    //     });
    //     it('and check error shown on home screen', async () => {
    //         let homeScreen = await test.OpenHomeScreen();
    //         await expect(homeScreen.Alert('Pump Battery Low')).toBeVisible();
    //     });
    // });
    // describe.skip('generate error on bolus', () => {
    //     beforeAll(async () => {
    //         let pumpScreen = await test.OpenPumpScreen();
    //         await pumpScreen.Apply({ errorOnBolus: true });
    //         await pumpScreen.Back();
    //     });
    //     afterAll(async () => {
    //         let pumpScreen = await test.OpenPumpScreen();
    //         await pumpScreen.Apply({ errorOnBolus: false });
    //         await pumpScreen.Back();
    //     });
    //     it('attempt to deliver bolus', async () => {
    //         await test.LoopUtilities.deliverBolus(0.7);
    //     });
    //     it.skip('and check error dialog is shown', async () => {
    //         let homeScreen = await test.OpenHomeScreen();
    //         await expect(homeScreen.Alert('todo')).toBeVisible();
    //     });
    // });
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
        it('and check error shown on home screen', async () => {
            await homeScreen.HeaderSection.PumpCommsError();
        });
    });
};
