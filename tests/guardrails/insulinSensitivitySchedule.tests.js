const action = require('../../src/action');
const name = require('./testNames');

module.exports = (test) => {
    var screen;
    var therapyScreen;
    var screenLimit;
    it('open screen', async () => {
        therapyScreen = await test.OpenTherapySettingsScreen();
        screen = await therapyScreen.OpenInsulinSensitivitiesScreen();
        await screen.OpenPicker('12:00 AM');
        screenLimit = test.limits.insulinSensitivities;
    });
    describe.skip(name.MinimumLimit, () => {
        it(name.SetValue, async () => {
            await screen.ApplyOne({
                expected: { time: '12:00 AM', bgValuePerInsulinUnit: screenLimit.min.limit },
                current: { time: '12:00 AM', bgValuePerInsulinUnit: 45 }
            });
        });
        it(name.HasGuardrailIcon, async () => {
            await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeVisible();
        });
        it(name.HasGuardrailMessage, async () => {
            await expect(screen.GuardrailMessage('Low Insulin Sensitivity')).toBeVisible();
        });
    });
    describe.skip(name.MinimumWarning, () => {
        it(name.SetValue, async () => {
            await screen.ApplyOne({
                expected: { time: '12:00 AM', bgValuePerInsulinUnit: screenLimit.min.warning },
                current: { time: '12:00 AM', bgValuePerInsulinUnit: screenLimit.min.limit }
            });
        });
        it(name.HasGuardrailIcon, async () => {
            await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeVisible();
        });
        it(name.HasGuardrailMessage, async () => {
            await expect(screen.GuardrailMessage('Low Insulin Sensitivity')).toBeVisible();
        });
    });
    describe.skip(name.MinimumNoWarning, () => {
        it(name.SetValue, async () => {
            await screen.ApplyOne({
                expected: { time: '12:00 AM', bgValuePerInsulinUnit: screenLimit.min.noWarning },
                current: { time: '12:00 AM', bgValuePerInsulinUnit: screenLimit.min.warning }
            });
        });
        it(name.HasNoGuardrailIcon, async () => {
            await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeNotVisible();
        });
        it(name.HasNoGuardrailMessage, async () => {
            await expect(screen.GuardrailMessage('Low Insulin Sensitivity')).toBeNotVisible();
        });
    });

    describe(name.MaximumLimit, () => {
        it(name.SetValue, async () => {
            await action.SwipePickerUp(10, 0);
        });
        it(name.HasGuardrailIcon, async () => {
            await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeVisible();
        });
        it(name.HasGuardrailMessage, async () => {
            await expect(screen.GuardrailMessage('High Insulin Sensitivity')).toBeVisible();
        });
    });
    describe(name.MaximumWarning, () => {
        it(name.SetValue, async () => {
            await screen.ApplyOne({
                expected: { time: '12:00 AM', bgValuePerInsulinUnit: screenLimit.max.warning },
                current: { time: '12:00 AM', bgValuePerInsulinUnit: screenLimit.max.limit }
            });
        });
        it(name.HasGuardrailIcon, async () => {
            await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeVisible();
        });
        it(name.HasGuardrailMessage, async () => {
            await expect(screen.GuardrailMessage('High Insulin Sensitivity')).toBeVisible();
        });
    });
    describe(name.MaximumNoWarning, () => {
        it(name.SetValue, async () => {
            await screen.ApplyOne({
                expected: { time: '12:00 AM', bgValuePerInsulinUnit: screenLimit.max.noWarning },
                current: { time: '12:00 AM', bgValuePerInsulinUnit: screenLimit.max.warning }
            });
        });
        it(name.HasNoGuardrailIcon, async () => {
            await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeNotVisible();
        });
        it(name.HasNoGuardrailMessage, async () => {
            await expect(screen.GuardrailMessage('High Insulin Sensitivity')).toBeNotVisible();
        });
    });
    it('can close screen', async () => {
        await screen.CancelNewEntry();
        await therapyScreen.ReturnToHomeScreen();
    });
};
