const { homeScreenAccessibilityTests } = require('./homeScreen.tests');
const { bolusScreenAccessibilityTests } = require('./bolusScreen.tests');
const { carbEntryScreenAccessibilityTests } = require('./carbEntryScreen.tests');
const { settingsScreenAccessibilityTests } = require('./settingsScreen.tests');
const { settingsCarbRatioScreenAccessibilityTests } = require('./settingsCarbRatioScreen.tests');
const { settingsBasalRatesScreenAccessibilityTests } = require('./settingsBasalRatesScreen.tests');
const { settingsDeliveryLimitsScreenAccessibilityTests } = require('./settingsDeliveryLimitsScreen.tests');
const { settingsInsulinSensitivitiesScreenAccessibilityTests } = require('./settingsInsulinSensitivitiesScreen.tests');
const { settingsCorrectionRangeScreenAccessibilityTests } = require('./settingsCorrectionRangeScreen.tests');
const { settingsIssueReportScreenAccessibilityTests } = require('./settingsIssueReportScreen.tests');
const { settingsInsulinModelScreenAccessibilityTests } = require('./settingsInsulinModelScreen.tests');
const { settingsSuspendThresholdScreenAccessibilityTests } = require('./settingsSuspendThresholdScreen.tests');
const { settingsCGMSimulatorScreenTests } = require('./settingsCGMSimulatorScreen.tests');
const { settingsPumpSimulatorScreenTests } = require('./settingsPumpSimulatorScreen.tests');

var accessibilityTests = {
    homeScreenAccessibilityTests,
    bolusScreenAccessibilityTests,
    carbEntryScreenAccessibilityTests,
    settingsScreenAccessibilityTests,
    settingsCarbRatioScreenAccessibilityTests,
    settingsBasalRatesScreenAccessibilityTests,
    settingsDeliveryLimitsScreenAccessibilityTests,
    settingsInsulinSensitivitiesScreenAccessibilityTests,
    settingsCorrectionRangeScreenAccessibilityTests,
    settingsIssueReportScreenAccessibilityTests,
    settingsInsulinModelScreenAccessibilityTests,
    settingsSuspendThresholdScreenAccessibilityTests,
    settingsCGMSimulatorScreenTests,
    settingsPumpSimulatorScreenTests,
};

module.exports = {
    accessibilityTests
};
