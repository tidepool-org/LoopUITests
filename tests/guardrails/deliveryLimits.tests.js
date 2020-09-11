const description = require('./testDescriptions');

module.exports = (test) => {
    var screen;
    var therapyScreen;
    var screenLimit;
    beforeAll(async () => {
        screenLimit = test.limits.delivery;
    });
    describe('max basal rate', () => {
        const therapySettingsMaxBasalRate = 5.0;
        it('open screen', async () => {
            therapyScreen = await test.OpenTherapySettingsScreen();
            screen = await therapyScreen.OpenDeliveryLimitsScreen();
            await screen.OpenBasalRatePicker();
        });
        describe(description.MinimumLimit, () => {
            it(description.SetValue, async () => {
                await screen.ApplyBasal({
                    expected: { rate: screenLimit.basalRate.min.limit },
                    current: { rate: therapySettingsMaxBasalRate },
                });
            });
            it(description.HasNoGuardrailIcon, async () => {
                await expect(screen.GuardrailWarningIconPicker()).toBeNotVisible();
            });
            it(description.HasNoGuardrailMessage, async () => {
                await expect(screen.LowMaxBasalRateGuardrailMessage()).toBeNotVisible();
            });
        });
        describe(description.MaximumNoWarning, () => {
            it(description.SetValue, async () => {
                await screen.ApplyBasal({
                    expected: { rate: screenLimit.basalRate.max.noWarning },
                    current: { rate: screenLimit.basalRate.min.limit },
                });
            });
            it(description.HasNoGuardrailIcon, async () => {
                await expect(screen.GuardrailWarningIconPicker()).toBeNotVisible();
            });
            it(description.HasNoGuardrailMessage, async () => {
                await expect(screen.HighMaxBasalRateGuardrailMessage()).toBeNotVisible();
            });
        });
        describe(description.MaximumWarning, () => {
            it(description.SetValue, async () => {
                await screen.ApplyBasal({
                    expected: { rate: screenLimit.basalRate.max.warning },
                    current: { rate: screenLimit.basalRate.max.noWarning },
                });
            });
            it(description.HasGuardrailIcon, async () => {
                await expect(screen.GuardrailWarningIconPicker()).toBeVisible();
            });
            it(description.HasGuardrailMessage, async () => {
                await expect(screen.HighMaxBasalRateGuardrailMessage()).toBeVisible();
            });
        });
        describe(description.MaximumLimit, () => {
            it(description.SetValue, async () => {
                await screen.ApplyBasal({
                    expected: { rate: screenLimit.basalRate.max.limit },
                    current: { rate: screenLimit.basalRate.max.warning },
                });
            });
            it(description.HasGuardrailIcon, async () => {
                await expect(screen.GuardrailWarningIconPicker()).toBeVisible();
            });
            it(description.HasGuardrailMessage, async () => {
                await expect(screen.HighMaxBasalRateGuardrailMessage()).toBeVisible();
            });
        });

        it('cancel and close', async () => {
            await screen.CancelNewEntry();
            await therapyScreen.ReturnToHomeScreen();
        });
    });
    describe.skip('max bolus amount', () => {
        const therapySettingsMaxBolusAmount = 10;
        it('open screen', async () => {
            therapyScreen = await test.OpenTherapySettingsScreen();
            screen = await therapyScreen.OpenDeliveryLimitsScreen();
            await screen.OpenBolusPicker();
        });
        describe(description.MinimumLimit, () => {
            it(description.SetValue, async () => {
                await screen.ApplyBolus({
                    expected: { amount: screenLimit.bolus.min.limit },
                    current: { amount: therapySettingsMaxBolusAmount },
                });
            });
            it(description.HasNoGuardrailIcon, async () => {
                await expect(screen.GuardrailWarningIconPicker()).toBeNotVisible();
            });
            it(description.HasNoGuardrailMessage, async () => {
                await expect(screen.LowBolusAmountGuardrailMessage()).toBeNotVisible();
            });
        });
        it('cancel and close', async () => {
            await screen.CancelNewEntry();
            await therapyScreen.ReturnToHomeScreen();
        });
    });
}
