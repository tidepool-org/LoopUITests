/* eslint-disable no-shadow */
const limits = require('./limits');
const defaults = require('./defaults');
const enUSText = require('./enUSText');

class Config {
  _getDefaults(limits, text) {
    return {
      DeliveryLimits: {
        maxBolus: limits.delivery.bolus.max.noWarning,
        maxBasalRate: limits.delivery.basalRate.max.noWarning,
      },
      BasalRates: [{
        time: text.general.TimeSlot[0],
        unitsPerHour: limits.basalRates.max.noWarning,
      }],
      GlucoseSafetyLimit: {
        value: limits.glucoseSafetyLimit.max.noWarning,
      },
      InsulinModel: text.settingsScreen.InsulinModelScreen.Model.RapidAdults,
      CarbRatios: [{
        time: text.general.TimeSlot[0],
        carbGramsPerInsulinUnit: limits.insulinCarbRatio.max.noWarning,
      }],
      InsulinSensitivities: [{
        time: text.general.TimeSlot[0],
        bgValuePerInsulinUnit: limits.insulinSensitivities.max.noWarning,
      }],
      CorrectionRanges: [{
        time: text.general.TimeSlot[0],
        min: limits.correctionRange.min.noWarning,
        max: limits.correctionRange.max.noWarning,
      }],
      PreMealCorrectionRange: {
        min: 80,
        max: 180,
      },
      ClosedLoop: true,
      AddCGMSimulator: true,
      AddPumpSimulator: true,
      CGMSimulatorSettings: {
        model: {
          name: text.device.CGMSimulatorScreen.Model.Constant,
          bgValues: [110],
        },
        backfillHours: '6',
      },
      PumpSimulatorSettings: {
        errorOnBolus: false,
        errorOnTempBasal: false,
        errorOnSuspend: false,
        errorOnResume: false,
        reservoirRemaining: 188,
        batteryRemaining: 85,
      },
    };
  }

  async prepare() {
    return {
      limits: limits.mgdL,
      screenDefaults: defaults.mgdL,
      text: enUSText,
      settingDefault: this._getDefaults(limits.mgdL, enUSText),
    };
  }
}

module.exports = {
  Config,
};
