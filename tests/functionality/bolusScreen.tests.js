module.exports = (test) => {
    var screen;
    it('open screen', async () => {
        screen = await test.OpenBolusScreen();
    });
    it('bolus', async () => {
        await screen.SetBolusAmount(0.5);
        await screen.Deliver();
        await test.authorize();
    });
};
