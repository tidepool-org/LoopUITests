var deliveryLimits = (test) => {
    var screen;
    var screenLimit;
    beforeAll(async () => {
        screen = await test.settingsScreen.OpenDeliveryLimitsScreen();
        screenLimit = test.limits.delivery;
    });
    // afterAll(async () => {
    //     await screen.Cancel();
    // });
    // it('can set max bolus at limit', async () => {
    //     await screen.OpenBolusPicker();
    //     await screen.ApplyOne({
    //         bolus: { expected: { amount: screenLimit.bolus.max.limit } },
    //     });
    //     await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeNotVisible();
    // });
    it('can open max basal rate picker', async () => {
        await screen.OpenBasalRatePicker();
    })
    it('can set max basal rate at limit', async () => {
        await screen.ApplyOne({
            basal: { expected: { rate: screenLimit.basalRate.min.limit } },
        });
        await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeNotVisible();
    });
    it.skip('can set min basal rate at limit', async () => {
        await screen.ApplyOne({
            basal: {
                expected: { rate: screenLimit.basalRate.min.limit },
                current: { rate: screenLimit.basalRate.max.limit },
            },
        });
        await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeVisible();
    });
}

module.exports = { deliveryLimits };
