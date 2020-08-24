module.exports = (test) => {
    var screen;
    it('can open screen', async () => {
        screen = await test.OpenCarbEntryScreen();
    });
    //TODO: cannot save without bolus
    it.skip('set carbs and save without a bolus', async () => {
        await screen.SetCarbs(30);
        var bolusScreen = await screen.Continue();
        await bolusScreen.SaveWithoutBolus();
    });
    it('can cancel open screen', async () => {
        screen = await test.OpenCarbEntryScreen();
        await screen.CancelAndClose();
    });
};
