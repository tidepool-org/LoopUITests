module.exports = (test) => {
    var screen;
    it('open settings', async () => {
        screen = await test.OpenSettingsScreen();
    });
    it('open loop', async () => {
        await expect(screen._closedLoopButton()).toHaveValue('0');
    });
    it('close loop', async () => {
        await screen.ClosedLoop();
        await expect(screen._closedLoopButton()).toHaveValue('1');
    });
    it('has alert permissons label', async () => {
        await expect(screen.AlertPermissonsLabel()).toBeVisible();
    });
    it('has support label', async () => {
        await expect(screen.SupportLabel()).toBeVisible();
    });
    it('has support header', async () => {
        await expect(screen.SupportHeader()).toBeVisible();
    });
    it('has configuration header', async () => {
        await expect(screen.ConfigurationHeader()).toBeVisible();
    });
    it('has therapy settings label', async () => {
        await expect(screen.TherapySettingsLabel()).toBeVisible();
    });
    it('add pump button', async () => {
        await expect(screen.Devices().AddPumpButton()).toBeVisible();
    });
    it('add CGM button', async () => {
        await expect(screen.Devices().AddCGMButton()).toBeVisible();
    });
    it('close', async () => {
        await screen.BackToHome();
    });
};
