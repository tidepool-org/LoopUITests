const setup = require('./setup');
const { Settings } = require('./settings');


const loopSettings = {
    /**
     * @summary Configures loop with simulator cgm, simulator pump and all required settings applied to give a running instance of loop
     * @param {object} config  { scenario string, settings object }
     * @example await settings.ConfiguredLoop({scenario:'flat_cgm', settings: SettingDefault})
     */
    async Configure(config) {
        let settings = new Settings();
        await setup.LoadDeviceScenariosFromDisk(device.id);
        await settings.Open();
        await settings.Apply(config.settings);
        await settings.Close();
        if (config.scenario) {
            //must load from the home screen
           await setup.LoadScenario(config.scenario);
           await settings.Open();
           await settings.Close();
       }
    },
};


module.exports = loopSettings;