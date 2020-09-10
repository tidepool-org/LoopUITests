const name = require('./testNames');

module.exports = (test) => {
    var screen;
    var therapyScreen;
    var screenLimit;
    beforeAll(async () => {
        screenLimit = test.limits.delivery;
    });
    describe('max basal rate', () => {
        const therapySettingsMaxBasalRate = 5;
        it('open screen', async () => {
            therapyScreen = await test.OpenTherapySettingsScreen();
            screen = await therapyScreen.OpenDeliveryLimitsScreen();
            await screen.OpenBasalRatePicker();
        });
        describe(name.MinimumLimit, () => {
            it(name.SetValue, async () => {
                await screen.ApplyBasal({
                    expected: { rate: screenLimit.basalRate.max.noWarning },
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
    //TODO: usability issue that hides the picker when a Guardrail threshold is met
    describe.skip('max bolus amount', () => {
        const therapySettingsMaxBolusAmount = 10;
        it('open screen', async () => {
            therapyScreen = await test.OpenTherapySettingsScreen();
            screen = await therapyScreen.OpenDeliveryLimitsScreen();
        });
        // it('open picker', async () => {
        //     await screen.OpenBolusPicker();
        // })
        // it('can set max bolus at limit', async () => {
        //     await screen.ApplyBolus({
        //         expected: { amount: screenLimit.bolus.max.limit },
        //     });
        //     await expect(screen.GuardrailMessage('High Maximum Bolus')).toBeVisible();
        // });
        // it('can set max bolus warning', async () => {
        //     await screen.ApplyBolus({
        //         expected: { amount: screenLimit.bolus.max.warning },
        //         current: { amount: screenLimit.bolus.max.limit },
        //     });
        //     await expect(screen.GuardrailMessage('High Maximum Bolus')).toBeVisible();
        // });
        // it('can set max bolus no warning', async () => {
        //     await screen.ApplyBolus({
        //         expected: { amount: screenLimit.bolus.max.noWarning },
        //         current: { amount: screenLimit.bolus.max.warning },
        //     });
        // });
        // it('can set min bolus limit', async () => {
        //     await screen.ApplyBolus({
        //         expected: { amount: screenLimit.bolus.min.limit },
        //         current: { amount: screenLimit.bolus.max.noWarning },
        //     });
        // });
        it('cancel and close', async () => {
            await screen.CancelAndClose();
            await therapyScreen.ReturnToHomeScreen();
        });
    });
}
