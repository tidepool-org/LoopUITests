module.exports = (test) => {
    var settingsScreen;
    var screen;
    it('open settings', async () => {
        settingsScreen = await test.OpenSettingsScreen();
    });
    it('open therapy settings', async () => {
        screen = await settingsScreen.OpenTherapySettings();
    });
    it('has suspend thresold label', async () => {
        await expect(screen.SuspendThresholdLabel()).toBeVisible();
    });
    it('has suspend thresold info', async () => {
        await expect(screen.SuspendThresholdInfo()).toBeVisible();
    });
    it('has correction range label', async () => {
        await expect(screen.CorrectionRangeLabel()).toBeVisible();
    });
    it('has correction range info', async () => {
        await expect(screen.CorrectionRangeInfo()).toBeVisible();
    });
    it('has pre-meal range label', async () => {
        await expect(screen.PreMealRangeLabel()).toBeVisible();
    });
    it('has pre-meal range info', async () => {
        await expect(screen.PreMealRangeInfo()).toBeVisible();
    });
    it('has workout range label', async () => {
        await expect(screen.WorkoutRangeLabel()).toBeVisible();
    });
    it('has workout range info', async () => {
        await expect(screen.WorkoutRangeInfo()).toBeVisible();
    });
    it('swipe screen up', async () => {
        await screen.SwipeUp(screen.BasalRateLabel(), 1);
    });
    it('has basal rate label', async () => {
        await expect(screen.BasalRateLabel()).toBeVisible();
    });
    it('has basal rate info', async () => {
        await expect(screen.BasalRateInfo()).toBeVisible();
    });
    it('has delivery limits label', async () => {
        await expect(screen.DeliveryLimitsLabel()).toBeVisible();
    });
    it('has delivery limits info', async () => {
        await expect(screen.DeliveryLimitsInfo()).toBeVisible();
    });
    it('has delivery limits max basal rate', async () => {
        await expect(screen.DeliveryLimitsMaxBasalRateLabel()).toBeVisible();
    });
    it('has delivery limits max bolus', async () => {
        await expect(screen.DeliveryLimitsMaxBolusLabel()).toBeVisible();
    });
    it('swipe screen to bottom', async () => {
        await screen.SwipeUp(screen.InsulinSensitivitiesLabel(), 2);
    });
    it('has insulin model label', async () => {
        await expect(screen.InsulinModelLabel()).toBeVisible();
    });
    it('has insulin model info', async () => {
        await expect(screen.InsulinModelInfo()).toBeVisible();
    });
    it('has carb ratios label', async () => {
        await expect(screen.CarbRatiosLabel()).toBeVisible();
    });
    it('has carb ratios info', async () => {
        await expect(screen.CarbRatiosInfo()).toBeVisible();
    });
    it('has insulin sensitivities label', async () => {
        await expect(screen.InsulinSensitivitiesLabel()).toBeVisible();
    });
    it('has insulin sensitivities info', async () => {
        await expect(screen.InsulinSensitivitiesInfo()).toBeVisible();
    });
    it('close', async () => {
        await screen.Back();
        await settingsScreen.Back();
    });
};
