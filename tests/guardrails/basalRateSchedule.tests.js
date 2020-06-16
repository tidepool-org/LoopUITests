var basalRateScheduleTests = (test) => {
    var screen;
    var screenLimit;
    beforeAll(async () => {
        screen = await test.settingsScreen.OpenBasalRatesScreen();
        screenLimit = test.limits.basalRates;
    });
    afterAll(async () => {
        await screen.Close();
    });
    it('can set max units at limit', async () => {
        await screen.Add();
        await screen.ApplyOne({
            expected: {
                time: '12:00 AM',
                unitsPerHour: screenLimit.max.limit,
            }
        });
        await screen.AddNewEntry();
        await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeVisible();
    });
    it('can set max units with no warning', async () => {
        await screen.Add();
        await screen.ApplyOne({
            expected:
            {
                time: '12:00 AM',
                unitsPerHour: screenLimit.max.noWarning,
            },
            current: {
                time: '12:00 AM',
                unitsPerHour: screenLimit.max.limit,
            },
        });
        await screen.AddNewEntry();
        await expect(screen.GuardrailWarningIconPicker({ index: 1 })).toBeNotVisible();
    });
    it('can set min units with no warning', async () => {
        await screen.Add();
        await screen.ApplyOne({
            expected:
            {
                time: '12:00 AM',
                unitsPerHour: screenLimit.min.noWarning,
            },
            current: {
                time: '12:00 AM',
                unitsPerHour: screenLimit.max.noWarning,
            }
        });
        await screen.AddNewEntry();
        await expect(screen.GuardrailWarningIconPicker({ index: 2 })).toBeNotVisible();
    });
    it('can set min units at limit', async () => {
        await screen.Add();
        await screen.ApplyOne({
            expected:
            {
                time: '12:00 AM',
                unitsPerHour: screenLimit.min.limit,
            },
            current: {
                time: '12:00 AM',
                unitsPerHour: screenLimit.min.noWarning,
            }
        });
        await screen.AddNewEntry();
        await expect(screen.GuardrailWarningIconPicker({ index: 3 })).toBeVisible();
    });
};

module.exports = { basalRateScheduleTests };
