const { settingsScreenFunctionalityTests } = require('./settingsScreen.tests');
const { homeScreenFunctionalityTests } = require('./homeScreen.tests');
const { carbEntryScreenFunctionalityTests } = require('./carbEntryScreen.tests');
const { pumpSimulatorScreenTests } = require('./pumpSimulatorScreen.tests');

var functionalityTests = {
    settingsScreenFunctionalityTests,
    homeScreenFunctionalityTests,
    carbEntryScreenFunctionalityTests,
    pumpSimulatorScreenTests,
};

module.exports = {
    functionalityTests,
};
