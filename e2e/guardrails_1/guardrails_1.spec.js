const { Config } = require('../../src/config/index');
const { Test } = require('../../src/test');

describe('guardrails test', () => {
  var test = new Test();
  var config = new Config();
  describe('insulin carb ratio', () => {
    var screen;
    var therapySettingsScreen;
    var screenLimit;
    const therapySettingsRatio = 10;
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
    it('open carb ratio screen', async () => {
      therapySettingsScreen = await test.OpenTherapySettingsScreen();
      screen = await therapySettingsScreen.OpenCarbRatioScreen();
      await screen.OpenPicker(therapySettingsRatio);
      screenLimit = test.getLimitsForSetting('insulinCarbRatio');
    });
    describe('minimum at limit with warning', () => {
      it('set value', async () => {
        await screen.ApplyOne({
          expected: { carbGramsPerInsulinUnit: screenLimit.min.limit },
          current: { carbGramsPerInsulinUnit: therapySettingsRatio },
        });
      });
      it('has guardrail icon', async () => {
        await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toExist();
      });
      it('has guardrail message', async () => {
        await expect(screen.LowCarbRatioGuardrailMessage).toBeVisible();
      });
    });
    describe('minimum with warning', () => {
      it('set value', async () => {
        await screen.ApplyOne({
          expected: { carbGramsPerInsulinUnit: screenLimit.min.warning },
          current: { carbGramsPerInsulinUnit: screenLimit.min.limit },
        });
      });
      it('has guardrail icon', async () => {
        await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toExist();
      });
      it('has guardrail message', async () => {
        await expect(screen.LowCarbRatioGuardrailMessage).toBeVisible();
      });
    });
    describe('minimum with no warning', () => {
      it('set value', async () => {
        await screen.ApplyOne({
          expected: { carbGramsPerInsulinUnit: screenLimit.min.noWarning },
          current: { carbGramsPerInsulinUnit: screenLimit.min.warning },
        });
      });
      it('does not have guardrail icon', async () => {
        await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeNotVisible();
      });
      it('does not have guardrail message', async () => {
        await expect(screen.LowCarbRatioGuardrailMessage).toBeNotVisible();
      });
    });
    describe('maximum with no warning', () => {
      it('set value', async () => {
        await screen.ApplyOne({
          expected: { carbGramsPerInsulinUnit: screenLimit.max.noWarning },
          current: { carbGramsPerInsulinUnit: screenLimit.min.noWarning },
        });
      });
      it('does not have guardrail icon', async () => {
        await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toBeNotVisible();
      });
      it('does not have guardrail message', async () => {
        await expect(screen.LowCarbRatioGuardrailMessage).toBeNotVisible();
      });
    });
    describe('maximum with warning', () => {
      it('set value', async () => {
        await screen.ApplyOne({
          expected: { carbGramsPerInsulinUnit: screenLimit.max.warning },
          current: { carbGramsPerInsulinUnit: screenLimit.max.noWarning },
        });
      });
      it('has guardrail icon', async () => {
        await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toExist();
      });
      it('has guardrail message', async () => {
        await expect(screen.HighCarbRatioGuardrailMessage).toBeVisible();
      });
    });
    describe('maximum at limit with warning', () => {
      it('set value', async () => {
        await screen.ApplyOne({
          expected: { carbGramsPerInsulinUnit: screenLimit.max.limit },
          current: { carbGramsPerInsulinUnit: screenLimit.max.warning },
        });
      });
      it('has guardrail icon', async () => {
        await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toExist();
      });
      it('has guardrail message', async () => {
        await expect(screen.HighCarbRatioGuardrailMessage).toBeVisible();
      });
    });
    it('can cancel and close screen', async () => {
      await screen.CancelNewEntryButton.tap();
      await therapySettingsScreen.ReturnToHomeScreen();
    });
  });
  describe('correction range schedule', () => {
    var screen;
    var therapySettingsScreen;
    var screenLimit;
    var startMin = 105;
    var startMax = 115;
    it('open correction range', async () => {
      therapySettingsScreen = await test.OpenTherapySettingsScreen();
      screen = await therapySettingsScreen.OpenCorrectionRangeScreen();
      await screen.OpenPicker('8:00 AM');
      screenLimit = test.getLimitsForSetting('correctionRange');
    });
    describe('minimum with no warning', () => {
      it('set value', async () => {
        await screen.ApplyOne({
          expected: {
            min: screenLimit.min.noWarning,
            max: startMax,
          },
          current: {
            min: startMin,
            max: startMax,
          },
        });
      });
      it('does not have guardrail icon', async () => {
        await expect(screen.GuardrailWarningIconPicker({ index: 1 })).toNotExist();
      });
      it('does not have guardrail message', async () => {
        await expect(screen.LowCorrectionValueGuardrailMessage).toNotExist();
      });
    });
    describe('minimum with warning', () => {
      it('set value', async () => {
        await screen.ApplyOne({
          expected: {
            min: screenLimit.min.warning,
            max: startMax,
          },
          current: {
            min: screenLimit.min.noWarning,
            max: startMax,
          },
        });
      });
      it('has guardrail icon', async () => {
        await expect(screen.GuardrailWarningIconPicker({ index: 1 })).toBeVisible();
      });
      it('has guardrail message', async () => {
        await expect(screen.LowCorrectionValueGuardrailMessage).toBeVisible();
      });
    });
    describe('minimum at limit with warning', () => {
      it('set value', async () => {
        await screen.ApplyOne({
          expected: {
            min: screenLimit.min.limit,
            max: startMax,
          },
          current: {
            min: screenLimit.min.warning,
            max: startMax,
          },
        });
      });
      it('has guardrail icon', async () => {
        await expect(screen.GuardrailWarningIconPicker({ index: 1 })).toBeVisible();
      });
      it('has guardrail message', async () => {
        await expect(screen.LowCorrectionValueGuardrailMessage).toBeVisible();
      });
    });
    describe('maximum with no warning', () => {
      it('set value', async () => {
        await screen.ApplyOne({
          expected: {
            min: screenLimit.min.noWarning,
            max: screenLimit.max.noWarning,
          },
          current: {
            min: screenLimit.min.limit,
            max: startMax,
          },
        });
      });
      it('does not have guardrail icon', async () => {
        await expect(screen.GuardrailWarningIconPicker({ index: 1 })).toNotExist();
      });
      it('does not have guardrail message', async () => {
        await expect(screen.LowCorrectionValueGuardrailMessage).toNotExist();
      });
    });
    describe('maximum with warning', () => {
      it('set value', async () => {
        await screen.ApplyOne({
          expected: {
            min: screenLimit.min.noWarning,
            max: screenLimit.max.warning,
          },
          current: {
            min: screenLimit.min.noWarning,
            max: screenLimit.max.noWarning,
          },
        });
      });
      it('has guardrail icon', async () => {
        await expect(screen.GuardrailWarningIconPicker({ index: 1 })).toBeVisible();
      });
      it('has guardrail message', async () => {
        await expect(screen.HighCorrectionValueGuardrailMessage).toBeVisible();
      });
    });
    describe('maximum at limit with warning', () => {
      it('set value', async () => {
        await screen.ApplyOne({
          expected: {
            min: screenLimit.min.noWarning,
            max: screenLimit.max.limit,
          },
          current: {
            min: screenLimit.min.noWarning,
            max: screenLimit.max.warning,
          },
        });
      });
      it('has guardrail icon', async () => {
        await expect(screen.GuardrailWarningIconPicker({ index: 1 })).toBeVisible();
      });
      it('has guardrail message', async () => {
        await expect(screen.HighCorrectionValueGuardrailMessage).toBeVisible();
      });
    });
    it('can close screen', async () => {
      await screen.CancelNewEntryButton.tap();
      await therapySettingsScreen.ReturnToHomeScreen();
    });
  });
  describe('basal rate schedule', () => {
    var screen;
    var therapySettingsScreen;
    var screenLimit;
    it('open basal rates', async () => {
      therapySettingsScreen = await test.OpenTherapySettingsScreen();
      screen = await therapySettingsScreen.OpenBasalRateScreen();
      await screen.OpenPicker('12:00 AM');
      screenLimit = test.getLimitsForSetting('basalRates');
    });
    describe('minimum with no warning', () => {
      it('set value', async () => {
        await screen.ApplyOne({
          expected: { time: '12:00 AM', unitsPerHour: screenLimit.min.limit },
          current: { time: '12:00 AM', unitsPerHour: 1 },
        });
      });
      it('has guardrail icon', async () => {
        await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toNotExist();
      });
      it('has guardrail message', async () => {
        await expect(screen.NoBasalInsulinGuardrailMessage).toNotExist();
      });
    });
    describe('minimum with no warning', () => {
      it('set value', async () => {
        await screen.ApplyOne({
          expected: { time: '12:00 AM', unitsPerHour: screenLimit.max.limit },
          current: { time: '12:00 AM', unitsPerHour: screenLimit.min.limit },
        });
      });
      it('does not have guardrail icon', async () => {
        await expect(screen.GuardrailWarningIconPicker({ index: 0 })).toNotExist();
      });
      it('does not have guardrail message', async () => {
        await expect(screen.NoBasalInsulinGuardrailMessage).toNotExist();
      });
    });
    it('can close screen', async () => {
      await screen.CancelNewEntryButton.tap();
      await therapySettingsScreen.ReturnToHomeScreen();
    });
  });
});
