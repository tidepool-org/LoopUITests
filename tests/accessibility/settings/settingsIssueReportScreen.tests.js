var settingsIssueReportScreen = (test) => {
    var screen;
    var settingsScreen;
    it('open', async () => {
        settingsScreen = await test.OpenSettingsScreen();
        screen = await settingsScreen.OpenIssueReportScreen();
    });
    it('has a header', async () => {
        await expect(screen.Header()).toExist();
    });
    it('has a back button', async () => {
        await expect(screen.BackButtonControl()).toExist();
    });
    it('close', async () => {
        await screen.Close();
        await settingsScreen.Close();
    });
};

module.exports = {
    settingsIssueReportScreen
};
