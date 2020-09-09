module.exports = (test) => {
    var screen;
    var therapyScreen;
    var screenLimit;
    it('open basal rates', async () => {
        therapyScreen = await test.OpenTherapySettingsScreen();
        screen = await therapyScreen.OpenBasalRateScreen();
        await screen.OpenPicker('12:00 AM');
        screenLimit = test.limits.basalRates;
    });
    describe('minimum units at limit', () => {
        it('set units', async () => {
            await screen.ApplyOne({
                expected: { time: '12:00 AM', unitsPerHour: screenLimit.min.limit },
                current: { time: '12:00 AM', unitsPerHour: 1 }
            });
        });
        it('check guardrail warning icon', async () => {
            await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeVisible();
        });
        it('check guardrail warning message', async () => {
            await expect(screen.GuardrailMessage('No Basal Insulin')).toBeVisible();
        });
    });
    describe('minimum units at no warning', () => {
        it('set units', async () => {
            await screen.ApplyOne({
                expected: { time: '12:00 AM', unitsPerHour: screenLimit.min.noWarning },
                current: { time: '12:00 AM', unitsPerHour: screenLimit.min.limit }
            });
        });
        it('check no guardrail warning icon', async () => {
            await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeNotVisible();
        });
        it('check no guardrail warning message', async () => {
            await expect(screen.GuardrailMessage('No Basal Insulin')).toBeNotVisible();
        });
    });
    describe('maximum units at limit', () => {
        it('set units', async () => {
            await screen.ApplyOne({
                expected: { time: '12:00 AM', unitsPerHour: screenLimit.max.limit },
                current: { time: '12:00 AM', unitsPerHour: screenLimit.min.noWarning }
            });
        });
        it('check no guardrail warning icon', async () => {
            await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeNotVisible();
        });
        it('check no guardrail warning message', async () => {
            await expect(screen.GuardrailMessage('No Basal Insulin')).toBeNotVisible();
        });
    });
    it('can close screen', async () => {
        await screen.CancelNewEntry();
        await therapyScreen.ReturnToHomeScreen();
    });
};
