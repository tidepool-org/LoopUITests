const { settingsScreenFunctionalityTests } = require('./settings_screen.tests');
const { homeScreenFunctionalityTests } = require('./home_screen.tests');
const { carbEntryScreenFunctionalityTests } = require('./carb_entry_screen.tests');
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
