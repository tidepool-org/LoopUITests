var settingsDeliveryLimitsScreen = (test) => {
    var screen;
    var settingsScreen;
    it('open', async () => {
        settingsScreen = await test.OpenSettingsScreen();
        await settingsScreen.AddPumpSimulator();
        screen = await settingsScreen.OpenDeliveryLimitsScreen();
    });
    it.skip('has a header', async () => {
        await expect(screen.Header()).toExist();
    });
    it('has a cancel button', async () => {
        await expect(screen.CancelButton()).toExist();
    });
    it('has a save button', async () => {
        await expect(screen.SaveButton()).toExist();
    });
    it('cleanup and close', async () => {
        await screen.CancelAndClose();
        await settingsScreen.RemovePumpSimulator();
        await settingsScreen.Close();
    });
};

module.exports = {
    settingsDeliveryLimitsScreen
};
