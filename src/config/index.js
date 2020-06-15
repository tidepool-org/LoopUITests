const limits = require('./limits');
const defaults = require('./defaults');
const enUSText = require('./enUSText');

class Config {
    _getDefaults(limits, text) {
        return {
            DeliveryLimits: {
                maxBolus: limits.bolusDelivery.max.noWarning,
                maxBasalRate: limits.basalDelivery.max.noWarning,
            },
            BasalRates: [{
                time: text.timeSlots[0],
                unitsPerHour: limits.basalRates.max.noWarning
            }],
            SuspendThreshold: {
                value: limits.suspendThreshold.max.noWarning
            },
            InsulinModel: text.insulinModelSettingsScreen.Model.RapidAdults,
            CarbRatios: [{
                time: text.timeSlots[0],
                carbGramsPerInsulinUnit: limits.insulinCarbRatio.max.noWarning
            }],
            InsulinSensitivities: [{
                time: text.timeSlots[0],
                bgValuePerInsulinUnit: limits.insulinSensitivities.max.noWarning,
            }],
            CorrectionRanges: [{
                time: text.timeSlots[0],
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
                    name: text.cgmSimulatorSettingsScreen.Model.Constant,
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
            }
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
