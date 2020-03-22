var Label = {
    Cancel: 'Cancel',
    Continue: 'Continue',
    Done: 'Done',
    Save: 'Save',
    Back: 'Back',
    Add: 'Add',
    Edit: 'Edit',
    Status: 'Status',
    OK: 'OK',
};

var HomeLabel = {
    ActiveCarbohydrates: 'Active Carbohydrates',
    ActiveInsulin: 'Active Insulin',
    InsulinDelivery: 'Insulin Delivery',
    Glucose: 'Glucose',
    LoopWaitingForFirstRun: 'Waiting for first run'
};

var CarbsLabel = {
    AddMeal: 'Add Meal',
    SaveWithoutBolusing: 'Save without Bolusing',
    AddCarbEntry: 'Add Carb Entry',
    AmountConsumed: 'Amount Consumed',
    Date: 'Date',
    FoodType: 'Food Type',
    AbsorptionTime: 'Absorption Time',
    AbsorptionMessage: 'Choose a longer absorption time for larger meals, or those containing fats and proteins. This is only guidance to the algorithm and need not be exact.'
};

var BolusLabel = {
    Bolus: 'Bolus',
    Deliver: 'Deliver',
    Recommended: 'Recommended'
};

var TempOverrideLabel = {
    WorkoutTargets: 'Workout Targets',
    TemporaryOverride: 'Temporary Override',
    Symbol: 'Symbol',
    Name: 'Name',
    Recommended: 'Recommended',
    CustomPreset: 'Custom Preset',
    AddPresetMessage: "Tap '+' to create a new custom preset."
};

var SettingsLabel = {
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
    SuspendThreshold: 'Suspend Threshold',
    CorrectionRange: 'Correction Range',
    InsulinModel: 'Insulin Model',
    CarbRatios: 'Carb Ratios',
    ClosedLoop: 'Closed Loop',
    AddCGM: 'Add CGM',
    DeleteCGMData: 'Delete CGM Data',
    DeleteCGM: 'Delete CGM',
    AddPump: 'Add Pump',
    DeletePump: 'Delete Pump',
    DeletePumpData: 'Delete Pump Data'
};


var label = {
    general: Label,
    bolusScreen: BolusLabel,
    carbEntryScreen: CarbsLabel,
    settingsScreen: SettingsLabel,
    overridesScreen: TempOverrideLabel,
    homeScreen: HomeLabel
};

module.exports = {
    label
    // Label,
    // CarbsLabel,
    // BolusLabel,
    // SettingsLabel,
    // TempOverrideLabel,
    // HomeLabel
};
