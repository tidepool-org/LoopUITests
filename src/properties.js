const { timeSlots } = require('./text');

var target = {
    tidepool: 'tidepool',
    diy: 'diy',
};

var unit = {
    mmoll: 'mmol/L',
    mgdl: 'mg/dL',
};

var screenName = {
    settings: 'settings',
    home: 'home',
    bolus: 'bolus',
    carbEntry: 'carbEntry',
};

/**
 * @summary insulin activity model
 */
var settingInsulinModel = {
    Walsh: 'Walsh',
    RapidAdults: 'Rapid-Acting – Adults',
    RapidChildren: 'Rapid-Acting – Children',
    Fiasp: 'Fiasp'
};

/**
 * @summary CGMModel that can be applied to the simulator
 */
var settingCGMModel = {
    Constant: 'Constant',
    SineCurve: 'Sine Curve',
    None: 'No Data'
};

/**
 * @summary Defaults that can be used to apply to all settings
 */
var settingDefault = {
    DeliveryLimits: { maxBolus: 10.0, maxBasalRate: 3.0 },
    BasalRates: [{ time: '12:00 AM', unitsPerHour: 0.1 }],
    SuspendThreshold: { value: 75 },
    InsulinModel: settingInsulinModel.RapidChildren,
    CarbRatios: [{ time: '12:00 AM', carbGramsPerInsulinUnit: 8 }],
    InsulinSensitivities: [{ time: '12:00 AM', bgValuePerInsulinUnit: 380 }],
    CorrectionRanges: [{ time: '12:00 AM', min: 100, max: 120 }],
    PreMealCorrectionRange: { min: 80, max: 180 },
    ClosedLoop: true,
    AddCGMSimulator: true,
    AddPumpSimulator: true,
    CGMSimulatorSettings: { modelData: { model: settingCGMModel.Constant, bgValues: [110] }, backfillHours: '6' }
};

/**
 * @summary maps to Settings functions and is used to Filter functions when applying settings
 */
var settingType = {
    BasalRates: 'BasalRates',
    CarbRatios: 'CarbRatios',
    DeliveryLimits: 'DeliveryLimits',
    InsulinModel: 'InsulinModel',
    SuspendThreshold: 'SuspendThreshold',
    InsulinSensitivities: 'InsulinSensitivities',
    CorrectionRanges: 'CorrectionRanges',
    PreMealCorrectionRange: 'PreMealCorrectionRange',
    ClosedLoop: 'ClosedLoop',
    AddPumpSimulator: 'AddPumpSimulator',
    AddCGMSimulator: 'AddCGMSimulator',
    CGMSimulatorSettings: 'CGMSimulatorSettings'
};

/**
 * @summary CGMEffect that can be applied to the simulator
 */
var settingCGMEffect = {
    GlucoseNoise: 'Glucose Noise',
    RandomHighOutlier: 'Random High Outlier',
    RandomLowOutlier: 'Random Low Outlier',
    RandomError: 'Random Error'
};

var setting = {
    type: settingType,
    default: settingDefault,
    insulinModel: settingInsulinModel,
    cgmModel: settingCGMModel,
    cgmEffect: settingCGMEffect,
};

var indexForTime = (time) => {
    return timeSlots.findIndex((element) => element === time);
};


module.exports = {
    target,
    screenName,
    unit,
    setting,
    indexForTime
};
