const exec = require('child_process').exec;
const match = require('./match');
const text = require('./text');

const setup = {
    /**
     * @summary will launch the loop app with permissons for notifications and health enabled
     */
    async LaunchLoop() {
        await device.launchApp({
            newInstance: true,
            permissions: { notifications: 'YES', health: 'YES' },
            launchArgs: { 'detoxPrintBusyIdleResources': 'YES' },
        });
    },
    /**
     * @summary will reset the content and settings and then launch the loop app with permissons for notifications and health enabled
     */
    async ResetThenLaunchLoop() {
        await device.resetContentAndSettings();
        await device.launchApp({
            newInstance: true,
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
            console.log('successfully loaded scenarios');
            return null;
        });
        LoadDeviceScenariosFromDiskShellScript.stderr.on('data', (data) => {
            console.log('error loading scenarios data ', data);
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
        console.log('LoadScenario after shake');
        await expect(match.accessible.Label(scenarioName)).toExist();
        console.log(`LoadScenario after ${scenarioName} exists`);
        await match.accessible.Label(scenarioName).tap();
        await match.accessible.ButtonBarButton('Load').tap();
        console.log('LoadScenario have loaded');
        //await waitFor(match.accessible.ButtonBarButton('Load')).toBeNotVisible().withTimeout(5000);
    },
    /**
     * @param {string} scenarioName
     * @param {string} cycles
     * @summary will advance the selected scenario the given number of cycle times
     * @example await setup.AdvanceScenario('basic_scenario', '3');
     */
    async AdvanceScenario(scenarioName, cycles) {
        await device.shake();
        await expect(match.accessible.Label(scenarioName)).toExist();
        await match.accessible.Label(scenarioName).swipe('left');
        await match.accessible.SwipeButton('Advance ⏭').tap();
        await match.UITextField().typeText(cycles);
        await match.accessible.Button(text.general.OK).tap();
        // TODO: not reccomended
        //  await waitFor(match.accessible.ButtonBarButton(text.settingsScreen.Settings)).toExist().withTimeout(2000);
    },
};

module.exports = setup;
