const { BasalRatesScreen } = require('./basalRatesScreen');
const { CarbRatioScreen } = require('./carbRatioScreen');
const { CGMSimulatorScreen } = require('./cgmSimulatorScreen');
const { CorrectionRangeScreen } = require('./correctionRangeScreen');
const { DeliveryLimitsScreen } = require('./deliveryLimitsScreen');
const { InsulinSensitivitiesScreen } = require('./insulinSensitivitiesScreen');
const { SuspendThresholdScreen } = require('./suspendThresholdScreen');
const { IssueReportScreen } = require('./issueReportScreen');
const { InsulinModelScreen } = require('./insulinModelScreen');
const { PumpSimulatorScreen } = require('./pumpSimulatorScreen');

var settingsSubScreen = {
    BasalRatesScreen,
    CarbRatioScreen,
    CGMSimulatorScreen,
    CorrectionRangeScreen,
    DeliveryLimitsScreen,
    InsulinSensitivitiesScreen,
    SuspendThresholdScreen,
    IssueReportScreen,
    InsulinModelScreen,
    PumpSimulatorScreen,
};

module.exports = {
    settingsSubScreen,
};
