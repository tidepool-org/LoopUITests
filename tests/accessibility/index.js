const homeScreenTest = require('./homeScreen.tests');
const homeGlucoseScreenTest = require('./homeGlucoseScreen.tests');
const homeActiveInsulinScreenTest = require('./homeActiveInsulinScreen.tests');
const homeInsulinDeliveryScreenTest = require('./homeInsulinDeliveryScreen.tests');
const bolusScreenTest = require('./bolusScreen.tests');
const carbEntryScreenTest = require('./carbEntryScreen.tests');
const homeActiveCarbohydratesScreenTest = require('./homeActiveCarbohydratesScreen.tests');
const customPresetsScreenTest = require('./customPresetsScreen.tests');

const settingsScreenTest = require('./settings/settingsScreen.tests');
const settingsCarbRatioScreenTest = require('./settings/settingsCarbRatioScreen.tests');
const settingsBasalRatesScreenTest = require('./settings/settingsBasalRatesScreen.tests');
const settingsDeliveryLimitsScreenTest = require('./settings/settingsDeliveryLimitsScreen.tests');
const settingsInsulinSensitivitiesScreenTest = require('./settings/settingsInsulinSensitivitiesScreen.tests');
const settingsCorrectionRangeScreenTest = require('./settings/settingsCorrectionRangeScreen.tests');
const settingsIssueReportScreenTest = require('./settings/settingsIssueReportScreen.tests');
const settingsInsulinModelScreenTest = require('./settings/settingsInsulinModelScreen.tests');
const settingsSuspendThresholdScreenTest = require('./settings/settingsSuspendThresholdScreen.tests');
const cgmSimulatorScreenTest = require('./devices/cgmSimulatorScreen.tests');
const pumpSimulatorScreenTest = require('./devices/pumpSimulatorScreen.tests');
const g6ScreenTest = require('./devices/g6Screen.tests');
const threapySettingsTest = require('./settings/threapySettings.tests');

module.exports = {
    homeScreenTest,
    homeGlucoseScreenTest,
    homeActiveInsulinScreenTest,
    homeInsulinDeliveryScreenTest,
    homeActiveCarbohydratesScreenTest,
    bolusScreenTest,
    carbEntryScreenTest,
    customPresetsScreenTest,
    settingsScreenTest,
    settingsCarbRatioScreenTest,
    settingsBasalRatesScreenTest,
    settingsDeliveryLimitsScreenTest,
    settingsInsulinSensitivitiesScreenTest,
    settingsCorrectionRangeScreenTest,
    settingsIssueReportScreenTest,
    settingsInsulinModelScreenTest,
    settingsSuspendThresholdScreenTest,
    cgmSimulatorScreenTest,
    pumpSimulatorScreenTest,
    g6ScreenTest,
    threapySettingsTest,
};
