var cleanupFunctionalityTests = (test) => {

    var screen;
    it('open settings', async () => {
        screen = await test.OpenSettingsScreen();
    });
    it('remove pump data', async () => {
        await screen.RemovePumpData();
    });
    it('remove pump', async () => {
        await screen.RemovePump();
    });
    it.skip('remove CGM data', async () => {
        await screen.RemoveCGMData();
    });
    it.skip('remove CGM', async () => {
        await screen.RemoveCGM();
    });
    it('close settings', async () => {
        await screen.Close();
    });
};

module.exports = {
    cleanupFunctionalityTests
};
