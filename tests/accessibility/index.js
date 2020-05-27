const { homeScreenAccessibilityTests } = require('./homeScreen.tests');
const { bolusScreenAccessibilityTests } = require('./bolusScreen.tests');
const { carbEntryScreenAccessibilityTests } = require('./carbEntryScreen.tests');
const { settingsScreenAccessibilityTests } = require('./settingsScreen.tests');
const { settingsCarbRatiosScreenAccessibilityTests } = require('./settingsCarbRatiosScreen.tests');
const { settingsBasalRatesScreenAccessibilityTests } = require('./settingsBasalRatesScreen.tests');
const { settingsDeliveryLimitsScreenAccessibilityTests } = require('./settingsDeliveryLimitsScreen.tests');
const { settingsInsulinSensitivitiesScreenAccessibilityTests } = require('./settingsInsulinSensitivitiesScreen.tests');
const { settingsCorrectionRangeScreenAccessibilityTests } = require('./settingsCorrectionRangeScreen.tests');
const { settingsIssueReportScreenAccessibilityTests } = require('./settingsIssueReportScreen.tests');
const { settingsInsulinModelScreenAccessibilityTests } = require('./settingsInsulinModelScreen.tests');
const { settingsSuspendThresholdScreenAccessibilityTests } = require('./settingsSuspendThresholdScreen.tests');

var accessibilityTests = {
    homeScreenAccessibilityTests,
    bolusScreenAccessibilityTests,
    carbEntryScreenAccessibilityTests,
    settingsScreenAccessibilityTests,
    settingsCarbRatiosScreenAccessibilityTests,
    settingsBasalRatesScreenAccessibilityTests,
    settingsDeliveryLimitsScreenAccessibilityTests,
    settingsInsulinSensitivitiesScreenAccessibilityTests,
    settingsCorrectionRangeScreenAccessibilityTests,
    settingsIssueReportScreenAccessibilityTests,
    settingsInsulinModelScreenAccessibilityTests,
    settingsSuspendThresholdScreenAccessibilityTests,
};

module.exports = {
    accessibilityTests
};
