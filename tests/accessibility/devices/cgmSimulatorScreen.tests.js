module.exports = (test) => {
    var screen;
    beforeAll(async () => {
        var homeScreen = await test.OpenHomeScreen();
        await homeScreen.HeaderSection.Devices.AddCGM();
        screen = await homeScreen.HeaderSection.Devices.OpenCGMScreen();
    });
    afterAll(async () => {
        await screen.RemoveSimulator();
    });
    it('has a header', async () => {
        await expect(screen.Header()).toBeVisible();
    });
    it('has a back button', async () => {
        await expect(screen.BackButton()).toBeVisible();
    });
    it('has a model header', async () => {
        await expect(screen.ModelHeader()).toBeVisible();
    });
    it('has a constant label', async () => {
        await expect(screen.ConstantModelLabel()).toBeVisible();
    });
    it('has a sine curve label', async () => {
        await expect(screen.SineCurveModelLabel()).toBeVisible();
    });
    it('has a no data label', async () => {
        await expect(screen.NoDataModelLabel()).toBeVisible();
    });
    it('has a effects header', async () => {
        await expect(screen.EffectsHeader()).toBeVisible();
    });
    it('has a random error label', async () => {
        await expect(screen.RandomErrorEffectLabel()).toExist();
    });
    it('has a glucose noise label', async () => {
        await expect(screen.GlucoseNoiseEffectLabel()).toBeVisible();
    });
    it('has a random high outlier label', async () => {
        await expect(screen.RandomHighOutlierEffectLabel()).toBeVisible();
    });
    it('has a random low outlier label', async () => {
        await expect(screen.RandomLowOutlierEffectLabel()).toBeVisible();
    });
    it('has a history header', async () => {
        await screen.ScrollToBottom();
        await expect(screen.HistoryHeader()).toBeVisible();
    });
    it('has a trend label', async () => {
        await expect(screen.TrendHistoryLabel()).toBeVisible();
    });
    it('has a backfill glucose label', async () => {
        await expect(screen.BackfillGlucoseHistoryLabel()).toBeVisible();
    });
    it('has a alerts header', async () => {
        await expect(screen.AlertsHeader()).toBeVisible();
    });
    it('has a issue alerts label', async () => {
        await expect(screen.IssueAlertsLabel()).toBeVisible();
    });
};
