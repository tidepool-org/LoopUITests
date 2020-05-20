const { BasalRatesScreen } = require('./basalRatesScreen');
const { CarbRatiosScreen } = require('./carbRatiosScreen');
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
    CarbRatiosScreen,
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
