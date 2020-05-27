const { settingsScreenFunctionalityTests } = require('./settingsScreen.tests');
const { homeScreenFunctionalityTests } = require('./homeScreen.tests');
const { carbEntryScreenFunctionalityTests } = require('./carbEntryScreen.tests');
const { cleanupFunctionalityTests } = require('./cleanup.tests');
const { pumpSimulatorScreenTests } = require('./pumpSimulatorScreen.tests');

var functionalityTests = {
    settingsScreenFunctionalityTests,
    homeScreenFunctionalityTests,
    carbEntryScreenFunctionalityTests,
    cleanupFunctionalityTests,
    pumpSimulatorScreenTests,
};

module.exports = {
    functionalityTests,
};
