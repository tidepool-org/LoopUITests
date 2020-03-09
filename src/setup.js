const exec = require('child_process').exec;
const match = require('./match');

const setup = {
    /**
     * @summary will launch the loop app with permissons for notifications and health enabled
     */
    async LaunchLoop() {
        await device.launchApp({
            //newInstance: true,
            permissions: { notifications: 'YES', health: 'YES' },
        });
    },
    /**
     * @param {string} deviceId
     * @summary will load all available scenarios for the given deviceId
     */
    async LoadDeviceScenariosFromDisk(deviceId) {
        const LoadDeviceScenariosFromDiskShellScript = exec(`${__dirname}/../scripts/load_scenarios.sh ${deviceId}`);
        LoadDeviceScenariosFromDiskShellScript.stdout.on('data', () => {
            return null;
        });
        LoadDeviceScenariosFromDiskShellScript.stderr.on('data', (data) => {
            throw Error(data);
        });
    },
    /**
     * @param {string} scenarioName
     * @summary will select and load the given scenario
     * @example await setup.LoadScenario('basic_scenario');
     */
    async LoadScenario(scenarioName) {
        await device.shake();
        await expect(match.accessible.Label(scenarioName)).toExist();
        await match.accessible.Label(scenarioName).tap();
        await match.accessible.ButtonBarButton('Load').tap();
    },
    /**
     * @param {string} scenarioName
     * @param {string} cycles
     * @summary will advance the selected scenario the given number of cycle times
     * @example await setup.AdvanceScenario('basic_scenario', '3');
     */
    async AdvanceScenario(scenarioName,cycles) {
        await device.shake();
        await expect(match.accessible.Label(scenarioName)).toExist();
        await match.accessible.Label(scenarioName).swipe('left');
        await match.accessible.SwipeButton('Advance ⏭').tap();
        await match.UITextField().typeText(cycles);
        await match.accessible.Button('OK').tap();
    },
};

module.exports = setup;