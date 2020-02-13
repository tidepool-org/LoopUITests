const element = require('detox').element;
const exec = require('child_process').exec;
const match = require('./match');

const setup = {
    /**
     * @name launchLoop
     * @summary will lauch loop app with permissons for notifications and health enabled
     */
    async launchLoop() {
        await device.launchApp({
            newInstance: true,
            permissions: { notifications: 'YES', health: 'YES' },
        });
    },
    async loadScenarios(deviceId) {
        const loadScenariosShellScript = exec(`${__dirname}/../scripts/load_scenarios.sh ${deviceId}`);
        loadScenariosShellScript.stdout.on('data', () => {
            return null;
        });
        loadScenariosShellScript.stderr.on('data', (data) => {
            throw Error(data);
        });
    },
    async loadScenario(scenarioName) {
        await device.shake();
        await expect(match.accessible.Label(scenarioName)).toExist();
        await match.accessible.Label(scenarioName).tap();
        await match.accessible.ButtonBarButton('Load').tap();
    },
    /**
     * @name setClosedLoop
     * @summary if not already in closed loop mode we will turn it on
     */
    async setClosedLoop() {
        await match.accessible.ButtonBarButton('Settings').tap();
        await match.accessible.Button('Closed Loop').tap();
        //NOTE: not elegant but try catch approach is used by others in detox tests
        try {
            await expect(match.accessible.Button('Closed Loop')).toHaveValue('1');
        } catch (err) {
            await match.accessible.Button('Closed Loop').tap();
            await expect(match.accessible.Button('Closed Loop')).toHaveValue('1');
        }
        await match.accessible.ButtonBarButton('Done').tap();
    },
};

module.exports = setup;