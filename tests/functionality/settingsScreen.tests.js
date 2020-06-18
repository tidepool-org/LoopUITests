var settingsScreenFunctionalityTests = (test) => {
    var settingsScreen;
    it('can open the settings', async () => {
        settingsScreen = await test.OpenSettingsScreen();
    });
    describe('general', () => {
        it('set to closed loop', async () => {
            await settingsScreen.SetClosedLoop();
        });
        it('set to open loop', async () => {
            await settingsScreen.SetOpenLoop();
        });
    });
    describe('issue report', () => {
        var screen;
        it('can be opened', async () => {
            screen = await settingsScreen.OpenIssueReportScreen();
        });
        it('can closed', async () => {
            await screen.Close();
        });
    });
    it('can close the settings', async () => {
        await settingsScreen.Close();
    });
};

module.exports = {
    settingsScreenFunctionalityTests
};
