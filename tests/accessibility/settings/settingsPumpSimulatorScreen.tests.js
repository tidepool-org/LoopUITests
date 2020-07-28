var settingsPumpSimulatorScreenTests = (test) => {
    var screen;
    var settingsScreen;
    beforeAll(async () => {
        settingsScreen = await test.OpenSettingsScreen();
        await settingsScreen.AddPumpSimulator();
        screen = await settingsScreen.OpenPumpSimulatorScreen();
    });
    afterAll(async () => {
        await screen.RemoveSimulator();
        await settingsScreen.Close();
    });
    it('has a header', async () => {
        await expect(screen.Header()).toExist();
    });
    it('has a configuration header', async () => {
        await expect(screen.ConfigurationHeader()).toExist();
    });
    it('has a done button', async () => {
        await expect(screen.DoneButton()).toExist();
    });
    it('has a suspend delivery button', async () => {
        await expect(screen.SuspendDeliveryButton()).toExist();
    });
    it('has a detect occlusion button', async () => {
        await expect(screen.DetectOcclusionButton()).toExist();
    });
    it('has a cause pump error button', async () => {
        await expect(screen.CausePumpErrorButton()).toExist();
    });
    it('has a error on suspend toggle', async () => {
        await expect(screen.ErrorOnSuspendToggel()).toExist();
    });
    it('has a error on suspend label', async () => {
        await expect(screen.ErrorOnSuspendLabel()).toExist();
    });
    it('has a error on bolus toggle', async () => {
        await expect(screen.ErrorOnBolusToggel()).toExist();
    });
    it('has a error on bolus label', async () => {
        await expect(screen.ErrorOnBolusLabel()).toExist();
    });
    it('has a error on resume toggle', async () => {
        await expect(screen.ErrorOnResumeToggel()).toExist();
    });
    it('has a error on resume label', async () => {
        await expect(screen.ErrorOnResumeLabel()).toExist();
    });
    it('has a error on temp basal toggle', async () => {
        await expect(screen.ErrorOnTempBasalToggel()).toExist();
    });
    it('has a error on temp basal label', async () => {
        await expect(screen.ErrorOnTempBasalLabel()).toExist();
    });
    it('has a error on temp basal toggle', async () => {
        await expect(screen.ErrorOnTempBasalToggel()).toExist();
    });
    it('has a remaining battery label', async () => {
        await expect(screen.BatteryRemainingLabel()).toExist();
    });
    it('has a reservoir remaining label', async () => {
        await expect(screen.ReservoirRemainingLabel()).toExist();
    });
    it('has a delete pump label', async () => {
        await screen.ScrollToBottom();
        await expect(screen.DeletePumpLabel()).toExist();
    });
};

module.exports = {
    settingsPumpSimulatorScreenTests
};
