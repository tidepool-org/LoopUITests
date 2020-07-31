const { homeScreen } = require('./homeScreen.tests');
const { homeGlucoseScreen } = require('./homeGlucoseScreen.tests');
const { homeActiveInsulinScreen } = require('./homeActiveInsulinScreen.tests');
const { homeInsulinDeliveryScreen } = require('./homeInsulinDeliveryScreen.tests');
const { bolusScreen } = require('./bolusScreen.tests');
const { carbEntryScreen } = require('./carbEntryScreen.tests');
const { settingsScreen } = require('./settings/settingsScreen.tests');
const { settingsCarbRatioScreen } = require('./settings/settingsCarbRatioScreen.tests');
const { settingsBasalRatesScreen } = require('./settings/settingsBasalRatesScreen.tests');
const { settingsDeliveryLimitsScreen } = require('./settings/settingsDeliveryLimitsScreen.tests');
const { settingsInsulinSensitivitiesScreen } = require('./settings/settingsInsulinSensitivitiesScreen.tests');
const { settingsCorrectionRangeScreen } = require('./settings/settingsCorrectionRangeScreen.tests');
const { settingsIssueReportScreen } = require('./settings/settingsIssueReportScreen.tests');
const { settingsInsulinModelScreen } = require('./settings/settingsInsulinModelScreen.tests');
const { settingsSuspendThresholdScreen } = require('./settings/settingsSuspendThresholdScreen.tests');
const { cgmSimulatorScreenTests } = require('./devices/cgmSimulatorScreen.tests');
const { pumpSimulatorScreenTests } = require('./devices/pumpSimulatorScreen.tests');
const { g6ScreenTests } = require('./devices/g6Screen.tests');
const { threapySettings } = require('./settings/threapySettings.tests');
const { homeActiveCarbohydratesScreen } = require('./homeActiveCarbohydratesScreen.tests');
const { customPresetsScreen } = require('./customPresetsScreen.tests');

module.exports = {
    homeScreen,
    homeGlucoseScreen,
    homeActiveInsulinScreen,
    homeInsulinDeliveryScreen,
    homeActiveCarbohydratesScreen,
    bolusScreen,
    carbEntryScreen,
    settingsScreen,
    settingsCarbRatioScreen,
    settingsBasalRatesScreen,
    settingsDeliveryLimitsScreen,
    settingsInsulinSensitivitiesScreen,
    settingsCorrectionRangeScreen,
    settingsIssueReportScreen,
    settingsInsulinModelScreen,
    settingsSuspendThresholdScreen,
    cgmSimulatorScreenTests,
    pumpSimulatorScreenTests,
    g6ScreenTests,
    threapySettings,
    customPresetsScreen,
};
