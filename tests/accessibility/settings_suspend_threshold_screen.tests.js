
var settingsSuspendThresholdScreenAccessibilityTests = (test) => {
    var screen;
    var settingsScreen;
    beforeAll(async () => {
        settingsScreen = await test.OpenSettingsScreen();
        screen = await settingsScreen.OpenSuspendThresholdScreen();
    });
    afterAll(async () => {
        await screen.Cancel();
        await settingsScreen.Close();
    });
    //TODO: should be a header but is a label
    it.skip('has a header', async () => {
        await expect(screen.Header()).toExist();
    });
    it('has an info label', async () => {
        await expect(screen.InfoLabel()).toExist();
    });
    it('has an info button', async () => {
        await expect(screen.InfoButton()).toExist();
    });
    it('has a cancel button', async () => {
        await expect(screen.CancelButton()).toExist();
    });
    it('has a save button', async () => {
        await expect(screen.SaveButton()).toExist();
    });
};
module.exports = {
    settingsSuspendThresholdScreenAccessibilityTests
};