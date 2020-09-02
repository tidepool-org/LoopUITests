module.exports = (test) => {
    var screen;
    var settingsScreen;
    it('open', async () => {
        settingsScreen = await test.OpenSettingsScreen();
        screen = await settingsScreen.OpenSuspendThresholdScreen();
    });
    it('has a header', async () => {
        await expect(screen.Header()).toBeVisible();
    });
    it('has an info label', async () => {
        await expect(screen.InfoLabel()).toBeVisible();
    });
    it('has an info button', async () => {
        await expect(screen.InfoButton()).toBeVisible();
    });
    it('has a cancel button', async () => {
        await expect(screen.BackButton()).toBeVisible();
    });
    it('has a save button', async () => {
        await expect(screen.SaveButton()).toBeVisible();
    });
    it('clean up and close', async () => {
        await screen.CancelAndClose();
        await settingsScreen.Back();
    });
};
