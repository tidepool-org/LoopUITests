const { settingsScreenFunctionalityTests } = require('./settingsScreen.tests');
const { homeScreenFunctionalityTests } = require('./homeScreen.tests');
const { carbEntryScreenFunctionalityTests } = require('./carbEntryScreen.tests');
const { pumpSimulatorScreenTests } = require('./pumpSimulatorScreen.tests');
const { cgmSimulatorScreenTests } = require('./cgmSimulatorScreen.tests');

var functionalityTests = {
    settingsScreenFunctionalityTests,
    homeScreenFunctionalityTests,
    carbEntryScreenFunctionalityTests,
    pumpSimulatorScreenTests,
    cgmSimulatorScreenTests,
};

module.exports = {
    functionalityTests,
};
