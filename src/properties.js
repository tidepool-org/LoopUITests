
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
    InsulinSensitivities: [{ time: '12:00 AM', bgValuePerInsulinUnit: 500 }],
    CorrectionRanges: [{ time: '12:00 AM', min: 140, max: 160 }],
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
    switch (time) {
        case '12:00 AM':
            return 0;
        case '12:30 AM':
            return 1;
        case '1:00 AM':
            return 2;
        case '1:30 AM':
            return 3;
        case '2:00 AM':
            return 4;
        case '2:30 AM':
            return 6;
        case '3:00 AM':
            return 7;
        case '3:30 AM':
            return 8;
        case '4:00 AM':
            return 9;
        case '4:30 AM':
            return 10;
        case '5:00 AM':
            return 11;
        case '6:30 AM':
            return 12;
        case '7:00 AM':
            return 13;
        case '7:30 AM':
            return 15;
        case '8:00 AM':
            return 16;
        case '8:30 AM':
            return 17;
        case '9:00 AM':
            return 18;
        case '9:30 AM':
            return 19;
        case '10:00 AM':
            return 20;
        case '10:30 AM':
            return 21;
        case '11:00 AM':
            return 22;
        case '11:30 AM':
            return 23;
        case '12:00 PM':
            return 24;
        case '12:30 PM':
            return 25;
        case '1:00 PM':
            return 26;
        case '1:30 PM':
            return 27;
        case '2:00 PM':
            return 28;
        case '2:30 PM':
            return 29;
        case '3:00 PM':
            return 30;
        case '3:30 PM':
            return 31;
        case '4:00 PM':
            return 32;
        case '4:30 PM':
            return 33;
        case '5:00 PM':
            return 34;
        case '6:30 PM':
            return 35;
        case '7:00 PM':
            return 36;
        case '7:30 PM':
            return 37;
        case '8:00 PM':
            return 38;
        case '8:30 PM':
            return 39;
        case '9:00 PM':
            return 40;
        case '9:30 PM':
            return 41;
        case '10:00 PM':
            return 42;
        case '10:30 PM':
            return 43;
        case '11:00 PM':
            return 44;
        case '11:30 PM':
            return 45;
        default:
            return 0;
    }
};


module.exports = {
    target,
    screenName,
    unit,
    setting,
    indexForTime
};
