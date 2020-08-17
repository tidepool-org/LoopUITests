module.exports = (test) => {
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
    it('has suspend thresold label', async () => {
        await expect(settingsScreen.SuspendThresholdLabel()).toBeVisible();
    });
    it('has suspend thresold info', async () => {
        await expect(settingsScreen.SuspendThresholdInfo()).toBeVisible();
    });
    it('has correction range label', async () => {
        await expect(settingsScreen.CorrectionRangeLabel()).toBeVisible();
    });
    it('has correction range info', async () => {
        await expect(settingsScreen.CorrectionRangeInfo()).toBeVisible();
    });
    it('has correction range label', async () => {
        await expect(settingsScreen.CorrectionRangeLabel()).toBeVisible();
    });
    it('has correction range info', async () => {
        await expect(settingsScreen.CorrectionRangeInfo()).toBeVisible();
    });
    it('has pre-meal range label', async () => {
        await expect(settingsScreen.PreMealRangeLabel()).toBeVisible();
    });
    it('has pre-meal range info', async () => {
        await expect(settingsScreen.PreMealRangeInfo()).toBeVisible();
    });
    it('has workout range label', async () => {
        await expect(settingsScreen.WorkoutRangeLabel()).toBeVisible();
    });
    it('has workout range info', async () => {
        await expect(settingsScreen.WorkoutRangeInfo()).toBeVisible();
    });

    //correction
    //correction info

    //pre-meal range
    //pre-meal range info

    //workout range
    //workout range info

    it('close', async () => {
        await settingsScreen.BackToHome();
    });
};
