module.exports = (test) => {
    var screen;
    it('add simulator', async () => {
        await test.addCGM();
    });
    it('open simulator', async () => {
        screen = await test.openCGMScreen();
    });
    it('remove simulator', async () => {
        await screen.RemoveSimulator();
    });
};
