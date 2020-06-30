const { homeScreen } = require('./homeScreen.tests');
const { homeGlucoseScreen } = require('./homeGlucoseScreen.tests');
const { homeActiveInsulinScreen } = require('./homeActiveInsulinScreen.tests');
const { homeInsulinDeliveryScreen } = require('./homeInsulinDeliveryScreen.tests');
const { bolusScreen } = require('./bolusScreen.tests');
const { carbEntryScreen } = require('./carbEntryScreen.tests');
const { settingsScreen } = require('./settingsScreen.tests');
const { settingsCarbRatioScreen } = require('./settingsCarbRatioScreen.tests');
const { settingsBasalRatesScreen } = require('./settingsBasalRatesScreen.tests');
const { settingsDeliveryLimitsScreen } = require('./settingsDeliveryLimitsScreen.tests');
const { settingsInsulinSensitivitiesScreen } = require('./settingsInsulinSensitivitiesScreen.tests');
const { settingsCorrectionRangeScreen } = require('./settingsCorrectionRangeScreen.tests');
const { settingsIssueReportScreen } = require('./settingsIssueReportScreen.tests');
const { settingsInsulinModelScreen } = require('./settingsInsulinModelScreen.tests');
const { settingsSuspendThresholdScreen } = require('./settingsSuspendThresholdScreen.tests');
const { settingsCGMSimulatorScreenTests } = require('./settingsCGMSimulatorScreen.tests');
const { settingsPumpSimulatorScreenTests } = require('./settingsPumpSimulatorScreen.tests');
const { homeActiveCarbohydratesScreen } = require('./homeActiveCarbohydratesScreen.tests');

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
    settingsCGMSimulatorScreenTests,
    settingsPumpSimulatorScreenTests,
};
