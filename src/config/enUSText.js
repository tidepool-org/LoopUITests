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
    Dismiss: 'Dismiss',
    OK: 'OK',
    ButtonLabel: {
        Plus: 'plus',
        InfoCircle: 'info.circle',
    },
    Alert: {
        ExclamationMark: 'exclamationmark.triangle.fill',
        MissingCarbEffects: 'Missing Data: Carb Effects',
        MissingInsulinEffects: 'Missing Data: Insulin Effects',
        ConfigurationError: 'Configuration Error: Check Settings',
        MissingGlucoseData: 'Missing Data: Glucose Data Not Available',
        BolusError: 'Bolus\nCommunication Failure',

    },
    TimeSlot: [
        '12:00 AM', '12:30 AM', '1:00 AM', '1:30 AM', '2:00 AM', '2:30 AM', '3:00 AM', '3:30 AM', '4:00 AM', '4:30 AM', '5:00 AM', '5:30 AM', '6:00 AM', '6:30 AM', '7:00 AM', '7:30 AM', '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
        '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM', '10:30 PM', '11:00 PM', '11:30 PM'
    ],
};

var Device = {
    G6: 'Dexcom G6',
    AddCGM: 'Add CGM',
    AddCGMFull: 'Add CGM\nTap here to set up a CGM',
    AddPump: 'Add Pump',
    AddPumpFull: 'Add Pump\nTap here to set up a pump',
    PumpStatus: 'Pump Status',
    CGMStatus: 'CGM Status',
    PumpSimulator: 'Insulin Pump Simulator',
    PumpSimulatorId: 'Simulator Small',
    CGMSimulator: 'CGM Simulator',
    Simulator: 'Simulator',
    G6Screen: {
        Header: 'Sensor Code',
        EnterCode: 'Enter Code',
        NoCode: 'No Code',
        DeviceImage: 'sensor-code',
    },
    CGMSimulatorScreen: {
        Header: 'CGM Settings',
        BaseGlucose: 'Base Glucose',
        SineCurve: 'Sine Curve',
        Amplitude: 'Amplitude',
        DeleteCGM: 'Delete CGM',
        Alerts: {
            Header: 'ALERTS',
            IssueAlerts: 'Issue Alerts',
            ImmediateAlert: 'Issue an immediate alert',
            DelayedAlert: 'Issue a "delayed 60.0 seconds" alert',
            ReapeatingAlert: 'Issue a "repeating every 60.0 seconds" alert',
            RetractAlertAbove: 'Retract any alert above',
        },
        History: {
            Header: 'HISTORY',
            BackfillGlucose: 'Backfill Glucose',
            Trend: 'Trend',
            Hours: 'hours',
            RisingVeryFastTrend: '⇈  Rising very fast',
            RisingFastTrend: '↑  Rising fast',
            RisingTrend: '↗︎  Rising',
            FaltTrend: '→  Flat',
            FallingTrend: '↘︎  Falling',
            FallingFastTrend: '↓  Falling fast',
            FallingVeryFastTrend: '⇊  Falling very fast',
        },
        Effect: {
            Header: 'EFFECTS',
            GlucoseNoise: 'Glucose Noise',
            RandomHighOutlier: 'Random High Outlier',
            RandomLowOutlier: 'Random Low Outlier',
            RandomError: 'Random Error',
        },
        Model: {
            Header: 'MODEL',
            Constant: 'Constant',
            SineCurve: 'Sine Curve',
            None: 'No Data',
            SignalLoss: 'Signal Loss',
        },
        Frequency: {
            MeasurementFrequency: 'Measurement Frequency',
            Minutes: '5 minutes',
            Seconds: '5 seconds',
        }
    },
    PumpSimulatorScreen: {
        Header: 'Pump Settings',
        ConfigurationHeader: 'CONFIGURATION',
        PumpSettings: 'Pump Settings',
        ReservoirRemaining: 'Reservoir Remaining',
        BatteryRemaining: 'Battery Remaining',
        ErrorOnTempBasal: 'Error on Temp Basal',
        ErrorOnBolus: 'Error on Bolus',
        ErrorOnSuspend: 'Error on Suspend',
        ErrorOnResume: 'Error on Resume',
        NextDeliveryCommandUncertain: 'Next Delivery Command Uncertain',
        DeletePump: 'Delete Pump',
        SuspendDelivery: 'Suspend Delivery',
        ResumeDelivery: 'Resume Delivery',
        CausePumpError: 'Cause Pump Error',
        ResolvePumpError: 'Resolve Pump Error',
        DetectOcclusion: 'Detect Occlusion',
        ResolveOcclusion: 'Resolve Occlusion',
    }
};

var StatusScreen = {
    AddPump: 'Add Pump',
    PumpError: 'Pump Error',
    PumpOcclusion: 'Pump Occlusion',
    AddCGM: 'Add CGM',
    CGMError: 'CGM Error',
    ActiveCarbohydrates: 'Active Carbohydrates',
    ActiveInsulin: 'Active Insulin',
    InsulinDelivery: 'Insulin Delivery',
    Glucose: 'Glucose',
    LoopWaitingForFirstRun: 'Waiting for first run',
    GlucoseScreen: {
        Glucose: 'Glucose',
        Header: 'Predicted Glucose',
        Carbohydrates: 'Carbohydrates',
        Insulin: 'Insulin',
        GlucoseMomentum: 'Glucose Momentum',
        RetrospectiveCorrection: 'Retrospective Correction',
    },
    ActiveInsulinScreen: {
        Header: 'Insulin Delivery',
        IOB: 'U IOB',
        Total: 'U Total',
        EventHistory: 'Event History',
        Reservoir: 'Reservoir',
    },
    InsulinDeliveryScreen: {
        Header: 'Insulin Delivery',
        IOB: 'U IOB',
        Total: 'U Total',
        EventHistory: 'Event History',
        Reservoir: 'Reservoir',
    },
    ActiveCarbohydratesScreen: {
        ActiveCarbohydrates: 'Active Carbohydrates',
        Header: 'Carbohydrates',
        GlucoseChange: 'Glucose Change',
        Predicted: 'Predicted',
        Observed: 'Observed',
        GramsActiveCarbs: 'g COB',
        GramsTotalCarbs: 'g Total',
    },
    HUD: {
        CGMSignalLoss: 'Signal Loss',
        CGMGenericAlert: 'Alert: FG Title',
        PumpCommsIssue: 'Comms Issue',
        PumpNoInsulin: 'No Insulin',
        BGTapToAdd: 'Tap to Add',
        BGNoRecent: 'No Recent Glucose',
    },
};

var CarbEntryScreen = {
    Header: 'Add Carb Entry',
    AddMeal: 'Add Meal',
    SaveWithoutBolusing: 'Save without Bolusing',
    AmountConsumed: 'Amount Consumed',
    Time: 'Time',
    FoodType: 'Food Type',
    AbsorptionTime: 'Absorption Time',
    AbsorptionMessage: 'Choose a longer absorption time for larger meals, or those containing fats and proteins. This is only guidance to the algorithm and need not be exact.',
    MealBolusScreen: {
        Header: 'Meal Bolus',
        CarbEntry: 'Carb Entry',
        Unit: 'U',
        RecommendedBolus: 'Recommended Bolus',
        BolusSummary: 'Bolus Summary',
        Bolus: 'Bolus',
        ActiveCarbs: 'Active Carbs',
        SaveAndDeliver: 'Save and Deliver',
        Glucose: 'Glucose',
        SaveWithoutBolusing: 'Save without Bolusing',
    },
};

var BolusScreen = {
    Header: 'Bolus',
    Unit: 'U',
    RecommendedBolus: 'Recommended Bolus',
    BolusSummary: 'Bolus Summary',
    ActiveCarbs: 'Active Carbs',
    Deliver: 'Deliver',
    EnterBolus: 'Enter Bolus',
    Glucose: 'Glucose',
};

var CustomPresetScreen = {
    WorkoutTargets: 'Workout Targets',
    Header: 'Custom Preset',
    Info: "Tap '+' to create a new preset",
    Presets: 'Presets',
};

var SettingsScreen = {
    Settings: 'Settings',
    Configuration: 'Configuration',
    Support: 'Support',
    ClosedLoop: 'Closed Loop',
    TherapySettingsScreen: {
        Header: 'Therapy Settings',
        Info: 'Diabetes Treatment',
    },
    DeliveryLimitsScreen: {
        Header: 'Delivery Limits',
        Info: 'Maximum basal rate is the highest temporary basal rate Loop is allowed to set automatically.\n\nMaximum bolus is the highest bolus amount you can deliver at one time to cover carbs or bring down high glucose.',
        MaxBasalRate: 'Maximum Basal Rate',
        MaxBasalRateInfo: 'Maximum basal rate is the highest temporary basal rate Loop is allowed to set automatically.',
        BasalRateUnits: 'U/hr',
        MaxBolus: 'Maximum Bolus',
        MaxBolusInfo: 'Maximum bolus is the highest bolus amount you can deliver at one time to cover carbs or bring down high glucose.',
        BolusUnits: 'U',
        LowMaxBasalRateGuardrailMessage: 'Low Maximum Basal Rate',
        HighMaxBasalRateGuardrailMessage: 'High Maximum Basal Rate',
        LowBolusAmountGuardrailMessage: 'Low Bolus Amount',
        HighBolusAmountGuardrailMessage: 'High Bolus Amount'
    },
    InsulinSensitivitiesScreen: {
        Header: 'Insulin Sensitivities',
        Info: 'Your insulin sensitivities refer to the drop in glucose expected from one unit of insulin.',
        LowInsulinSensitivityGuardrailMessage: 'Low Insulin Sensitivity',
        HighInsulinSensitivityGuardrailMessage: 'High Insulin Sensitivity',
    },
    CorrectionRangeScreen: {
        Header: 'Correction Range',
        Info: 'Correction range is the glucose value (or range of values) that you want Loop to aim for in adjusting your basal insulin.',
        LowCorrectionValueGuardrailMessage: 'Low Correction Value',
        HighCorrectionValueGuardrailMessage: 'High Correction Value',
    },
    WorkoutRangeScreen: {
        Header: 'Workout Range',
        Info: 'Temporarily raise your glucose target before, during, or after physical activity to reduce the risk of low glucose events.',
    },
    PremealRangeScreen: {
        Header: 'Pre-Meal Range',
        Info: 'Temporarily lower your glucose target before a meal to impact post-meal glucose spikes.',
    },
    BasalRatesScreen: {
        Header: 'Basal Rates',
        Info: 'Your basal rate of insulin is the number of units per hour that you want to use to cover your background insulin needs.',
        Units: 'U/hr',
        NoBasalInsulinGuardrailMessage: 'No Basal Insulin'
    },
    SuspendThresholdScreen: {
        BGUnits: 'mg/dL',
        Header: 'Suspend Threshold',
        Info: 'When your glucose is predicted to go below this value, the app will recommend a basal rate of 0 U/hr and will not recommend a bolus.',
        HighSuspendThresholdGuardrailMessage: 'High Suspend Threshold',
        LowSuspendThresholdGuardrailMessage: 'Low Suspend Threshold',
    },
    InsulinModelScreen: {
        Header: 'Insulin Model',
        Info: 'The app assumes insulin is actively working for 6 hours. You can choose from different models for how the app measures the insulin’s peak activity.',
        Model: {
            Walsh: 'Walsh',
            RapidAdults: 'Rapid-Acting – Adults',
            RapidChildren: 'Rapid-Acting – Children',
            Fiasp: 'Fiasp'
        }
    },
    CarbRatioScreen: {
        Header: 'Carb Ratios',
        Info: 'Your carb ratio is the number of grams of carbohydrate covered by one unit of insulin.',
        HighCarbRatioGuardrailMessage: 'High Carb Ratio',
        LowCarbRatioGuardrailMessage: 'Low Carb Ratio'
    },
};

module.exports = {
    general: General,
    device: Device,
    bolusScreen: BolusScreen,
    carbEntryScreen: CarbEntryScreen,
    settingsScreen: SettingsScreen,
    customPresetScreen: CustomPresetScreen,
    statusScreen: StatusScreen,
};
