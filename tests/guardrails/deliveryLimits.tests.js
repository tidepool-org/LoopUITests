var deliveryLimits = (test) => {
    var screen;
    var screenLimit;
    beforeAll(async () => {
        screen = await test.settingsScreen.OpenDeliveryLimitsScreen();
        screenLimit = test.limits.delivery;
    });
    it('can open max basal rate picker', async () => {
        await screen.OpenBasalRatePicker();
    })
    it('can set max basal rate at limit', async () => {
        await screen.ApplyOne({
            basal: { expected: { rate: screenLimit.basalRate.max.limit } },
        });
        await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeNotVisible();
    });
    it('can set min basal rate no warning', async () => {
        await screen.ApplyOne({
            basal: {
                expected: { rate: screenLimit.basalRate.min.noWarning },
                current: { rate: screenLimit.basalRate.max.limit },
            },
        });
        await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeNotVisible();
    });
    it('can set min basal rate min limit', async () => {
        await screen.ApplyOne({
            basal: {
                expected: { rate: screenLimit.basalRate.min.limit },
                current: { rate: screenLimit.basalRate.min.noWarning },
            },
        });
        await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeVisible();
    });
    it('can open max bolus rate picker', async () => {
        await screen.OpenBolusPicker();
    })
    it('can set max bolus at limit', async () => {
        await screen.ApplyOne({
            bolus: { expected: { amount: screenLimit.bolus.max.limit } },
        });
        await expect(screen.GuardrailWarningIconPicker({ index: 1 })).toBeVisible();
    });
    it('can set max bolus warning', async () => {
        await screen.ApplyOne({
            bolus: {
                expected: { amount: screenLimit.bolus.max.warning },
                current: { amount: screenLimit.bolus.max.limit },
            },
        });
        await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeVisible();
    });
    it('can set max bolus no warning', async () => {
        await screen.ApplyOne({
            bolus: {
                expected: { amount: screenLimit.bolus.max.noWarning },
                current: { amount: screenLimit.bolus.max.warning },
            },
        });
        await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeNotVisible();
    });
    it('can set min bolus limit', async () => {
        await screen.ApplyOne({
            bolus: {
                expected: { amount: screenLimit.bolus.min.limit },
                current: { amount: screenLimit.bolus.max.noWarning },
            },
        });
        await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeNotVisible();
    });
}

module.exports = { deliveryLimits };
