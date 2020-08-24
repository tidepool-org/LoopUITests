module.exports = (test) => {
    var screen;
    var settings;
    var screenLimit;
    beforeAll(async () => {
        settings = await test.OpenSettingsScreen();
        screen = await settings.OpenCorrectionRangeScreen();
        screenLimit = test.limits.correctionRange;
    });
    describe('max units at limit', () => {
        it('can set units', async () => {
            await screen.Plus();
            await screen.ApplyOne({
                expected: {
                    min: 100,
                    max: screenLimit.max.limit,
                }
            });
            await screen.Add();
        });
        it('check for guardrail warning icon', async () => {
            await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeVisible();
        });
        it('check for guardrail message', async () => {
            await expect(screen.GuardrailMessage('High Correction Value')).toBeVisible();
        });
        it('reset', async () => {
            await screen.CancelAndClose();
            await settings.Back();
            settings = await test.OpenSettingsScreen();
            screen = await settings.OpenCorrectionRangeScreen();
        });
    });
    describe('max units with warning', () => {
        it('can set units', async () => {
            await screen.Plus();
            await screen.ApplyOne({
                expected: {
                    min: 100,
                    max: screenLimit.max.warning,
                },
            });
            await screen.Add();
        });
        it('check for guardrail warning icon', async () => {
            await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeVisible();
        });
        it('check for guardrail message', async () => {
            await expect(screen.GuardrailMessage('High Correction Value')).toBeVisible();
        });
        it('reset', async () => {
            await screen.CancelAndClose();
            await settings.Back();
            settings = await test.OpenSettingsScreen();
            screen = await settings.OpenCorrectionRangeScreen();
        });
    });
    describe('max units with no warning', () => {
        it('can set units', async () => {
            await screen.Plus();
            await screen.ApplyOne({
                expected: {
                    min: 100,
                    max: screenLimit.max.noWarning,
                },
            });
            await screen.Add();
        });
        it('check there is no guardrail warning icon', async () => {
            await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeNotVisible();
        });
        it('reset', async () => {
            await screen.CancelAndClose();
            await settings.Back();
            settings = await test.OpenSettingsScreen();
            screen = await settings.OpenCorrectionRangeScreen();
        });
    });
    describe('min units with no warning', () => {
        it('can set units', async () => {
            await screen.Plus();
            await screen.ApplyOne({
                expected: {
                    min: screenLimit.min.noWarning,
                    max: screenLimit.max.noWarning,
                },
            });
            await screen.Add();
        });
        it('check there is no guardrail warning icon', async () => {
            await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeNotVisible();
        });
        it('reset', async () => {
            await screen.CancelAndClose();
            await settings.Back();
            settings = await test.OpenSettingsScreen();
            screen = await settings.OpenCorrectionRangeScreen();
        });
    });
    describe('min units at limit', () => {
        it('can set units', async () => {
            await screen.Plus();
            await screen.ApplyOne({
                expected: {
                    min: screenLimit.min.limit,
                    max: screenLimit.max.noWarning,
                },
            });
            await screen.Add();
        });
        it('check there a guardrail warning icon', async () => {
            await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeVisible();
        });
        it('check for guardrail message', async () => {
            await expect(screen.GuardrailMessage('Low Correction Value')).toBeVisible();
        });
    });
    it('can close screen', async () => {
        await screen.CancelAndClose();
        await settings.Back();
    });
};
