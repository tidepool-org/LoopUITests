const setup = require('./setup');
const { SettingsScreen, SettingType, FilterSettings } = require('./settingsScreen');


function filterSettingsBasedOnConfig(config) {
    if (config.scenario) {
        //CGM data will be loaded from scenario and we have already added the CGM simulator so remove that
        return FilterSettings(config.settings, [SettingType.CGMSimulatorSettings, SettingType.AddCGMSimulator, SettingType.AddPumpSimulator]);
    }
    return config.settings;
}

async function loadScenarioData(config, settingsScreen) {
    if (config.scenario) {
        await setup.LoadDeviceScenariosFromDisk(device.id);
        await settingsScreen.Open();
        await settingsScreen.AddCGMSimulator();
        await settingsScreen.AddPumpSimulator();
        await settingsScreen.Close();
        await setup.LoadScenario(config.scenario);
    }
}

const loopSettings = {
    /**
     * @summary Configures loop with simulator cgm, simulator pump and all required settings applied to give a running instance of loop
     * @param {object} config  { scenario string, settings object }
     * @example await loopSettings.Configure({scenario:'flat_cgm', settings: SettingDefault})
     */
    async Configure(config) {
        let settingsScreen = new SettingsScreen();
        let settingsToApply = filterSettingsBasedOnConfig(config);
        await loadScenarioData(config, settingsScreen);
        await settingsScreen.Open();
        await settingsScreen.Apply(settingsToApply);
        await settingsScreen.Close();
    },
    /**
     * @summary Removes up loop CGM and Pump data
     * @example await loopSettings.RemoveData();
     */
    async RemoveData() {
        await settingsScreen.Open();
        await settingsScreen.RemoveCGMData();
        await settingsScreen.RemovePumpData();
        await settingsScreen.Close();
    },

};

module.exports = loopSettings;
