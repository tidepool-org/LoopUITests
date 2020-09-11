module.exports = (test) => {
    var screen;
    it('can open screen', async () => {
        screen = await test.OpenCarbEntryScreen();
    });
    it('set carbs and then save with bolus', async () => {
        await screen.SetCarbs(5);
        var bolusScreen = await screen.Continue();
        await bolusScreen.SaveAndDeliver();
        await bolusScreen.Authenticate();
    });
};
