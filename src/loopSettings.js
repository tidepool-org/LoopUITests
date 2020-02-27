const settings = require('./settings');
const setup = require('./setup');

const loopSettings = {
    /**
     * @summary Configures loop with simulator cgm, simulator pump and all required settings applied to give a running instance of loop
     * @param {object} config  { scenario string, settings object }
     * @example await settings.ConfiguredLoop({scenario:'flat_cgm', settings: settings.Defaults})
     */
    async Configure(config) {
        if (config.scenario) {
            await setup.LoadDeviceScenariosFromDisk(device.id);
        }
        await settings.CGMSimulator();
        await settings.PumpSimulator();
        if (config.scenario) {
            await setup.LoadScenario(config.scenario);
        }
        await settings.Apply(config.settings);
    },
};


module.exports = loopSettings;