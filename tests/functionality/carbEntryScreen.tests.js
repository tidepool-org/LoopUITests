var carbEntryScreen = (test) => {
    var carbEntryScreen;
    it('can open screen', async () => {
        carbEntryScreen = await test.OpenCarbEntryScreen();
    });
    it('set carbs and save without a bolus', async () => {
        await carbEntryScreen.SetCarbs(30);
        var bolusScreen = await carbEntryScreen.ContinueAction();
        await bolusScreen.SaveWithoutBolus();
    });
    it('can cancel open screen', async () => {
        carbEntryScreen = await test.OpenCarbEntryScreen();
        await carbEntryScreen.CancelAndCloseAction();
    });
};

module.exports = {
    carbEntryScreen
};
