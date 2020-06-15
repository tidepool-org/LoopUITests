var cgmSimulatorScreenTests = (test) => {
    var screen;
    var settingsScreen;
    beforeAll(async () => {
        settingsScreen = await test.OpenSettingsScreen();
        await settingsScreen.AddCGMSimulator();
        screen = await settingsScreen.OpenCGMSimulatorScreen();
    });
    afterAll(async () => {
        await screen.RemoveSimulator();
        await settingsScreen.Close();
    });

    it('set effect as Glucose Noise', async () => {
        await screen.Apply({
            effect: {
                name: screen.language.Effect.GlucoseNoise
            }
        });
    });
    it('set effect as Random Error', async () => {
        await screen.Apply({
            effect: {
                name: screen.language.Effect.RandomError
            }
        });
    });
    it('set effect as Random High Outlier', async () => {
        await screen.Apply({
            effect: {
                name: screen.language.Effect.RandomHighOutlier
            }
        });
    });
    it('set effect as Random Low Outlier', async () => {
        await screen.Apply({
            effect: {
                name: screen.language.Effect.RandomLowOutlier
            }
        });
    });

    it('set effect as Constant model', async () => {
        await screen.Apply({
            model: {
                name: screen.language.Model.Constant,
                bgValues: [112],
            }
        });
    });
    it('set effect as Sine Curve model', async () => {
        await screen.Apply({
            model: {
                name: screen.language.Model.SineCurve,
                bgValues: [112, 120],
            }
        });
    });
    it('set effect as No Data model', async () => {
        await screen.Apply({
            model: {
                name: screen.language.Model.None,
            }
        });
    });
    it('set history as Backfill Glucose for 5 hours', async () => {
        await screen.Apply({
            history: {
                name: screen.language.History.BackfillGlucose,
                backfillHours: 5,
            }
        });
        await screen.BackToCGMSettings();
    });
    it('set history as Trend', async () => {
        await screen.Apply({
            history: {
                name: screen.language.History.Trend,
                trend: screen.language.History.RisingTrend,
            }
        });
        await screen.BackToCGMSettings();
    });
    it.skip('set alerts as Delayed Alert', async () => {
        //TODO: need to see if we can remove alert otherwise it will block other interaction
        await screen.Apply({
            alerts: {
                name: screen.language.Alerts.DelayedAlert,
            }
        });
        await screen.BackToCGMSettings();
    });
    it.skip('set alerts as Reapeating Alert', async () => {
        //TODO: appears to crash app?
        await screen.Apply({
            alerts: {
                name: screen.language.Alerts.ReapeatingAlert,
            }
        });
        await screen.BackToCGMSettings();
    });
};

module.exports = {
    cgmSimulatorScreenTests
};
