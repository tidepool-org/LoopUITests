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
        await expect(match.accessibilityLabelText(scenarioName)).toExist();
        await match.accessibilityLabelText(scenarioName).tap();
        await match.accessibilityButtonBarButton('Load').tap();
    },
    /**
     * @name setClosedLoop
     * @summary if not already in closed loop mode we will turn it on
     */
    async setClosedLoop() {
        await match.accessibilityButtonBarButton('Settings').tap();
        await match.accessibilityButton('Closed Loop').tap();
        try {
            await expect(match.accessibilityButton('Closed Loop')).toHaveValue('1');
            console.log('all good');
        } catch (err) {
            console.log('hmmm failed ..');
            await match.accessibilityButton('Closed Loop').tap();
            await expect(match.accessibilityButton('Closed Loop')).toHaveValue('1');
        }
        await match.accessibilityButtonBarButton('Done').tap();
    },
    /**
     * @summary add a meal entry
     * @param {string} carbs
     */
    async addMeal(carbs) {
        await match.accessibilityButton('Add Meal').tap();
        await assert.isAccessibilityHeader('Add Carb Entry');
        //assert.isAccessibilityText('Amount Consumed');
        await element(by.type('UITextField')).clearText();
        await element(by.type('UITextField')).typeText(carbs);
        await match.accessibilityButtonBarButton('Save').tap();
    },
};

module.exports = setup;