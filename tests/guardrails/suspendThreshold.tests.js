module.exports = (test) => {
    var screen;
    var settings;
    var screenLimit;
    it('open screen', async () => {
        settings = await test.OpenSettingsScreen();
        screen = await settings.OpenSuspendThresholdScreen();
        screenLimit = test.limits.suspendThreshold;
        await screen.OpenPicker();
    });
    it('can set max units with warning', async () => {
        await screen.SwipePickerToMaxValue();
        await expect(screen.GuardrailWarningIconPicker()).toBeVisible();
        await expect(screen.GuardrailMessage('High Suspend Threshold')).toBeVisible();
    });
    it('can set max lower boundary units with warning', async () => {
        await screen.ApplyOne({
            expected: { value: screenLimit.max.warning },
            current: { value: screenLimit.max.limit },
        });
        await expect(screen.GuardrailWarningIconPicker()).toBeVisible();
        await expect(screen.GuardrailMessage('High Suspend Threshold')).toBeVisible();
    });
    it('can set below max lower boundary units without warning', async () => {
        await screen.ApplyOne({
            expected: { value: screenLimit.max.noWarning },
            current: { value: screenLimit.max.warning },
        });
        await expect(screen.GuardrailWarningIconPicker()).toBeNotVisible();
    });
    it('can set min units with warning', async () => {
        await screen.SwipePickerToMinValue();
        await expect(screen.GuardrailWarningIconPicker()).toBeVisible();
        await expect(screen.GuardrailMessage('Low Suspend Threshold')).toBeVisible();
    });
    it('can set min upper boundary units with warning', async () => {
        await screen.ApplyOne({
            expected: { value: screenLimit.min.warning },
            current: { value: screenLimit.min.limit },
        });
        await expect(screen.GuardrailWarningIconPicker()).toBeVisible();
        await expect(screen.GuardrailMessage('Low Suspend Threshold')).toBeVisible();
    });
    it('can set above min upper boundary units with no warning', async () => {
        await screen.ApplyOne({
            expected: { value: screenLimit.min.noWarning },
            current: { value: screenLimit.min.warning },
        });
        await expect(screen.GuardrailWarningIconPicker()).toBeNotVisible();
    });
    it('can close screen', async () => {
        await screen.CancelAndClose();
        await settings.BackToHome();
    });
};
