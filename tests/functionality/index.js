const { settingsScreenFunctionalityTests } = require('./settingsScreen.tests');
const { homeScreenFunctionalityTests } = require('./homeScreen.tests');
const { carbEntryScreenFunctionalityTests } = require('./carbEntryScreen.tests');
const { pumpSimulatorScreenTests } = require('./pumpSimulatorScreen.tests');
const { cgmSimulatorScreenTests } = require('./cgmSimulatorScreen.tests');
module.exports = {
    settingsScreenFunctionalityTests,
    homeScreenFunctionalityTests,
    carbEntryScreenFunctionalityTests,
    pumpSimulatorScreenTests,
    cgmSimulatorScreenTests,
};
