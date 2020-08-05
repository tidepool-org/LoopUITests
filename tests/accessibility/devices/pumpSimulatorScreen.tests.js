var pumpSimulatorScreenTests = (test) => {
    var screen;
    beforeAll(async () => {
        var homeScreen = await test.OpenHomeScreen();
        await homeScreen.HeaderSection().Devices().AddPump();
        screen = await homeScreen.HeaderSection().Devices().OpenPumpScreen();
    });
    afterAll(async () => {
        await screen.RemoveSimulator();
    });
    it('has a header', async () => {
        await expect(screen.Header()).toBeVisible();
    });
    it('has a back button', async () => {
        await expect(screen.BackButton()).toBeVisible();
    });
    it('has a configuration header', async () => {
        await expect(screen.ConfigurationHeader()).toBeVisible();
    });
    it('has a suspend delivery button', async () => {
        await expect(screen.SuspendDeliveryButton()).toBeVisible();
    });
    it('has a detect occlusion button', async () => {
        await expect(screen.DetectOcclusionButton()).toBeVisible();
    });
    it('has a cause pump error button', async () => {
        await expect(screen.CausePumpErrorButton()).toBeVisible();
    });
    it('has a error on suspend toggle', async () => {
        await expect(screen.ErrorOnSuspendToggel()).toBeVisible();
    });
    it('has a error on suspend label', async () => {
        await expect(screen.ErrorOnSuspendLabel()).toBeVisible();
    });
    it('has a error on bolus toggle', async () => {
        await expect(screen.ErrorOnBolusToggel()).toBeVisible();
    });
    it('has a error on bolus label', async () => {
        await expect(screen.ErrorOnBolusLabel()).toBeVisible();
    });
    it('has a error on resume toggle', async () => {
        await expect(screen.ErrorOnResumeToggel()).toBeVisible();
    });
    it('has a error on resume label', async () => {
        await expect(screen.ErrorOnResumeLabel()).toBeVisible();
    });
    it('has a error on temp basal toggle', async () => {
        await expect(screen.ErrorOnTempBasalToggel()).toBeVisible();
    });
    it('has a error on temp basal label', async () => {
        await expect(screen.ErrorOnTempBasalLabel()).toBeVisible();
    });
    it('has a error on temp basal toggle', async () => {
        await expect(screen.ErrorOnTempBasalToggel()).toBeVisible();
    });
    it('has a remaining battery label', async () => {
        await expect(screen.BatteryRemainingLabel()).toBeVisible();
    });
    it('has a reservoir remaining label', async () => {
        await expect(screen.ReservoirRemainingLabel()).toBeVisible();
    });
    it('has a delete pump label', async () => {
        await screen.ScrollToBottom();
        await expect(screen.DeletePumpLabel()).toBeVisible();
    });
};

module.exports = {
    pumpSimulatorScreenTests
};
