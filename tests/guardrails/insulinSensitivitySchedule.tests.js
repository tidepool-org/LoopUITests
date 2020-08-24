module.exports = (test) => {
    var screen;
    var settingsScreen;
    var screenLimit;
    it('open screen', async () => {
        settingsScreen = await test.OpenSettingsScreen();
        screen = await settingsScreen.OpenInsulinSensitivitiesScreen();
        screenLimit = test.limits.insulinSensitivities;
    });
    it('can set max units with warning', async () => {
        await screen.Plus();
        await screen.ApplyOne({
            expected: { time: '12:00 AM', bgValuePerInsulinUnit: screenLimit.max.limit }
        });
        await screen.Add();
        await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeVisible();
    });
    it('can set max lower boundary units with warning', async () => {
        await screen.Plus();
        await screen.ApplyOne({
            expected: { time: '12:00 AM', bgValuePerInsulinUnit: screenLimit.max.warning },
            current: { time: '12:00 AM', bgValuePerInsulinUnit: screenLimit.max.limit }
        });
        await screen.Add();
        await expect(screen.GuardrailWarningIconPicker({ index: 1 })).toBeVisible();
    });
    it('can set below max lower boundary units without warning', async () => {
        await screen.Plus();
        await screen.ApplyOne({
            expected: { time: '12:00 AM', bgValuePerInsulinUnit: screenLimit.max.noWarning },
            current: { time: '12:00 AM', bgValuePerInsulinUnit: screenLimit.max.warning },
        });
        await screen.Add();
        await expect(screen.GuardrailWarningIconPicker({ index: 2 })).toBeNotVisible();
    });
    it('can set above min lower boundary units without warning', async () => {
        await screen.Plus();
        await screen.ApplyOne({
            expected: { time: '12:00 AM', bgValuePerInsulinUnit: screenLimit.min.noWarning },
            current: { time: '12:00 AM', bgValuePerInsulinUnit: screenLimit.max.noWarning },
        });
        await screen.Add();
        await expect(screen.GuardrailWarningIconPicker({ index: 3 })).toBeNotVisible();
    });
    it('can set at min lower boundary units with warning', async () => {
        await screen.Plus();
        await screen.ApplyOne({
            expected: { time: '12:00 AM', bgValuePerInsulinUnit: screenLimit.min.warning },
            current: { time: '12:00 AM', bgValuePerInsulinUnit: screenLimit.min.noWarning },
        });
        await screen.Add();
        await expect(screen.GuardrailWarningIconPicker({ index: 4 })).toBeVisible();
    });
    it('can set at min limit with warning', async () => {
        await screen.Plus();
        await screen.ApplyOne({
            expected: { time: '12:00 AM', bgValuePerInsulinUnit: screenLimit.min.limit },
            current: { time: '12:00 AM', bgValuePerInsulinUnit: screenLimit.min.warning },
        });
        await screen.Add();
        await expect(screen.GuardrailWarningIconPicker({ index: 5 })).toBeVisible();
    });
    it('can close screen', async () => {
        await screen.CancelAndClose();
        await settingsScreen.Back();
    });
};
