var pumpSimulatorScreen = (test) => {
    var pumpSimulatorScreen;
    var settingsScreen;
    beforeAll(async () => {
        settingsScreen = await test.OpenSettingsScreen();
    });
    it('add simulator', async () => {
        await settingsScreen.AddPump();
    });
    it('open simulator', async () => {
        pumpSimulatorScreen = await settingsScreen.OpenPumpScreen();
    });
    it('set errorOnBolus to true', async () => {
        await pumpSimulatorScreen.Apply({ errorOnBolus: true });
    });
    it('set errorOnBolus to false', async () => {
        await pumpSimulatorScreen.Apply({ errorOnBolus: false });
    });
    it('set errorOnTempBasal to true', async () => {
        await pumpSimulatorScreen.Apply({ errorOnTempBasal: true });
    });
    it('set errorOnTempBasal to false', async () => {
        await pumpSimulatorScreen.Apply({ errorOnTempBasal: false });
    });
    it('set errorOnSuspend to true', async () => {
        await pumpSimulatorScreen.Apply({ errorOnSuspend: true });
    });
    it('set errorOnSuspend to false', async () => {
        await pumpSimulatorScreen.Apply({ errorOnSuspend: false });
    });
    it('set errorOnResume to true', async () => {
        await pumpSimulatorScreen.Apply({ errorOnResume: true });
    });
    it('set errorOnResume to false', async () => {
        await pumpSimulatorScreen.Apply({ errorOnResume: false });
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
