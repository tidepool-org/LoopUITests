var settingsCarbRatiosScreenAccessibilityTests = (test) => {
    describe('base tests', () => {
        var screen;
        var settingsScreen;
        beforeAll(async () => {
            settingsScreen = await test.OpenSettingsScreen();
            screen = await settingsScreen.OpenCarbRatiosScreen();
        });
        afterAll(async () => {
            await screen.Close();
            await settingsScreen.Close();
        });
        it.skip('has a header', async () => {
            await expect(screen.Header()).toExist();
        });
        it('has an info label', async () => {
            await expect(screen.InfoLabel()).toExist();
        });
        it('has an info button', async () => {
            await expect(screen.InfoButton()).toExist();
        });
        it('has a plus button', async () => {
            await expect(screen.PlusButton()).toExist();
        });
        it('has a edit button', async () => {
            await expect(screen.EditButton()).toExist();
        });
        it('has a cancel button', async () => {
            await expect(screen.CancelButton()).toExist();
        });
        it('has a save button', async () => {
            await expect(screen.SaveButton()).toExist();
        });
    });
};

module.exports = {
    settingsCarbRatiosScreenAccessibilityTests
};
