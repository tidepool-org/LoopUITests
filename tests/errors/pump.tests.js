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
            await pumpScreen.BackButton.tap();
        });
        it('and check no error on home screen', async () => {
            homeScreen = await test.OpenHomeScreen();
            await expect(homeScreen.HeaderSection.PumpErrorLabel()).toBeNotVisible();
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
            await pumpScreen.BackButton.tap();
            homeScreen = await test.OpenHomeScreen();
        });
        afterAll(async () => {
            pumpScreen = await test.OpenPumpScreen();
            await pumpScreen.ResolvePumpError();
            await pumpScreen.BackButton.tap();
        });
        it('and check error shown on home screen', async () => {
            await expect(homeScreen.HeaderSection.PumpErrorLabel()).toBeVisible();
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
            await pumpScreen.BackButton.tap();
            homeScreen = await test.OpenHomeScreen();
        });
        afterAll(async () => {
            pumpScreen = await test.OpenPumpScreen();
            await pumpScreen.ResolveOcclusionError();
            await pumpScreen.BackButton.tap();
        });
        it('and check error shown on home screen', async () => {
            await expect(homeScreen.HeaderSection.PumpOcclusionLabel()).toBeNotVisible();
        });
        it('and check no loop icon error', async () => {
            await homeScreen.HeaderSection.ExpectNoLoopIconAlert();
        });
    });
    describe('generate error when no insulin', () => {
        let homeScreen;
        beforeAll(async () => {
            await test.LoopUtilities.updateInsulinReservoir(0);
        });
        afterAll(async () => {
            await test.LoopUtilities.updateInsulinReservoir(150);
        });
        it('and check error shown on home screen', async () => {
            homeScreen = await test.OpenHomeScreen();
            await expect(homeScreen.HeaderSection.PumpNoInsulinLabel()).toBeVisible();
        });
        it('and check no loop icon error', async () => {
            await homeScreen.HeaderSection.ExpectNoLoopIconAlert();
        });
    });
};
