var screenName = {
    settings: 'settings',
    status: 'status',
    bolus: 'bolus',
    carbEntry: 'carbEntry',
};

/**
 * @summary maps to Settings functions and is used to Filter functions when applying settings
 */
var settingType = {
    BasalRates: 'BasalRates',
    CarbRatios: 'CarbRatios',
    DeliveryLimits: 'DeliveryLimits',
    InsulinModel: 'InsulinModel',
    GlucoseSafetyLimit: 'GlucoseSafetyLimit',
    InsulinSensitivities: 'InsulinSensitivities',
    CorrectionRanges: 'CorrectionRanges',
    PreMealCorrectionRange: 'PreMealCorrectionRange',
    ClosedLoop: 'ClosedLoop',
    AddPumpSimulator: 'AddPumpSimulator',
    AddCGMSimulator: 'AddCGMSimulator',
    CGMSimulatorSettings: 'CGMSimulatorSettings',
    PumpSimulatorSettings: 'PumpSimulatorSettings',
};

module.exports = {
    screenName,
    settingType
};
