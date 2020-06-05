var correctionRangeScheduleTests = (test) => {
    var screen;
    var screenLimit;
    beforeAll(async () => {
        screen = await test.settingsScreen.OpenCorrectionRangeScreen();
        screenLimit = test.limits.correctionRange;
    });
    afterAll(async () => {
        await screen.Cancel();
    });
    it('can set max units at limit', async () => {
        await screen.Add();
        await screen.ApplyOne({
            min: 100,
            max: screenLimit.max.limit,
        });
        await screen.AddNewEntry();
        await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeVisible();
    });
    it('can set max units with warning', async () => {
        await screen.Add();
        await screen.ApplyOne(
            {
                min: 100,
                max: screenLimit.max.warning,
            },
            {
                min: 100,
                max: screenLimit.max.limit,
            });
        await screen.AddNewEntry();
        await expect(screen.GuardrailWarningIconPicker({ index: 1 })).toBeVisible();
    });
    it('can set max units with no warning', async () => {
        await screen.Add();
        await screen.ApplyOne(
            {
                min: 100,
                max: screenLimit.max.noWarning,
            },
            {
                min: 100,
                max: screenLimit.max.warning,
            });
        await screen.AddNewEntry();
        await expect(screen.GuardrailWarningIconPicker({ index: 2 })).toBeNotVisible();
    });
    it('can set min units with no warning', async () => {
        await screen.Add();
        await screen.ApplyOne(
            {
                min: screenLimit.min.noWarning,
                max: screenLimit.max.noWarning,
            },
            {
                min: 100,
                max: screenLimit.max.noWarning,
            });
        await screen.AddNewEntry();
        await expect(screen.GuardrailWarningIconPicker({ index: 3 })).toBeNotVisible();
    });
    it('can set min units with warning', async () => {
        await screen.Add();
        await screen.ApplyOne(
            {
                min: screenLimit.min.warning,
                max: screenLimit.max.noWarning,
            },
            {
                min: screenLimit.min.noWarning,
                max: screenLimit.max.noWarning,
            });
        await screen.AddNewEntry();
        await expect(screen.GuardrailWarningIconPicker({ index: 4 })).toBeVisible();
    });
    it('can set min units at limit', async () => {
        await screen.Add();
        await screen.ApplyOne(
            {
                min: screenLimit.min.limit,
                max: screenLimit.max.noWarning,
            },
            {
                min: screenLimit.min.warning,
                max: screenLimit.max.noWarning,
            });
        await screen.AddNewEntry();
        await expect(screen.GuardrailWarningIconPicker({ index: 5 })).toBeVisible();
    });
};

module.exports = { correctionRangeScheduleTests };
