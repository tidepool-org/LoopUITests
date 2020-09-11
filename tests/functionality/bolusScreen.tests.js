module.exports = (test) => {
    var screen;
    it('open screen', async () => {
        screen = await test.OpenBolusScreen();
    });
    it('set bolus amount ', async () => {
        await screen.SetBolusAmount(0.2);
    });
    it('deliver bolus', async () => {
        await screen.Deliver();
        await screen.Authenticate();
    });
};
