var insulinSensitivityScheduleTests = (test) => {
    var screen;
    var screenLimit;
    beforeAll(async () => {
        screen = await test.settingsScreen.OpenInsulinSensitivitiesScreen();
        screenLimit = test.limits.insulinSensitivities;
    });
    afterAll(async () => {
        await screen.Cancel();
    });
    it('can set max units with warning', async () => {
        await screen.Add();
        await screen.ApplyOne(
            {
                time: '12:00 AM',
                bgValuePerInsulinUnit: screenLimit.max.limit
            }
        );
        await screen.AddNewEntry();
        await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeVisible();
    });
    it('can set max lower boundary units with warning', async () => {
        await screen.Add();
        await screen.ApplyOne(
            { time: '12:00 AM', bgValuePerInsulinUnit: screenLimit.max.warning },
            { time: '12:00 AM', bgValuePerInsulinUnit: screenLimit.max.limit }
        );
        await screen.AddNewEntry();
        await expect(screen.GuardrailWarningIconPicker({ index: 1 })).toBeVisible();
    });
    it('can set below max lower boundary units without warning', async () => {
        await screen.Add();
        await screen.ApplyOne(
            { time: '12:00 AM', bgValuePerInsulinUnit: screenLimit.max.noWarning },
            { time: '12:00 AM', bgValuePerInsulinUnit: screenLimit.max.warning },
        );
        await screen.AddNewEntry();
        await expect(screen.GuardrailWarningIconPicker({ index: 2 })).toBeNotVisible();
    });

    it('can set above min lower boundary units without warning', async () => {
        await screen.Add();
        await screen.ApplyOne(
            { time: '12:00 AM', bgValuePerInsulinUnit: screenLimit.min.noWarning },
            { time: '12:00 AM', bgValuePerInsulinUnit: screenLimit.max.noWarning },
        );
        await screen.AddNewEntry();
        await expect(screen.GuardrailWarningIconPicker({ index: 3 })).toBeNotVisible();
    });

    it('can set at min lower boundary units with warning', async () => {
        await screen.Add();
        await screen.ApplyOne(
            { time: '12:00 AM', bgValuePerInsulinUnit: screenLimit.min.warning },
            { time: '12:00 AM', bgValuePerInsulinUnit: screenLimit.min.noWarning },
        );
        await screen.AddNewEntry();
        await expect(screen.GuardrailWarningIconPicker({ index: 4 })).toBeVisible();
    });
    it('can set at min limit with warning', async () => {
        await screen.Add();
        await screen.ApplyOne(
            { time: '12:00 AM', bgValuePerInsulinUnit: screenLimit.min.limit },
            { time: '12:00 AM', bgValuePerInsulinUnit: screenLimit.min.warning },
        );
        await screen.AddNewEntry();
        await expect(screen.GuardrailWarningIconPicker({ index: 5 })).toBeVisible();
    });
};

module.exports = { insulinSensitivityScheduleTests };
