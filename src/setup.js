const element = require('detox').element;
const exec = require('child_process').exec;
const match = require('./match');

const setup = {
    /**
     * @name LaunchLoop
     * @summary will launch the loop app with permissons for notifications and health enabled
     */
    async LaunchLoop() {
        await device.launchApp({
            newInstance: true,
            permissions: { notifications: 'YES', health: 'YES' },
        });
    },
    /**
     * @name LoadScenarios
     * @param {string} deviceId
     * @summary will load all available scenarios for the given deviceId
     */
    async LoadScenarios(deviceId) {
        const loadScenariosShellScript = exec(`${__dirname}/../scripts/load_scenarios.sh ${deviceId}`);
        loadScenariosShellScript.stdout.on('data', () => {
            return null;
        });
        loadScenariosShellScript.stderr.on('data', (data) => {
            throw Error(data);
        });
    },
    /**
     * @name LoadScenario
     * @param {string} scenarioName
     * @summary will select and load the given scenario
     */
    async LoadScenario(scenarioName) {
        await device.shake();
        await expect(match.accessible.Label(scenarioName)).toExist();
        await match.accessible.Label(scenarioName).tap();
        await match.accessible.ButtonBarButton('Load').tap();
    },
};

module.exports = setup;