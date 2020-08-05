var pumpSimulatorScreen = (test) => {
    var pumpSimulatorScreen;
    var settingsScreen;
    beforeAll(async () => {
        settingsScreen = await test.OpenSettingsScreen();
    });
    it('add simulator', async () => {
        await settingsScreen.Devices().AddPump();
    });
    it('open simulator', async () => {
        pumpSimulatorScreen = await settingsScreen.Devices().OpenPumpScreen();
    });
    it('set errorOnBolus to true', async () => {
        await pumpSimulatorScreen.Apply({ errorOnBolus: true });
        await expect(pumpSimulatorScreen.ErrorOnBolusToggel()).toHaveValue('1');
    });
    it('set errorOnBolus to false', async () => {
        await pumpSimulatorScreen.Apply({ errorOnBolus: false });
        await expect(pumpSimulatorScreen.ErrorOnBolusToggel()).toHaveValue('0');
    });
    it('set errorOnTempBasal to true', async () => {
        await pumpSimulatorScreen.Apply({ errorOnTempBasal: true });
        await expect(pumpSimulatorScreen.ErrorOnTempBasalToggel()).toHaveValue('1');
    });
    it('set errorOnTempBasal to false', async () => {
        await pumpSimulatorScreen.Apply({ errorOnTempBasal: false });
        await expect(pumpSimulatorScreen.ErrorOnTempBasalToggel()).toHaveValue('0');
    });
    it('set errorOnSuspend to true', async () => {
        await pumpSimulatorScreen.Apply({ errorOnSuspend: true });
        await expect(pumpSimulatorScreen.ErrorOnSuspendToggel()).toHaveValue('1');
    });
    it('set errorOnSuspend to false', async () => {
        await pumpSimulatorScreen.Apply({ errorOnSuspend: false });
        await expect(pumpSimulatorScreen.ErrorOnSuspendToggel()).toHaveValue('0');
    });
    it('set errorOnResume to true', async () => {
        await pumpSimulatorScreen.Apply({ errorOnResume: true });
        await expect(pumpSimulatorScreen.ErrorOnResumeToggel()).toHaveValue('1');
    });
    it('set errorOnResume to false', async () => {
        await pumpSimulatorScreen.Apply({ errorOnResume: false });
        await expect(pumpSimulatorScreen.ErrorOnResumeToggel()).toHaveValue('0');
    });
    it('set battery percent', async () => {
        await pumpSimulatorScreen.Apply({ batteryRemaining: 80 });
    });
    it('set reservoir remaining units', async () => {
        await pumpSimulatorScreen.Apply({ reservoirRemaining: 99 });
    });
    it('can be removed', async () => {
        await pumpSimulatorScreen.RemoveSimulator();
    });
    it('return to start', async () => {
        await settingsScreen.Back();
    });
};

module.exports = {
    pumpSimulatorScreen
};
