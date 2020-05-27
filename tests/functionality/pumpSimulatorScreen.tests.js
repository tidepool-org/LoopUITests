var pumpSimulatorScreenTests = (test) => {

    describe('pump', () => {
        var settingsScreen;
        var pumpSimulatorScreen;
        it('open settings', async () => {
            settingsScreen = await test.OpenSettingsScreen();
        });
        it('add simulator', async () => {
            await settingsScreen.AddPumpSimulator();
            pumpSimulatorScreen = await settingsScreen.OpenPumpSimulatorScreen();
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
        it('close', async () => {
            await pumpSimulatorScreen.Close();
            await settingsScreen.Close();
        });
    });
};

module.exports = {
    pumpSimulatorScreenTests
};
