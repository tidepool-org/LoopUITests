var settingsCorrectionRangeScreen = (test) => {
    var screen;
    var settingsScreen;
    beforeAll(async () => {
        settingsScreen = await test.OpenSettingsScreen();
        screen = await settingsScreen.OpenCorrectionRangeScreen();
    });
    afterAll(async () => {
        await screen.CancelAndClose();
        await settingsScreen.Close();
    });
    //TODO: should be a header but is a label
    it('has a header', async () => {
        await expect(screen.Header()).toExist();
    });
    it('has an info label', async () => {
        await expect(screen.InfoLabel()).toExist();
    });
    it('has an info button', async () => {
        await expect(screen.InfoButton()).toExist();
    });
    it('has a add button', async () => {
        await expect(screen.AddButton()).toExist();
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
};
module.exports = {
    settingsCorrectionRangeScreen
};
