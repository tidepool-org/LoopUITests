var threapySettings = (test) => {
    var settingsScreen;
    it('open settings', async () => {
        settingsScreen = await test.OpenSettingsScreen();
    });
    it('close loop', async () => {
        await settingsScreen.ClosedLoop();
        await expect(settingsScreen._closedLoopButton()).toHaveValue('1');
    });
    it('open loop', async () => {
        await settingsScreen.OpenLoop();
        await expect(settingsScreen._closedLoopButton()).toHaveValue('0');
    });
    it('has alert permissons label', async () => {
        await expect(settingsScreen.AlertPermissonsLabel()).toBeVisible();
    });
    it('has support label', async () => {
        await expect(settingsScreen.SupportLabel()).toBeVisible();
    });
    it('has support header', async () => {
        await expect(settingsScreen.SupportHeader()).toBeVisible();
    });
    it('has configuration header', async () => {
        await expect(settingsScreen.ConfigurationHeader()).toBeVisible();
    });
    it('has therapy settings label', async () => {
        await expect(settingsScreen.TherapySettingsLabel()).toBeVisible();
    });
    it('add pump button', async () => {
        await expect(settingsScreen.Devices().AddPumpButton()).toBeVisible();
    });
    it('add CGM button', async () => {
        await expect(settingsScreen.Devices().AddCGMButton()).toBeVisible();
    });
    it('close', async () => {
        await settingsScreen.BackToHome();
    });
};

module.exports = {
    threapySettings
};
