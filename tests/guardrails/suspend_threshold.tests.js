const { limits } = require('../../src/index');

var suspendThresholdTests = (test) => {
    var screen;
    it('setup', async () => {
        screen = await test.settingsScreen.OpenSuspendThresholdScreen();
        await screen.OpenPicker();
    });
    it('can set max units with warning', async () => {
        await screen.SwipePickerToMaxValue();
        await expect(screen.GuardrailWarningIconPicker()).toBeVisible();
        await expect(screen.GuardrailWarningIconSave()).toBeVisible();
    });
    it('can set max lower boundary units with warning', async () => {
        await screen.Apply(
            { value: limits.suspendThreshold.max.warning },
            limits.suspendThreshold.max.limit,
        );
        await expect(screen.GuardrailWarningIconPicker()).toBeVisible();
        await expect(screen.GuardrailWarningIconSave()).toBeVisible();
    });
    it('can set below max lower boundary units without warning', async () => {
        await screen.Apply(
            { value: limits.suspendThreshold.max.noWarning },
            limits.suspendThreshold.max.warning,
        );
        await expect(screen.GuardrailWarningIconPicker()).toBeNotVisible();
        await expect(screen.GuardrailWarningIconSave()).toBeNotVisible();
    });

    it('can set min units with warning', async () => {
        await screen.SwipePickerToMinValue();
        await expect(screen.GuardrailWarningIconPicker()).toBeVisible();
        await expect(screen.GuardrailWarningIconSave()).toBeVisible();
    });
    it('can set min upper boundary units with warning', async () => {
        await screen.Apply(
            { value: limits.suspendThreshold.min.warning },
            limits.suspendThreshold.min.limit,
        );
        await expect(screen.GuardrailWarningIconPicker()).toBeVisible();
        await expect(screen.GuardrailWarningIconSave()).toBeVisible();
    });
    it('can set above min upper boundary units with no warning', async () => {
        await screen.Apply(
            { value: limits.suspendThreshold.min.noWarning },
            limits.suspendThreshold.min.warning,
        );
        await expect(screen.GuardrailWarningIconPicker()).toBeNotVisible();
        await expect(screen.GuardrailWarningIconSave()).toBeNotVisible();
    });
};

module.exports = { suspendThresholdTests };
