module.exports = (test) => {
    var screen;
    var therapySettingsScreen;
    it('open', async () => {
        therapySettingsScreen = await test.OpenTherapySettingsScreen();
        screen = await therapySettingsScreen.OpenCarbRatioScreen();
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
    it('has a + button', async () => {
        await expect(screen.PlusButton()).toBeVisible();
    });
    it('has a edit button', async () => {
        await expect(screen.EditButton()).toBeVisible();
    });
    it('has a cancel button', async () => {
        await expect(screen.BackButton()).toBeVisible();
    });
    it('has a save button', async () => {
        await expect(screen.SaveButton()).toBeVisible();
    });
    it('clean up and close', async () => {
        await screen.CancelAndClose();
        await therapySettingsScreen.ReturnToHomeScreen();
    });
};
