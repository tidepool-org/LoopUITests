const name = require('./testNames');

module.exports = (test) => {
    var screen;
    var therapyScreen;
    var screenLimit;
    const therapySettingsValue = 75;
    it('open screen', async () => {
        therapyScreen = await test.OpenTherapySettingsScreen();
        screen = await therapyScreen.OpenSuspendThresholdScreen();
        screenLimit = test.limits.suspendThreshold;
        await screen.OpenPicker(therapySettingsValue);
    });
    describe(name.MinimumLimit, () => {
        it(name.SetValue, async () => {
            await screen.ApplyOne({
                expected: { value: screenLimit.min.limit },
                current: { value: therapySettingsValue },
            });
        });
        it(name.HasGuardrailIcon, async () => {
            await expect(screen.GuardrailWarningIconPicker()).toBeVisible();
        });
        it(name.HasGuardrailMessage, async () => {
            await expect(screen.GuardrailMessage('Low Suspend Threshold')).toBeVisible();
        });
    });
    describe.skip(name.MinimumWarning, () => {
        it(name.SetValue, async () => {
            await screen.ApplyOne({
                expected: { value: screenLimit.min.warning },
                current: { value: screenLimit.min.limit },
            });
        });
        it(name.HasGuardrailIcon, async () => {
            await expect(screen.GuardrailWarningIconPicker()).toBeVisible();
        });
        it(name.HasGuardrailMessage, async () => {
            await expect(screen.GuardrailMessage('Low Suspend Threshold')).toBeVisible();
        });
    });
    describe(name.MinimumNoWarning, () => {
        it(name.SetValue, async () => {
            await screen.ApplyOne({
                expected: { value: screenLimit.min.noWarning },
                current: { value: screenLimit.min.limit },
            });
        });
        it(name.HasNoGuardrailIcon, async () => {
            await expect(screen.GuardrailWarningIconPicker()).toBeNotVisible();
        });
        it(name.HasNoGuardrailMessage, async () => {
            await expect(screen.GuardrailMessage('Low Suspend Threshold')).toBeNotVisible();
        });
    });
    describe(name.MaximumLimit, () => {
        it(name.SetValue, async () => {
            await screen.ApplyOne({
                expected: { value: screenLimit.max.limit },
                current: { value: screenLimit.min.noWarning },
            });
        });
        it(name.HasNoGuardrailIcon, async () => {
            await expect(screen.GuardrailWarningIconPicker()).toBeNotVisible();
        });
        it(name.HasNoGuardrailMessage, async () => {
            await expect(screen.GuardrailMessage('High Suspend Threshold')).toBeNotVisible();
        });
    });
    it('can close screen', async () => {
        await screen.CancelNewEntry();
        await therapyScreen.ReturnToHomeScreen();
    });
};
