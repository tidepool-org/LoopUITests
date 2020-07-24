var cgmSimulatorScreen = (test) => {
    var screen;
    var settingsScreen;
    beforeAll(async () => {
        settingsScreen = await test.OpenSettingsScreen();
    });
    afterAll(async () => {
        await settingsScreen.Close();
    });
    it('can add simulator', async () => {
        await settingsScreen.AddCGMSimulator();
        screen = await settingsScreen.OpenCGMSimulatorScreen();
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
    it.skip('set history as Backfill Glucose for 5 hours', async () => {
        await screen.Apply({
            history: {
                name: screen.language.History.BackfillGlucose,
                backfillHours: 5,
            }
        });
        await screen.BackToCGMSettings();
    });
    it.skip('set history as Trend', async () => {
        await screen.Apply({
            history: {
                name: screen.language.History.Trend,
                trend: screen.language.History.RisingTrend,
            }
        });
    });
    it('can remove simulator', async () => {
        await screen.RemoveSimulator();
    });
};

module.exports = {
    cgmSimulatorScreen
};
