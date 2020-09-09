module.exports = (test) => {
    const therapySettingsRatio = 10;
    var screen;
    var therapyScreen;
    var screenLimit;
    it('open carb ratio screen', async () => {
        therapyScreen = await test.OpenTherapySettingsScreen();
        screen = await therapyScreen.OpenCarbRatioScreen();
        await screen.OpenPicker(therapySettingsRatio);
        screenLimit = test.limits.insulinCarbRatio;
    });
    describe('minimum limit', () => {
        it('set value', async () => {
            await screen.ApplyOne({
                expected: { carbGramsPerInsulinUnit: screenLimit.min.limit },
                current: { carbGramsPerInsulinUnit: therapySettingsRatio }
            });
        });
        it('check for guardrail icon', async () => {
            await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeVisible();
        });
        it('check for guardrail message', async () => {
            await expect(screen.GuardrailMessage('Low Carb Ratio')).toBeVisible();
        });
    });
    describe('minimum warning', () => {
        it('set value', async () => {
            await screen.ApplyOne({
                expected: { carbGramsPerInsulinUnit: screenLimit.min.warning },
                current: { carbGramsPerInsulinUnit: screenLimit.min.limit }
            });
        });
        it('check for guardrail icon', async () => {
            await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeVisible();
        });
        it('check for guardrail message', async () => {
            await expect(screen.GuardrailMessage('Low Carb Ratio')).toBeVisible();
        });
    });
    describe('minimum no warning', () => {
        it('set value', async () => {
            await screen.ApplyOne({
                expected: { carbGramsPerInsulinUnit: screenLimit.min.noWarning },
                current: { carbGramsPerInsulinUnit: screenLimit.min.warning }
            });
        });
        it('check there is NO guardrail icon', async () => {
            await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeNotVisible();
        });
        it('check there is NO guardrail message', async () => {
            await expect(screen.GuardrailMessage('Low Carb Ratio')).toBeNotVisible();
        });
    });
    describe('maximum no warning', () => {
        it('set value', async () => {
            await screen.ApplyOne({
                expected: { carbGramsPerInsulinUnit: screenLimit.max.noWarning },
                current: { carbGramsPerInsulinUnit: screenLimit.min.noWarning }
            });
        });
        it('check there is NO guardrail icon', async () => {
            await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeNotVisible();
        });
        it('check there is NO guardrail message', async () => {
            await expect(screen.GuardrailMessage('Low Carb Ratio')).toBeNotVisible();
        });
    });
    describe('maximum warning', () => {
        it('set value', async () => {
            await screen.ApplyOne({
                expected: { carbGramsPerInsulinUnit: screenLimit.max.warning },
                current: { carbGramsPerInsulinUnit: screenLimit.max.noWarning }
            });
        });
        it('check for guardrail icon', async () => {
            await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeVisible();
        });
        it('check for guardrail message', async () => {
            await expect(screen.GuardrailMessage('High Carb Ratio')).toBeVisible();
        });
    });
    describe('maximum limit', () => {
        it('set value', async () => {
            await screen.ApplyOne({
                expected: { carbGramsPerInsulinUnit: screenLimit.max.limit },
                current: { carbGramsPerInsulinUnit: screenLimit.max.warning }
            });
        });
        it('check for guardrail icon', async () => {
            await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeVisible();
        });
        it('check for guardrail message', async () => {
            await expect(screen.GuardrailMessage('High Carb Ratio')).toBeVisible();
        });
    });
    it('can cancel and close screen', async () => {
        await screen.CancelNewEntry();
        await therapyScreen.ReturnToHomeScreen();
    });
};
