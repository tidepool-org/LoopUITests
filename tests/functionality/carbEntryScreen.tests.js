var carbEntryScreen = (test) => {
    var carbEntryScreen;
    it('configure pump', async () => {
        await test.addConfiguredPump();
    });
    it('can open screen', async () => {
        carbEntryScreen = await test.OpenCarbEntryScreen();
    });
    it.skip('set carbs and save without a bolus', async () => {
        await carbEntryScreen.SetCarbs(30);
        var bolusScreen = await carbEntryScreen.Continue();
        await test.authorize();
        await bolusScreen.SaveWithoutBolus();
    });
    it.skip('can cancel open screen', async () => {
        carbEntryScreen = await test.OpenCarbEntryScreen();
        await carbEntryScreen.CancelAndClose();
    });
};

module.exports = {
    carbEntryScreen
};
