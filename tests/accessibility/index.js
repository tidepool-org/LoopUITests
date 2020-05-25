const { homeScreenAccessibilityTests } = require('./home_screen.tests');
const { bolusScreenAccessibilityTests } = require('./bolus_screen.tests');
const { carbEntryScreenAccessibilityTests } = require('./carb_entry_screen.tests');
const { settingsScreenAccessibilityTests } = require('./settings_screen.tests');
const { settingsCarbRatiosScreenAccessibilityTests } = require('./settings_carb_ratios_screen.tests');
const { settingsBasalRatesScreenAccessibilityTests } = require('./settings_basal_rates_screen.tests');
const { settingsDeliveryLimitsScreenAccessibilityTests } = require('./settings_delivery_limits_screen.tests');
const { settingsInsulinSensitivitiesScreenAccessibilityTests } = require('./settings_insulin_sensitivities_screen.tests');
const { settingsCorrectionRangeScreenAccessibilityTests } = require('./settings_correction_range_screen.tests');
const { settingsIssueReportScreenAccessibilityTests } = require('./settings_issue_report_screen.tests');
const { settingsInsulinModelScreenAccessibilityTests } = require('./settings_insulin_model_screen.tests');

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
};

module.exports = {
    accessibilityTests
};
