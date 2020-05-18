const {
    homeScreenFunctionalityTests,
    carbEntryScreenFunctionalityTests,
    cleanupFunctionalityTests,
    settingsScreenFunctionalityTests } = require('./functionality.tests');
const {
    homeScreenAccessibilityTests,
    carbEntryScreenAccessibilityTests,
    settingsScreenAccessibilityTests,
    bolusScreenAccessibilityTests,
    settingsCarbRatiosScreenAccessibilityTests,
    settingsBasalRatesScreenAccessibilityTests,
    settingsDeliveryLimitsScreenAccessibilityTests,
    settingsInsulinSensitivitiesScreenAccessibilityTests,
    settingsCorrectionRangeScreenAccessibilityTests,
    settingsInsulinModelScreenAccessibilityTests,
    settingsIssueReportScreenAccessibilityTests,
    settings
} = require('./accessibility.tests');

var smokeTests = {
    settingsScreenFunctionalityTests,
    homeScreenFunctionalityTests,
    carbEntryScreenFunctionalityTests,
    cleanupFunctionalityTests,
    homeScreenAccessibilityTests,
    carbEntryScreenAccessibilityTests,
    settingsScreenAccessibilityTests,
    bolusScreenAccessibilityTests,
    settingsCarbRatiosScreenAccessibilityTests,
    settingsBasalRatesScreenAccessibilityTests,
    settingsDeliveryLimitsScreenAccessibilityTests,
    settingsInsulinSensitivitiesScreenAccessibilityTests,
    settingsCorrectionRangeScreenAccessibilityTests,
    settingsInsulinModelScreenAccessibilityTests,
    settingsIssueReportScreenAccessibilityTests,
};

module.exports = {
    smokeTests,
};
