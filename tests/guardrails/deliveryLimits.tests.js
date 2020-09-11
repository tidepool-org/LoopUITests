const name = require('./testNames');

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
        describe(name.MinimumLimit, () => {
            it(name.SetValue, async () => {
                await screen.ApplyBasal({
                    expected: { rate: screenLimit.basalRate.min.limit },
                    current: { rate: therapySettingsMaxBasalRate },
                });
            });
            it(name.HasNoGuardrailIcon, async () => {
                await expect(screen.GuardrailWarningIconPicker()).toBeNotVisible();
            });
            it(name.HasNoGuardrailMessage, async () => {
                await expect(screen.GuardrailMessage('Low Maximum Basal Rate')).toBeNotVisible();
            });
        });
        describe(name.MaximumNoWarning, () => {
            it(name.SetValue, async () => {
                await screen.ApplyBasal({
                    expected: { rate: screenLimit.basalRate.max.noWarning },
                    current: { rate: screenLimit.basalRate.min.limit },
                });
            });
            it(name.HasNoGuardrailIcon, async () => {
                await expect(screen.GuardrailWarningIconPicker()).toBeNotVisible();
            });
            it(name.HasNoGuardrailMessage, async () => {
                await expect(screen.GuardrailMessage('High Maximum Basal Rate')).toBeNotVisible();
            });
        });
        describe(name.MaximumWarning, () => {
            it(name.SetValue, async () => {
                await screen.ApplyBasal({
                    expected: { rate: screenLimit.basalRate.max.warning },
                    current: { rate: screenLimit.basalRate.max.noWarning },
                });
            });
            it(name.HasGuardrailIcon, async () => {
                await expect(screen.GuardrailWarningIconPicker()).toBeVisible();
            });
            it(name.HasGuardrailMessage, async () => {
                await expect(screen.GuardrailMessage('High Maximum Basal Rate')).toBeVisible();
            });
        });
        describe(name.MaximumLimit, () => {
            it(name.SetValue, async () => {
                await screen.ApplyBasal({
                    expected: { rate: screenLimit.basalRate.max.limit },
                    current: { rate: screenLimit.basalRate.max.warning },
                });
            });
            it(name.HasGuardrailIcon, async () => {
                await expect(screen.GuardrailWarningIconPicker()).toBeVisible();
            });
            it(name.HasGuardrailMessage, async () => {
                await expect(screen.GuardrailMessage('High Maximum Basal Rate')).toBeVisible();
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
        describe(name.MinimumLimit, () => {
            it(name.SetValue, async () => {
                await screen.ApplyBolus({
                    expected: { amount: screenLimit.bolus.min.limit },
                    current: { amount: therapySettingsMaxBolusAmount },
                });
            });
            it(name.HasNoGuardrailIcon, async () => {
                await expect(screen.GuardrailWarningIconPicker()).toBeNotVisible();
            });
            it(name.HasNoGuardrailMessage, async () => {
                await expect(screen.GuardrailMessage('Low Bolus Amount')).toBeNotVisible();
            });
        });
        it('cancel and close', async () => {
            await screen.CancelNewEntry();
            await therapyScreen.ReturnToHomeScreen();
        });
    });
}
