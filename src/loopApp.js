const exec = require('child_process').exec;
const match = require('./match');
const text = require('./text');
const { SettingsScreen, SettingType, FilterSettings } = require('./settingsScreen');

var LoadDeviceScenariosFromDisk = async function (deviceId) {
    const LoadDeviceScenariosFromDiskShellScript = exec(`${__dirname}/../scripts/load_scenarios.sh ${deviceId}`);
    LoadDeviceScenariosFromDiskShellScript.stdout.on('data', () => {
        return null;
    });
    LoadDeviceScenariosFromDiskShellScript.stderr.on('data', (data) => {
        throw Error(data);
    });
};

var LoadScenario = async function (scenarioName) {
    await device.shake();
    await expect(match.accessible.Label(scenarioName)).toExist();
    await match.accessible.Label(scenarioName).tap();
    await match.accessible.ButtonBarButton('Load').tap();
};

var AdvanceScenario = async function (scenarioName, cycles) {
    await device.shake();
    await expect(match.accessible.Label(scenarioName)).toExist();
    await match.accessible.Label(scenarioName).swipe('left');
    await match.accessible.SwipeButton('Advance ⏭').tap();
    await match.UITextField().typeText(cycles);
    await match.accessible.Button(text.general.OK).tap();
};


const loopApp = {
    /**
     * @summary will launch the loop app with permissons for notifications and health enabled
     */
    async Launch() {
        await device.launchApp({
            newInstance: true,
            permissions: { notifications: 'YES', health: 'YES' },
            launchArgs: { 'detoxPrintBusyIdleResources': 'YES' },
        });
        return this;
    },
    /**
     * @summary will launch the loop app with permissons for notifications and health enabled
     */
    async AndConfigure(config) {

        var loadScenarioData = async function (config, settingsScreen) {
            if (config.scenario) {
                await LoadDeviceScenariosFromDisk(device.id);
                await settingsScreen.Open();
                await settingsScreen.AddCGMSimulator();
                await settingsScreen.AddPumpSimulator();
                await settingsScreen.Close();
                await LoadScenario(config.scenario);
            }
        }

        var filterSettingsBasedOnConfig = function (config) {
            if (config.scenario) {
                //CGM data will be loaded from scenario and we have already added the CGM simulator so remove that
                return FilterSettings(config.settings, [SettingType.CGMSimulatorSettings, SettingType.AddCGMSimulator, SettingType.AddPumpSimulator]);
            }
            return config.settings;
        }

        let settingsScreen = new SettingsScreen();
        let settingsToApply = filterSettingsBasedOnConfig(config);

        await loadScenarioData(config, settingsScreen);
        await settingsScreen.Open();
        await settingsScreen.Apply(settingsToApply);
        await settingsScreen.Close();
    },
    /**
     * @summary Configures loop with simulator cgm, simulator pump only
     */
    async AndSetSimulators(simulators) {
        let settingsScreen = new SettingsScreen();
        await settingsScreen.Open();
        if (simulators.cgm) {
            await settingsScreen.AddCGMSimulator();
        }
        if (simulators.pump) {
            await settingsScreen.AddPumpSimulator();
        }
        await settingsScreen.Close();
    },
    async RemoveData() {
        let settingsScreen = new SettingsScreen();
        await settingsScreen.Open();
        await settingsScreen.RemoveCGMData();
        await settingsScreen.RemovePumpData();
        await settingsScreen.Close();
    },
    /**
     * @param {string} deviceId
     * @summary will load all available scenarios for the given deviceId
     */
    LoadDeviceScenariosFromDisk: LoadDeviceScenariosFromDisk,
    /**
     * @param {string} scenarioName
     * @summary will select and load the given scenario
     * @example await LoadScenario('basic_scenario');
     */
    LoadScenario: LoadScenario,
    /**
     * @param {string} scenarioName
     * @param {string} cycles
     * @summary will advance the selected scenario the given number of cycle times
     * @example await AdvanceScenario('basic_scenario', '3');
     */
    AdvanceScenario: AdvanceScenario,
};

module.exports = loopApp;
