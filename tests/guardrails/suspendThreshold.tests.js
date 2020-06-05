var suspendThresholdTests = (test) => {
    var screen;
    var screenLimit;
    beforeAll(async () => {
        screen = await test.settingsScreen.OpenSuspendThresholdScreen();
        screenLimit = test.limits.suspendThreshold;
        await screen.OpenPicker();
    });
    afterAll(async () => {
        await screen.Cancel();
    });
    it('can set max units with warning', async () => {
        await screen.SwipePickerToMaxValue();
        await expect(screen.GuardrailWarningIconPicker()).toBeVisible();
    });
    it('can set max lower boundary units with warning', async () => {
        await screen.ApplyOne(
            { value: screenLimit.max.warning },
            { value: screenLimit.max.limit },
        );
        await expect(screen.GuardrailWarningIconPicker()).toBeVisible();
    });
    it('can set below max lower boundary units without warning', async () => {
        await screen.ApplyOne(
            { value: screenLimit.max.noWarning },
            { value: screenLimit.max.warning },
        );
        await expect(screen.GuardrailWarningIconPicker()).toBeNotVisible();
    });
    it('can set min units with warning', async () => {
        await screen.SwipePickerToMinValue();
        await expect(screen.GuardrailWarningIconPicker()).toBeVisible();
    });
    it('can set min upper boundary units with warning', async () => {
        await screen.ApplyOne(
            { value: screenLimit.min.warning },
            { value: screenLimit.min.limit },
        );
        await expect(screen.GuardrailWarningIconPicker()).toBeVisible();
    });
    it('can set above min upper boundary units with no warning', async () => {
        await screen.ApplyOne(
            { value: screenLimit.min.noWarning },
            { value: screenLimit.min.warning },
        );
        await expect(screen.GuardrailWarningIconPicker()).toBeNotVisible();
    });
};

module.exports = { suspendThresholdTests };
