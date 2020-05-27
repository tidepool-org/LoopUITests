var Units = {
    Glucose: 'mg/dL',
    BasalRatesUnits: 'U/hr',
    InsulinSensitivitiesUnits: 'mg/dL/U',
};

var ButtonLabel = {
    Plus: 'plus',
    InfoCircle: 'info.circle',
};

var General = {
    NewEntry: 'New Entry',
    Cancel: 'Cancel',
    Continue: 'Continue',
    Done: 'Done',
    Save: 'Save',
    Back: 'Back',
    Add: 'Add',
    Edit: 'Edit',
    Status: 'Status',
    OK: 'OK',
    Plus: 'plus',
};

var HomeScreen = {
    ActiveCarbohydrates: 'Active Carbohydrates',
    ActiveInsulin: 'Active Insulin',
    InsulinDelivery: 'Insulin Delivery',
    Glucose: 'Glucose',
    LoopWaitingForFirstRun: 'Waiting for first run'
};

var CarbEntryScreen = {
    AddMeal: 'Add Meal',
    SaveWithoutBolusing: 'Save without Bolusing',
    AddCarbEntry: 'Add Carb Entry',
    AmountConsumed: 'Amount Consumed',
    Date: 'Date',
    FoodType: 'Food Type',
    AbsorptionTime: 'Absorption Time',
    AbsorptionMessage: 'Choose a longer absorption time for larger meals, or those containing fats and proteins. This is only guidance to the algorithm and need not be exact.'
};

var BolusScreen = {
    Bolus: 'Bolus',
    Deliver: 'Deliver',
    Recommended: 'Recommended',
    Entered: 'Entered'
};

var TempOverrideScreen = {
    WorkoutTargets: 'Workout Targets',
    TemporaryOverride: 'Temporary Override',
    Symbol: 'Symbol',
    Name: 'Name',
    Recommended: 'Recommended',
    CustomPreset: 'Custom Preset',
    AddPresetMessage: "Tap '+' to create a new custom preset."
};

var SettingsScreen = {
    Settings: 'Settings',
    Configuration: 'CONFIGURATION',
    Services: 'SERVICES',
    ContinuousGlucoseMonitor: 'CONTINUOUS GLUCOSE MONITOR',
    Pump: 'PUMP',
    AddService: 'Add Service',
    Simulator: 'Simulator',
    IssueReport: 'Issue Report',
    BasalRates: 'Basal Rates',
    SaveToSimulator: 'Save to simulator',
    DeliveryLimits: 'Delivery Limits',
    InsulinSensitivities: 'Insulin Sensitivities',
    InsulinSensitivityInfo: 'Your insulin sensitivity factor (ISF) is the drop in glucose expected from one unit of insulin.',
    SuspendThreshold: 'Suspend Threshold',
    SuspendThresholdInfo: 'When your glucose is predicted to go below this value, the app will recommend a basal rate of 0 U/h and will not recommend a bolus.',
    CorrectionRange: 'Correction Range',
    CorrectionRangeInfo: 'The app adjusts insulin delivery in an effort to bring your glucose into your correction range.',
    InsulinModel: 'Insulin Model',
    CarbRatios: 'Carb Ratios',
    ClosedLoop: 'Closed Loop',
    AddCGM: 'Add CGM',
    DeleteCGMData: 'Delete CGM Data',
    DeleteCGM: 'Delete CGM',
    AddPump: 'Add Pump',
    DeletePump: 'Delete Pump',
    DeletePumpData: 'Delete Pump Data',
    PreMeal: 'Pre-Meal',
};

var CGMSimulatorSettingsScreen = {
    CGMSettings: 'CGM Settings',
    BaseGlucose: 'Base Glucose',
    SineCurve: 'Sine Curve',
    Amplitude: 'Amplitude',
    BackfillGlucose: 'Backfill Glucose',
}

var PumpSimulatorSettingsScreen = {
    PumpSettings: 'Pump Settings',
    RemainingReservoir: 'Remaining Reservoir',
    RemainingBattery: 'Remaining Battery',
    ErrorOnTempBasal: 'Error on Temp Basal',
    ErrorOnBolus: 'Error on Bolus',
    ErrorOnSuspend: 'Error on Suspend',
    ErrorOnResume: 'Error on Resume',
    DeletePump: 'Delete Pump',
    SuspendDelivery: 'Suspend Delivery',
    ResumeDelivery: 'Resume Delivery',
}

var Alerts = {
    ExclamationMark: 'exclamationmark.triangle.fill',
    MissingCarbEffects: 'Missing Data: Carb Effects',
    MissingInsulinEffects: 'Missing Data: Insulin Effects',
    ConfigurationError: 'Configuration Error: Check Settings',
    MissingGlucoseData: 'Missing Data: Glucose Data Not Available'
};

var TimeSlots = [
    '12:00 AM', '12:30 AM', '1:00 AM', '1:30 AM', '2:00 AM', '2:30 AM', '3:00 AM', '3:30 AM', '4:00 AM', '4:30 AM', '5:00 AM', '5:30 AM', '6:00 AM', '6:30 AM', '7:00 AM', '7:30 AM', '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM', '10:30 PM', '11:00 PM', '11:30 PM'
];

var text = {
    units: Units,
    alerts: Alerts,
    general: General,
    bolusScreen: BolusScreen,
    carbEntryScreen: CarbEntryScreen,
    settingsScreen: SettingsScreen,
    cgmSimulatorSettingsScreen: CGMSimulatorSettingsScreen,
    pumpSimulatorSettingsScreen: PumpSimulatorSettingsScreen,
    overridesScreen: TempOverrideScreen,
    homeScreen: HomeScreen,
    timeSlots: TimeSlots,
    buttonLabel: ButtonLabel,
};

module.exports = text;
