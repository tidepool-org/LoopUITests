const element = require('detox').element;
const exec = require('child_process').exec;
const match = require('./loopUI').match;

const setup = {
    simulatorPump: {
        /**
         * @summary add the simulator pump for loop
         */
        async add() {
            await match.accessibilityButtonBarButton('Settings').tap();
            await element(by.text('Add Pump').and(by.type('UILabel'))).tap();
            match.accessibilityHeaderText('Pump Settings');
            await match.accessibilityButton('Continue').tap();
            await match.accessibilityButtonBarButton('Done').tap();
        },
        /**
         * @summary remove the simulator pump for loop
         */
        async remove() {
            await match.accessibilityButtonBarButton('Settings').tap();
            await match.accessibilityLabelText('Simulator').tap();
            match.accessibilityHeaderText('Pump Settings');
            await match.accessibilityButton('Delete Pump').tap();
            await match.accessibilityButton('Delete Pump').tap();
            await match.accessibilityButtonBarButton('Done').tap();
        },
        /**
         * @name setBasalSettings
         * @param {string} [basalUnitsPerHour] e.g. '0.1 U/hr'
        */
        async setBasal(basalUnitsPerHour) {
            await match.accessibilityButtonBarButton('Settings').tap();
            await match.accessibilityText('Basal Rates').tap();
            await expect(match.accessibilityHeader('Basal Rates')).toExist();
            await match.accessibilityButtonBarButton('Add').tap();
            await match.accessibilityLabelText('0 U/hr').atIndex(0).tap();
            await match.accessibilityLabelText(basalUnitsPerHour).tap();
            await match.accessibilityLabelText('Save to simulator').tap();
            await match.accessibilityBackButton('Settings').tap();
            await match.accessibilityButtonBarButton('Done').tap();
        },
        /**
         * @name checkBasal
         * @param {string} [basalUnitsPerHour] e.g. '0.1 U/hr'
        */
        async checkBasal(basalUnitsPerHour) {
            await match.accessibilityButtonBarButton('Settings').tap();
            await match.accessibilityText('Basal Rates').tap();
            await expect(match.accessibilityHeader('Basal Rates')).toExist();
            //TODO check the rate
            await match.accessibilityBackButton('Settings').tap();
            await match.accessibilityButtonBarButton('Done').tap();
        },
        /**
         * @param {string} maxBasalRate e.g. '1.0'
         * @param {string} maxBolus e.g. '10.0'
         */
        async setDeliveryLimits(maxBasalRate, maxBolus) {
            await match.accessibilityButtonBarButton('Settings').tap();
            await match.accessibilityText('Delivery Limits').tap();
            await element(by.type('LoopKitUI.PaddedTextField')).atIndex(0).clearText();
            await element(by.type('LoopKitUI.PaddedTextField')).atIndex(0).typeText(maxBasalRate);
            await element(by.type('LoopKitUI.PaddedTextField')).atIndex(0).tapReturnKey();
            await element(by.type('LoopKitUI.PaddedTextField')).atIndex(1).clearText();
            await element(by.type('LoopKitUI.PaddedTextField')).atIndex(1).typeText(maxBolus);
            await element(by.type('LoopKitUI.PaddedTextField')).atIndex(1).tapReturnKey();
            await match.accessibilityLabelText('Save to simulator').tap();
            await match.accessibilityBackButton('Settings').tap();
            await match.accessibilityButtonBarButton('Done').tap();
        },
        /**
         * @param {string} maxBasalRate e.g. '1.0'
         * @param {string} maxBolus e.g. '10.0'
         */
        async checkDeliveryLimits(maxBasalRate, maxBolus) {
            await match.accessibilityButtonBarButton('Settings').tap();
            await match.accessibilityText('Delivery Limits').tap();
            await expect(element(by.type('LoopKitUI.PaddedTextField')).atIndex(0)).toHaveText(maxBasalRate);
            await expect(element(by.type('LoopKitUI.PaddedTextField')).atIndex(1)).toHaveText(maxBolus);
            await match.accessibilityBackButton('Settings').tap();
            await match.accessibilityButtonBarButton('Done').tap();
        },
    },
    cgm: {
        /**
         * @name simulatorModel
         * @summary CGM model that can be applied to the simulator
         */
        simulatorModel: {
            Constant: { value: 0, name: "Constant" },
            SineCurve: { value: 1, name: "Sine Curve" },
            None: { value: 2, name: "No Data" }
        },
        /**
         * @name simulatorEffects
         * @summary CGM effects that can be applied to the simulator
         */
        simulatorEffects: {
            GlucoseNoise: { value: 0, name: "Glucose Noise" },
            RandomHighOutlier: { value: 1, name: "Random High Outlier" },
            RandomLowOutlier: { value: 2, name: "Random Low Outlier" },
            RandomError: { value: 2, name: "Random Error" }
        },
        async add() {
            await match.accessibilityButtonBarButton('Settings').tap();
            if (element(by.text('Add CGM').and(by.type('UILabel')))) {
                await element(by.text('Add CGM').and(by.type('UILabel'))).atIndex(0).tap();
                await match.accessibilityButton('Simulator').tap();
            }
            await match.accessibilityButtonBarButton('Done').tap();
        },
        async setEffect(effect) {
            await match.accessibilityButtonBarButton('Settings').tap();
            //TODO assuming the second item as pump 'simulator' is first
            await match.accessibilityLabelText('Simulator').atIndex(1).tap();
            match.accessibilityHeaderText('CGM Settings');
            await match.accessibilityLabelText(effect.name).tap();
            switch (effect) {
                case this.simulatorEffects.GlucoseNoise:
                    await element(by.type('LoopKitUI.PaddedTextField')).clearText();
                    //mg/dl
                    await element(by.type('LoopKitUI.PaddedTextField')).typeText('100');
                    //TODO: accessibility
                    await element(by.label('Back').and(by.type('_UIButtonBarButton'))).tap();
                    break;
                case this.simulatorEffects.RandomError:
                    await element(by.type('LoopKitUI.PaddedTextField')).clearText();
                    //percent
                    await element(by.type('LoopKitUI.PaddedTextField')).typeText('10');
                    //TODO: accessibility
                    await element(by.label('Back').and(by.type('_UIButtonBarButton'))).tap();
                    break;
                default:
                    break;
            }
            //TODO: multiple done buttons
            await match.accessibilityButtonBarButton('Done').atIndex(0).tap();
            await match.accessibilityButtonBarButton('Done').tap();
        },
        /**
        * @param {simulatorModel} model e.g. Constant
        * @param {Array} bgValues e.g. [100, 50]
        */
        async setModel(model, bgValues) {
            await match.accessibilityButtonBarButton('Settings').tap();
            //TODO assuming the second item as pump 'simulator' is first
            await match.accessibilityLabelText('Simulator').atIndex(1).tap();
            match.accessibilityHeaderText('CGM Settings');
            await match.accessibilityLabelText(model.name).tap();
            switch (model) {
                case this.simulatorModel.Constant:
                    await element(by.type('LoopKitUI.PaddedTextField')).clearText();
                    await element(by.type('LoopKitUI.PaddedTextField')).typeText(bgValues[0]);
                    await match.accessibilityBackButton('CGM Settings').tap();
                    break;
                case this.simulatorModel.SineCurve:
                    await match.accessibilityLabelText('Base Glucose').tap();
                    await element(by.type('LoopKitUI.PaddedTextField')).clearText();
                    await element(by.type('LoopKitUI.PaddedTextField')).typeText(bgValues[0]);
                    await match.accessibilityBackButton('Sine Curve').tap();
                    await match.accessibilityLabelText('Amplitude').tap();
                    await element(by.type('LoopKitUI.PaddedTextField')).clearText();
                    await element(by.type('LoopKitUI.PaddedTextField')).typeText(bgValues[1]);
                    await match.accessibilityBackButton('Sine Curve').tap();
                    await match.accessibilityBackButton('CGM Settings').tap();
                    break;
                default:
                    break;
            }
            //TODO: multiple done buttons
            await match.accessibilityButtonBarButton('Done').atIndex(0).tap();
            await match.accessibilityButtonBarButton('Done').tap();
        },
        async remove() {
            await match.accessibilityButtonBarButton('Settings').tap();
            await match.accessibilityLabelText('Simulator').tap();
            match.accessibilityHeaderText('CGM Settings');
            await match.accessibilityButton('Delete CGM').tap();
            await match.accessibilityButton('Delete CGM').tap();
            await match.accessibilityButtonBarButton('Done').tap();
        }
    },
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
        device.shake();
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
        // if (!this.isClosedLoop()) {
        await match.accessibilityButton('Closed Loop').tap();
        await expect(match.accessibilityButton('Closed Loop')).toHaveValue('1');
        //}
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
    /**
     * @summary add a bolus
     * @param {string} units
     */
    async addBolus(units) {
        await match.accessibilityButton('Bolus').tap();
        //assert.isAccessibilityHeader('Bolus');
        //await element(by.type('UITextField')).clearText();
        //await element(by.type('UITextField')).typeText(units);
        await match.accessibilityButtonBarButton('Cancel').tap();
    },
};

module.exports = setup;