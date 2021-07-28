const { Config } = require('../../src/config/index');
const { Test } = require('../../src/test');

describe('guardrails test', () => {
  var test = new Test();
  var config = new Config();
  it('prepare test', async () => {
    config = await config.prepare();
    test = test.setup({
      language: config.text,
      screenDefaults: config.screenDefaults,
      limits: config.limits,
      authentication: { faceid: true },
      enableTherapySettings: true,
      simulators: { pump: true },
    });
    await test.prepare();
  });
  describe('insulin sensitivity schedule', () => {
    var screen;
    var therapySettingsScreen;
    var screenLimit;
    it('open screen', async () => {
      therapySettingsScreen = await test.OpenTherapySettingsScreen();
      screen = await therapySettingsScreen.OpenInsulinSensitivitiesScreen();
      await screen.OpenPicker('12:00 AM');
      screenLimit = test.getLimitsForSetting('insulinSensitivities');
    });
    describe('minimum at limit with warning', () => {
      it('set value', async () => {
        await screen.ApplyOne({
          expected: { time: '12:00 AM', bgValuePerInsulinUnit: screenLimit.min.limit },
          current: { time: '12:00 AM', bgValuePerInsulinUnit: 45 },
        });
      });
      it('has guardrail icon', async () => {
        await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toExist();
      });
      it('has guardrail message', async () => {
        await expect(screen.LowInsulinSensitivityGuardrailMessage).toBeVisible();
      });
    });
    describe('minimum with warning', () => {
      it('set value', async () => {
        await screen.ApplyOne({
          expected: { time: '12:00 AM', bgValuePerInsulinUnit: screenLimit.min.warning },
          current: { time: '12:00 AM', bgValuePerInsulinUnit: screenLimit.min.limit },
        });
      });
      it('has guardrail icon', async () => {
        await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toExist();
      });
      it('has guardrail message', async () => {
        await expect(screen.LowInsulinSensitivityGuardrailMessage).toBeVisible();
      });
    });
    describe('minimum with no warning', () => {
      it('set value', async () => {
        await screen.ApplyOne({
          expected: { time: '12:00 AM', bgValuePerInsulinUnit: screenLimit.min.noWarning },
          current: { time: '12:00 AM', bgValuePerInsulinUnit: screenLimit.min.warning },
        });
      });
      it('does not have guardrail icon', async () => {
        await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeNotVisible();
      });
      it('does not have guardrail message', async () => {
        await expect(screen.LowInsulinSensitivityGuardrailMessage).toBeNotVisible();
      });
    });
    describe('maximum with no warning', () => {
      it('set value', async () => {
        await screen.ApplyOne({
          expected: { time: '12:00 AM', bgValuePerInsulinUnit: screenLimit.max.noWarning },
          current: { time: '12:00 AM', bgValuePerInsulinUnit: screenLimit.min.noWarning },
        });
      });
      it('does not have guardrail icon', async () => {
        await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeNotVisible();
      });
      it('does not have guardrail message', async () => {
        await expect(screen.HighInsulinSensitivityGuardrailMessage).toBeNotVisible();
      });
    });
    describe('maximum with warning', () => {
      it('set value', async () => {
        await screen.ApplyOne({
          expected: { time: '12:00 AM', bgValuePerInsulinUnit: screenLimit.max.warning },
          current: { time: '12:00 AM', bgValuePerInsulinUnit: screenLimit.max.noWarning },
        });
      });
      it('has guardrail icon', async () => {
        await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toExist();
      });
      it('has guardrail message', async () => {
        await expect(screen.HighInsulinSensitivityGuardrailMessage).toBeVisible();
      });
    });
    describe('maximum at limit with warning', () => {
      it('set value', async () => {
        await screen.ApplyOne({
          expected: { time: '12:00 AM', bgValuePerInsulinUnit: screenLimit.max.limit },
          current: { time: '12:00 AM', bgValuePerInsulinUnit: screenLimit.max.warning },

        });
      });
      it('has guardrail icon', async () => {
        await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toExist();
      });
      it('has guardrail message', async () => {
        await expect(screen.HighInsulinSensitivityGuardrailMessage).toBeVisible();
      });
    });
    it('can close screen', async () => {
      await screen.CancelNewEntryButton.tap();
      await therapySettingsScreen.ReturnToHomeScreen();
    });
  });
  describe('delivery limits', () => {
    var screen;
    var therapyScreen;
    var screenLimit;
    beforeAll(async () => {
      screenLimit = test.getLimitsForSetting('delivery');
    });
    describe('max basal rate', () => {
      const therapySettingsMaxBasalRate = 5.0;
      it('open screen', async () => {
        therapyScreen = await test.OpenTherapySettingsScreen();
        screen = await therapyScreen.OpenDeliveryLimitsScreen();
        await screen.OpenBasalRatePicker();
      });
      describe('minimum at limit with warning', () => {
        it('set value', async () => {
          await screen.ApplyBasal({
            expected: { rate: screenLimit.basalRate.min.limit },
            current: { rate: therapySettingsMaxBasalRate },
          });
        });
        it('has guardrail icon', async () => {
          await expect(screen.GuardrailWarningIconPicker).toExist();
        });
        it('has guardrail message', async () => {
          await expect(screen.LowMaxBasalRateGuardrailMessage).toBeVisible();
        });
      });
      describe('maximum with no warning', () => {
        it('set value', async () => {
          await screen.ApplyBasal({
            expected: { rate: screenLimit.basalRate.max.noWarning },
            current: { rate: screenLimit.basalRate.min.limit },
          });
        });
        it('does not have guardrail icon', async () => {
          await expect(screen.GuardrailWarningIconPicker).toBeNotVisible();
        });
        it('does not have guardrail message', async () => {
          await expect(screen.HighMaxBasalRateGuardrailMessage).toBeNotVisible();
        });
      });
      describe('maximum with warning', () => {
        it('set value', async () => {
          await screen.ApplyBasal({
            expected: { rate: screenLimit.basalRate.max.warning },
            current: { rate: screenLimit.basalRate.max.noWarning },
          });
        });
        it('has guardrail icon', async () => {
          await expect(screen.GuardrailWarningIconPicker).toExist();
        });
        it('has guardrail message', async () => {
          await expect(screen.HighMaxBasalRateGuardrailMessage).toBeVisible();
        });
      });
      it('cancel and close', async () => {
        await screen.CancelNewEntryButton.tap();
        await therapyScreen.ReturnToHomeScreen();
      });
    });
    describe('max bolus amount', () => {
      const therapySettingsMaxBolusAmount = 10;
      it('open screen', async () => {
        therapyScreen = await test.OpenTherapySettingsScreen();
        screen = await therapyScreen.OpenDeliveryLimitsScreen();
        await screen.OpenBolusPicker();
      });
      describe('maximum with no warning', () => {
        it('set value', async () => {
          await screen.ApplyBolus({
            expected: { amount: screenLimit.bolus.max.noWarning },
            current: { amount: therapySettingsMaxBolusAmount },
          });
        });
        it('does not have guardrail icon', async () => {
          await expect(screen.GuardrailWarningIconPicker).toNotExist();
        });
        it('does not have guardrail message', async () => {
          await expect(screen.HighBolusAmountGuardrailMessage).toNotExist();
        });
      });
      describe('maximum with warning', () => {
        it('set value', async () => {
          await screen.ApplyBolus({
            expected: { amount: screenLimit.bolus.max.warning },
            current: { amount: screenLimit.bolus.max.noWarning },
          });
        });
        it('has guardrail icon', async () => {
          await expect(screen.GuardrailWarningIconPicker).toExist();
        });
        it('has guardrail message', async () => {
          await expect(screen.HighBolusAmountGuardrailMessage).toBeVisible();
        });
      });
      describe('minimum with no warning', () => {
        it('set value', async () => {
          await screen.ApplyBolus({
            expected: { amount: screenLimit.bolus.min.noWarning },
            current: { amount: screenLimit.bolus.max.warning },
          });
        });
        it('does not have guardrail icon', async () => {
          await expect(screen.GuardrailWarningIconPicker).toNotExist();
        });
        it('does not have guardrail message', async () => {
          await expect(screen.LowBolusAmountGuardrailMessage).toNotExist();
        });
      });
      it('cancel and close', async () => {
        await screen.CancelNewEntryButton.tap();
        await therapyScreen.ReturnToHomeScreen();
      });
    });
  });
  describe('glucose safety limit', () => {
    var screen;
    var therapySettingsScreen;
    var screenLimit;
    const therapySettingsValue = 75;
    it('open screen', async () => {
      therapySettingsScreen = await test.OpenTherapySettingsScreen();
      screen = await therapySettingsScreen.OpenGlucoseSafetyLimitScreen();
      screenLimit = test.getLimitsForSetting('glucoseSafetyLimit');
      await screen.OpenPicker(therapySettingsValue);
    });
    describe('minimum at limit with warning', () => {
      it('set value', async () => {
        await screen.ApplyOne({
          expected: { value: screenLimit.min.limit },
          current: { value: therapySettingsValue },
        });
      });
      it('has guardrail icon', async () => {
        await expect(screen.GuardrailWarningIconPicker).toExist();
      });
      it('has guardrail message', async () => {
        await expect(screen.LowGlucoseSafetyLimitGuardrailMessage).toBeVisible();
      });
    });
    describe('minimum with warning', () => {
      it('set value', async () => {
        await screen.ApplyOne({
          expected: { value: screenLimit.min.warning },
          current: { value: screenLimit.min.limit },
        });
      });
      it('has guardrail icon', async () => {
        await expect(screen.GuardrailWarningIconPicker).toExist();
      });
      it('has guardrail message', async () => {
        await expect(screen.LowGlucoseSafetyLimitGuardrailMessage).toBeVisible();
      });
    });
    describe('minimum with no warning', () => {
      it('set value', async () => {
        await screen.ApplyOne({
          expected: { value: screenLimit.min.noWarning },
          current: { value: screenLimit.min.warning },
        });
      });
      it('does not have guardrail icon', async () => {
        await expect(screen.GuardrailWarningIconPicker).toNotExist();
      });
      it('does not have guardrail message', async () => {
        await expect(screen.LowGlucoseSafetyLimitGuardrailMessage).toNotExist();
      });
    });
    describe('maximum with no warning', () => {
      it('set value', async () => {
        await screen.ApplyOne({
          expected: { value: screenLimit.max.limit },
          current: { value: screenLimit.min.noWarning },
        });
      });
      it('does not have guardrail icon', async () => {
        await expect(screen.GuardrailWarningIconPicker).toNotExist();
      });
      it('does not have guardrail message', async () => {
        await expect(screen.HighGlucoseSafetyLimitGuardrailMessage).toNotExist();
      });
    });
    it('can close screen', async () => {
      await screen.CancelNewEntryButton.tap();
      await therapySettingsScreen.ReturnToHomeScreen();
    });
  });
});
