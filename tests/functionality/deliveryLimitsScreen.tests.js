var deliveryLimitsScreen = (test) => {
    var screen;
    var settingsScreen;
    it('open screen', async () => {
        settingsScreen = await test.OpenSettingsScreen();
        await settingsScreen.AddPumpSimulator();
        screen = await settingsScreen.OpenDeliveryLimitsScreen();
    });
    it('open basal rate picker', async () => {
        await screen.OpenBasalRatePicker();
    });
    // TODO: not currently interactive
    it.skip('can set a limit', async () => {
        await screen.ApplyOne({
            basal: { expected: { rate: test.limits.delivery.basalRate.min.limit } },
        });
    });
    it('open bolus picker', async () => {
        await screen.OpenBolusPicker();
    });
    it('cleanup and close', async () => {
        await screen.CancelAndClose();
        await settingsScreen.RemovePumpSimulator();
        await settingsScreen.Close();
    });
};

module.exports = {
    deliveryLimitsScreen
};
