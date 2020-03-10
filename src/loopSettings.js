const setup = require('./setup');
const { SettingsScreen } = require('./settingsScreen');


const loopSettings = {
    /**
     * @summary Configures loop with simulator cgm, simulator pump and all required settings applied to give a running instance of loop
     * @param {object} config  { scenario string, settings object }
     * @example await settings.ConfiguredLoop({scenario:'flat_cgm', settings: SettingDefault})
     */
    async Configure(config) {
        let settingsScreen = new SettingsScreen();
        await setup.LoadDeviceScenariosFromDisk(device.id);
        await settingsScreen.Open();
        await settingsScreen.Apply(config.settings);
        await settingsScreen.Close();
        if (config.scenario) {
            //must load from the home screen
            await setup.LoadScenario(config.scenario);
            await settingsScreen.Open();
            await settingsScreen.Close();
        }
    },
};


module.exports = loopSettings;
