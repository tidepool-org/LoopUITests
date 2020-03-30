const loopApp = require('./loopApp');

const { CarbEntryScreen } = require('./carbEntryScreen');
const { OverridesScreen } = require('./overridesScreen');
const { BolusScreen } = require('./bolusScreen');
const { HomeScreen } = require('./homeScreen');
const { SettingsScreen, SettingDefault, SettingType, InsulinModel, FilterSettings, CGMModel, CGMEffect } = require('./settingsScreen');

var loop = {
    app: loopApp,
    screen: {
        home: new HomeScreen(),
        settings: new SettingsScreen(),
        carbEntry: new CarbEntryScreen(),
        bolus: new BolusScreen(),
        overrides: new OverridesScreen()
    },
    settings: {
        default: SettingDefault,
        type: SettingType,
        insulinModel: InsulinModel,
        filter: FilterSettings,
        cgmModel: CGMModel,
        cgmEffect: CGMEffect,
    }
};

module.exports = {
    loop
};
