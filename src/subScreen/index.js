const { BasalRatesScreen } = require('./basalRatesScreen');
const { CarbRatiosScreen } = require('./carbRatiosScreen');
const { CGMSimulatorScreen } = require('./cgmSimulatorScreen');
const { CorrectionRangeScreen } = require('./correctionRangeScreen');
const { DeliveryLimitsScreen } = require('./deliveryLimitsScreen');
const { InsulinSensitivitiesScreen } = require('./insulinSensitivitiesScreen');
const { SuspendThresholdScreen } = require('./suspendThresholdScreen');
const { IssueReportScreen } = require('./issueReportScreen');
const { InsulinModelScreen } = require('./insulinModelScreen');

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
};

module.exports = {
    settingsSubScreen,
};
