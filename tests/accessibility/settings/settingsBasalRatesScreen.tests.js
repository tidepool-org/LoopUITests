var settingsBasalRatesScreen = (test) => {
    var settingsScreen;
    var screen;
    var settingsScreen;
    beforeAll(async () => {
        settingsScreen = await test.OpenSettingsScreen();
        await settingsScreen.AddPumpSimulator();
        screen = await settingsScreen.OpenBasalRatesScreen();
    });
    afterAll(async () => {
        await screen.CancelAndClose();
        await settingsScreen.RemovePumpSimulator();
        await settingsScreen.Close();
    });
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
        await expect(screen.BackButton()).toExist();
    });
    it('has a save button', async () => {
        await expect(screen.SaveButton()).toExist();
    });

};

module.exports = {
    settingsBasalRatesScreen
};
