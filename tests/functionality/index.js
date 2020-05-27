const { settingsScreenFunctionalityTests } = require('./settingsScreen.tests');
const { homeScreenFunctionalityTests } = require('./homeScreen.tests');
const { carbEntryScreenFunctionalityTests } = require('./carbEntryScreen.tests');
const { cleanupFunctionalityTests } = require('./cleanup.tests');

var functionalityTests = {
    settingsScreenFunctionalityTests,
    homeScreenFunctionalityTests,
    carbEntryScreenFunctionalityTests,
    cleanupFunctionalityTests
};

module.exports = {
    functionalityTests,
};
