const setup = require('./setup');
const loopSettings = require('./loopSettings');

const { CarbEntryScreen } = require('./carbEntryScreen');
const { OverridesScreen } = require('./overridesScreen');
const { BolusScreen } = require('./bolusScreen');
const { HomeScreen } = require('./homeScreen');
const { SettingsScreen, SettingDefault, SettingType, InsulinModel, FilterSettings, CGMModel, CGMEffect } = require('./settingsScreen');


var screen = {
    home: new HomeScreen(),
    settings: new SettingsScreen(),
    carbEntry: new CarbEntryScreen(),
    bolus: new BolusScreen(),
    overrides: new OverridesScreen()
};

module.exports = {
    setup,
    screen,
    loopSettings,
    SettingDefault, SettingType, InsulinModel, FilterSettings, CGMModel, CGMEffect,
};
