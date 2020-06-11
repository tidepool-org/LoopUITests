var settingsCGMSimulatorScreenTests = (test) => {
    var screen;
    var settingsScreen;
    it('open', async () => {
        settingsScreen = await test.OpenSettingsScreen();
        screen = await settingsScreen.OpenCGMSimulatorScreen();
    });
    it('has a header', async () => {
        await expect(screen.Header()).toExist();
    });
    it('has a done button', async () => {
        await expect(screen.DoneButton()).toExist();
    });
    it('has a model header', async () => {
        await expect(screen.ModelHeader()).toExist();
    });
    it('has a model header', async () => {
        await expect(screen.ModelHeader()).toExist();
    });
    it('has a constant label', async () => {
        await expect(screen.ConstantModelLabel()).toExist();
    });
    it('has a sine curve label', async () => {
        await expect(screen.SineCurveModelLabel()).toExist();
    });
    it('has a no data label', async () => {
        await expect(screen.NoDataModelLabel()).toExist();
    });
    it('has a model header', async () => {
        await expect(screen.ModelHeader()).toExist();
    });
    it('has a effects header', async () => {
        await expect(screen.EffectsHeader()).toExist();
    });
    it('has a random error label', async () => {
        await expect(screen.RandomErrorEffectLabel()).toExist();
    });
    it('has a glucose noise label', async () => {
        await expect(screen.GlucoseNoiseEffectLabel()).toExist();
    });
    it('has a random high outlier label', async () => {
        await expect(screen.RandomHighOutlierEffectLabel()).toExist();
    });
    it('has a random low outlier label', async () => {
        await expect(screen.RandomLowOutlierEffectLabel()).toExist();
    });

    it('has a history header', async () => {
        await expect(screen.HistoryHeader()).toExist();
    });
    it('has a trend label', async () => {
        await expect(screen.TrendHistoryLabel()).toExist();
    });
    it('has a backfill glucose label', async () => {
        await expect(screen.BackfillGlucoseHistoryLabel()).toExist();
    });

    it('has a alerts header', async () => {
        await expect(screen.AlertsHeader()).toExist();
    });
    it('has a issue alerts label', async () => {
        await expect(screen.IssueAlertsLabel()).toExist();
    });


    it('close', async () => {
        await screen.Close();
        await settingsScreen.Close();
    });
};

module.exports = {
    settingsCGMSimulatorScreenTests
};
