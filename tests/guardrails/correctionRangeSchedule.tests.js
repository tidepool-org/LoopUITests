module.exports = (test) => {
    var screen;
    var therapyScreen;
    var screenLimit;
    it('open correction range', async () => {
        therapyScreen = await test.OpenTherapySettingsScreen();
        screen = await therapyScreen.OpenCorrectionRangeScreen();
        await screen.OpenPicker('12:00 AM');
        screenLimit = test.limits.correctionRange;
    });
    describe('min limit', () => {
        it('set units', async () => {
            await screen.ApplyOne({
                expected: {
                    min: screenLimit.min.limit,
                    max: 110,
                },
                current: {
                    min: 100,
                    max: 110,
                }
            });
        });
        it('check for guardrail warning icon', async () => {
            await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeNotVisible();
        });
        it('check for guardrail message', async () => {
            await expect(screen.GuardrailMessage('Low Correction Value')).toBeNotVisible();
        });
    });
    describe('max units with no warning', () => {
        it('set units', async () => {
            await screen.ApplyOne({
                expected: {
                    min: screenLimit.min.limit,
                    max: screenLimit.max.noWarning,
                },
                current: {
                    min: screenLimit.min.limit,
                    max: 110,
                },
            });
        });
        it('check for guardrail warning icon', async () => {
            await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeNotVisible();
        });
        it('check for guardrail message', async () => {
            await expect(screen.GuardrailMessage('Low Correction Value')).toBeNotVisible();
        });
    });
    describe('max units with warning', () => {
        it('set units', async () => {
            await screen.ApplyOne({
                expected: {
                    min: screenLimit.min.limit,
                    max: screenLimit.max.warning,
                },
                current: {
                    min: screenLimit.min.limit,
                    max: screenLimit.max.noWarning,
                },
            });
        });
        it('check for guardrail warning icon', async () => {
            await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeVisible();
        });
        it('check for guardrail message', async () => {
            await expect(screen.GuardrailMessage('High Correction Value')).toBeVisible();
        });
    });
    describe('max units at limit', () => {
        it('set units', async () => {
            await screen.ApplyOne({
                expected: {
                    min: screenLimit.min.limit,
                    max: screenLimit.max.limit,
                },
                current: {
                    min: screenLimit.min.limit,
                    max: screenLimit.max.warning,
                },
            });
        });
        it('check for guardrail warning icon', async () => {
            await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeVisible();
        });
        it('check for guardrail message', async () => {
            await expect(screen.GuardrailMessage('High Correction Value')).toBeVisible();
        });
    });
    it('can close screen', async () => {
        await screen.CancelNewEntry();
        await therapyScreen.ReturnToHomeScreen();
    });
};
