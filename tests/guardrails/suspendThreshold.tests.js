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
    describe('max units at limit', () => {
        it('can set units', async () => {
            await screen.SwipePickerToMaxValue();
        });
        it('check for guardrail warning icon', async () => {
            await expect(screen.GuardrailWarningIconPicker()).toBeVisible();
        });
        it('check for guardrail message', async () => {
            await expect(screen.GuardrailMessage('High Suspend Threshold')).toBeVisible();
        });
    });
    describe('max units with warning', () => {
        it('can set units', async () => {
            await screen.ApplyOne({
                expected: { value: screenLimit.max.warning },
                current: { value: screenLimit.max.limit },
            });
        });
        it('check for guardrail warning icon', async () => {
            await expect(screen.GuardrailWarningIconPicker()).toBeVisible();
        });
        it('check for guardrail message', async () => {
            await expect(screen.GuardrailMessage('High Suspend Threshold')).toBeVisible();
        });
    });
    describe('max units with no warning', () => {
        it('can set units', async () => {
            await screen.ApplyOne({
                expected: { value: screenLimit.max.noWarning },
                current: { value: screenLimit.max.warning },
            });
        });
        it('check for no guardrail warning icon', async () => {
            await expect(screen.GuardrailWarningIconPicker()).toBeNotVisible();
        });
    });
    describe('min units with no warning', () => {
        it('can set units', async () => {
            await screen.ApplyOne({
                expected: { value: screenLimit.min.noWarning },
                current: { value: screenLimit.max.noWarning },
            });
        });
        it('check for no guardrail warning icon', async () => {
            await expect(screen.GuardrailWarningIconPicker()).toBeNotVisible();
        });
    });
    describe('min units with warning', () => {
        it('can set units', async () => {
            await screen.ApplyOne({
                expected: { value: screenLimit.min.warning },
                current: { value: screenLimit.min.noWarning },
            });
        });
        it('check for guardrail warning icon', async () => {
            await expect(screen.GuardrailWarningIconPicker()).toBeVisible();
        });
        it('check for guardrail message', async () => {
            await expect(screen.GuardrailMessage('Low Suspend Threshold')).toBeVisible();
        });
    });
    describe('min units at limit', () => {
        it('can set units', async () => {
            await screen.ApplyOne({
                expected: { value: screenLimit.min.limit },
                current: { value: screenLimit.min.warning },
            });
        });
        it('check for guardrail warning icon', async () => {
            await expect(screen.GuardrailWarningIconPicker()).toBeVisible();
        });
        it('check for guardrail message', async () => {
            await expect(screen.GuardrailMessage('Low Suspend Threshold')).toBeVisible();
        });
    });
    it('can close screen', async () => {
        await screen.CancelAndClose();
        await settings.Back();
    });
};
