var correctionRangeSchedule = (test) => {
    var screen;
    var screenLimit;
    beforeAll(async () => {
        screen = await test.settingsScreen.OpenCorrectionRangeScreen();
        screenLimit = test.limits.correctionRange;
    });
    it('can set max units at limit', async () => {
        await screen.Add();
        await screen.ApplyOne({
            expected: {
                min: 100,
                max: screenLimit.max.limit,
            }
        });
        await screen.AddNewEntry();
        await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeVisible();
    });
    it('can set max units with warning', async () => {
        await screen.Add();
        await screen.ApplyOne({
            expected: {
                min: 100,
                max: screenLimit.max.warning,
            },
            current: {
                min: 100,
                max: screenLimit.max.limit,
            }
        });
        await screen.AddNewEntry();
        await expect(screen.GuardrailWarningIconPicker({ index: 1 })).toBeVisible();
    });
    it('can set max units with no warning', async () => {
        await screen.Add();
        await screen.ApplyOne({
            expected: {
                min: 100,
                max: screenLimit.max.noWarning,
            },
            current: {
                min: 100,
                max: screenLimit.max.warning,
            }
        });
        await screen.AddNewEntry();
        await expect(screen.GuardrailWarningIconPicker({ index: 2 })).toBeNotVisible();
    });
    it('can set min units with no warning', async () => {
        await screen.Add();
        await screen.ApplyOne({
            expected: {

                min: screenLimit.min.noWarning,
                max: screenLimit.max.noWarning,
            },
            current: {
                min: 100,
                max: screenLimit.max.noWarning,
            }
        });
        await screen.AddNewEntry();
        await expect(screen.GuardrailWarningIconPicker({ index: 3 })).toBeNotVisible();
    });
    it('can set min units with warning', async () => {
        await screen.Add();
        await screen.ApplyOne({
            expected: {
                min: screenLimit.min.warning,
                max: screenLimit.max.noWarning,
            },
            current: {
                min: screenLimit.min.noWarning,
                max: screenLimit.max.noWarning,
            }
        });
        await screen.AddNewEntry();
        await expect(screen.GuardrailWarningIconPicker({ index: 4 })).toBeVisible();
    });
    it('can set min units at limit', async () => {
        await screen.Add();
        await screen.ApplyOne({
            expected: {
                min: screenLimit.min.limit,
                max: screenLimit.max.noWarning,
            },
            current: {
                min: screenLimit.min.warning,
                max: screenLimit.max.noWarning,
            }
        });
        await screen.AddNewEntry();
        await expect(screen.GuardrailWarningIconPicker({ index: 5 })).toBeVisible();
    });
    it('can close screen', async () => {
        await screen.CancelAndClose();
    });
};

module.exports = { correctionRangeSchedule };
