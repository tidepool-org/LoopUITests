var cgmSimulatorScreen = (test) => {
    var screen;
    var settingsScreen;
    beforeAll(async () => {
        settingsScreen = await test.OpenSettingsScreen();
    });
    it('add simulator', async () => {
        await settingsScreen.Devices().AddCGM();
    });
    it('open simulator', async () => {
        screen = await settingsScreen.Devices().OpenCGMScreen();
    });
    it('set effect as Glucose Noise', async () => {
        await screen.Apply({
            effect: {
                name: screen.screenText.Effect.GlucoseNoise
            }
        });
    });
    it('set effect as Random Error', async () => {
        await screen.Apply({
            effect: {
                name: screen.screenText.Effect.RandomError
            }
        });
    });
    it('set effect as Random High Outlier', async () => {
        await screen.Apply({
            effect: {
                name: screen.screenText.Effect.RandomHighOutlier
            }
        });
    });
    it('set effect as Random Low Outlier', async () => {
        await screen.Apply({
            effect: {
                name: screen.screenText.Effect.RandomLowOutlier
            }
        });
    });

    it('set effect as Constant model', async () => {
        await screen.Apply({
            model: {
                name: screen.screenText.Model.Constant,
                bgValues: [112],
            }
        });
    });
    it('set effect as Sine Curve model', async () => {
        await screen.Apply({
            model: {
                name: screen.screenText.Model.SineCurve,
                bgValues: [112, 120],
            }
        });
    });
    it('set effect as No Data model', async () => {
        await screen.Apply({
            model: {
                name: screen.screenText.Model.None,
            }
        });
    });
    it.skip('set history as Backfill Glucose for 5 hours', async () => {
        await screen.Apply({
            history: {
                name: screen.screenText.History.BackfillGlucose,
                backfillHours: 5,
            }
        });
        await screen.BackToCGMSettings();
    });
    it.skip('set history as Trend', async () => {
        await screen.Apply({
            history: {
                name: screen.screenText.History.Trend,
                trend: screen.screenText.History.RisingTrend,
            }
        });
    });
    it('can remove simulator', async () => {
        await screen.RemoveSimulator();
    });
    it('return to start', async () => {
        await settingsScreen.Back();
    });
};

module.exports = {
    cgmSimulatorScreen
};
