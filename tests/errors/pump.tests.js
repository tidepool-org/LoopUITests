module.exports = (test) => {
    describe('generate error on suspend', () => {
        let pumpScreen;
        let statusScreen;
        beforeAll(async () => {
            pumpScreen = await test.OpenPumpScreen();
            await pumpScreen.Apply({ errorOnSuspend: true });
            await pumpScreen.SuspendDeliveryButton.tap();
        });
        it('and check error shown on status screen', async () => {
            await pumpScreen.HasAlert();
        });
        it('then dismiss the error', async () => {
            await pumpScreen.OKDismissAlertButton.tap();
        });
        it('and reset error on suspend', async () => {
            await pumpScreen.Apply({ errorOnSuspend: false });
            await pumpScreen.BackButton.tap();
        });
        it('and check no error on status screen', async () => {
            statusScreen = await test.OpenStatusScreen();
            await expect(statusScreen.HeaderSection.PumpErrorLabel).toBeNotVisible();
        });
        it('and check no loop icon error', async () => {
            await statusScreen.HeaderSection.ExpectNoLoopIconAlert();
        });
    });
    describe('generate general pump error', () => {
        let statusScreen;
        let pumpScreen;
        beforeAll(async () => {
            pumpScreen = await test.OpenPumpScreen();
            await pumpScreen.CausePumpErrorButton.tap();
            await pumpScreen.BackButton.tap();
            statusScreen = await test.OpenStatusScreen();
        });
        afterAll(async () => {
            pumpScreen = await test.OpenPumpScreen();
            await pumpScreen.ResolvePumpErrorButton.tap();
            await pumpScreen.BackButton.tap();
        });
        it('and check error shown on status screen', async () => {
            await expect(statusScreen.HeaderSection.PumpErrorLabel).toBeVisible();
        });
        it('and check no loop icon error', async () => {
            await statusScreen.HeaderSection.ExpectNoLoopIconAlert();
        });
    });
    describe('generate occlusion error', () => {
        let statusScreen;
        let pumpScreen;
        beforeAll(async () => {
            pumpScreen = await test.OpenPumpScreen();
            await pumpScreen.DetectOcclusionButton.tap();
            await pumpScreen.BackButton.tap();
            statusScreen = await test.OpenStatusScreen();
        });
        afterAll(async () => {
            pumpScreen = await test.OpenPumpScreen();
            await pumpScreen.ResolveOcclusionButton.tap();
            await pumpScreen.BackButton.tap();
        });
        it('and check error shown on status screen', async () => {
            await expect(statusScreen.HeaderSection.PumpOcclusionLabel).toBeVisible();
        });
        it('and check no loop icon error', async () => {
            await statusScreen.HeaderSection.ExpectNoLoopIconAlert();
        });
    });
    describe('generate error when no insulin', () => {
        let statusScreen;
        beforeAll(async () => {
            await test.LoopUtilities.updateInsulinReservoir(0);
        });
        afterAll(async () => {
            await test.LoopUtilities.updateInsulinReservoir(150);
        });
        it('and check error shown on status screen', async () => {
            statusScreen = await test.OpenStatusScreen();
            await expect(statusScreen.HeaderSection.PumpNoInsulinLabel).toBeVisible();
        });
        it('and check no loop icon error', async () => {
            await statusScreen.HeaderSection.ExpectNoLoopIconAlert();
        });
    });
};
