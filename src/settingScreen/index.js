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

const { AlertScreen } = require('./alertScreen');
const { SupportScreen } = require('./supportScreen');
const { TherapyScreen } = require('./therapyScreen');

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
    AlertScreen,
    SupportScreen,
    TherapyScreen,
};

module.exports = {
    settingsSubScreen,
};
