module.exports = (test) => {
    var screen;
    var settings;
    var screenLimit;
    beforeAll(async () => {
        settings = await test.OpenSettingsScreen();
        screen = await settings.OpenBasalRateScreen();
        screenLimit = test.limits.basalRates;
    });
    describe('max units at limit', () => {
        it('can set units', async () => {
            await screen.Plus();
            await screen.ApplyOne({
                expected: { time: '12:00 AM', unitsPerHour: screenLimit.max.limit }
            });
            await screen.Add();
        });
        it('check no guardrail warning icon', async () => {
            await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeNotVisible();
        });
        it('reset', async () => {
            await screen.CancelAndClose();
            await settings.BackToHome();
            settings = await test.OpenSettingsScreen();
            screen = await settings.OpenBasalRateScreen();
        });
    });
    describe('max units with no warning', () => {
        it('can set units', async () => {
            await screen.Plus();
            await screen.ApplyOne({
                expected: { time: '12:00 AM', unitsPerHour: screenLimit.max.noWarning },
            });
            await screen.Add();
        });
        it('check no guardrail warning icon', async () => {
            await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeNotVisible();
        });
        it('reset', async () => {
            await screen.CancelAndClose();
            await settings.BackToHome();
            settings = await test.OpenSettingsScreen();
            screen = await settings.OpenBasalRateScreen();
        });
    });
    describe('min units with no warning', () => {
        it('can set units', async () => {
            await screen.Plus();
            await screen.ApplyOne({
                expected: { time: '12:00 AM', unitsPerHour: screenLimit.min.noWarning },
            });
            await screen.Add();
        });
        it('check no guardrail warning icon', async () => {
            await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeNotVisible();
        });
        it('reset', async () => {
            await screen.CancelAndClose();
            await settings.BackToHome();
            settings = await test.OpenSettingsScreen();
            screen = await settings.OpenBasalRateScreen();
        });
    });
    describe('min units at limit', () => {
        it('can set units', async () => {
            await screen.Plus();
            await screen.ApplyOne({
                expected: { time: '12:00 AM', unitsPerHour: screenLimit.min.limit }
            });
            await screen.Add();
        });
        it('check for guardrail warning icon', async () => {
            await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeVisible();
        });
        it('check for guardrail message', async () => {
            await expect(screen.GuardrailMessage('No Basal Insulin')).toBeVisible();
        });
    });
    it('can close screen', async () => {
        await screen.CancelAndClose();
        await settings.BackToHome();
    });
};
