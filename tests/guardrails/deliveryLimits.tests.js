module.exports = (test) => {
    var screen;
    var therapyScreen;
    var screenLimit;
    beforeAll(async () => {
        screenLimit = test.limits.delivery;
    });
    describe('max basal rate', () => {
        it('open screen', async () => {
            therapyScreen = await test.OpenTherapySettingsScreen();
            screen = await therapyScreen.OpenDeliveryLimitsScreen();
        });
        // it('can open max basal rate picker', async () => {
        //     await screen.OpenBasalRatePicker();
        // })
        // it('can set max basal rate at limit', async () => {
        //     await screen.ApplyBasal({
        //         expected: { rate: screenLimit.basalRate.max.limit },
        //     });
        // });
        // it('can set min basal rate no warning', async () => {
        //     await screen.ApplyBasal({
        //         expected: { rate: screenLimit.basalRate.min.noWarning },
        //         current: { rate: screenLimit.basalRate.max.limit },
        //     });
        // });
        // it('can set min basal rate min limit', async () => {
        //     await screen.ApplyBasal({
        //         expected: { rate: screenLimit.basalRate.min.limit },
        //         current: { rate: screenLimit.basalRate.min.noWarning },
        //     });
        //     await expect(screen.GuardrailMessage('Low Maximum Basal Rate')).toBeVisible();
        // });
        it('cancel and close', async () => {
            await screen.CancelAndClose();
            await therapyScreen.ReturnToHomeScreen();
        });
    });
    //TODO: usability issue that hides the picker when a Guardrail threshold is met
    describe.skip('max bolus amount', () => {
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
