const element = require('detox').element;
const exec = require('child_process').exec;

const assert = {
    /**
     * @param {string} label
     * @returns {Detox.Expect}
     */
    async isAccessibilityButton(label) {
        return expect(match.accessibilityButton(label)).toExist() || expect(match.accessibilityBackButton(label)).toExist() || expect(match.accessibilityButtonBarButton(label)).toExist();
    },
    /**
     * @param {string} text
     * @returns {Detox.Expect}
     */
    isAccessibilityText(text) {
        return expect(match.accessibilityLabelText(text)).toExist() || expect(match.accessibilityText(text)).toBeVisible()
    },
    /**
     * @param {string} label
     * @returns {Detox.Expect}
     */
    isAccessibilitySelected(label) {
        return expect(element(by.label(label).and(by.traits(['selected'])))).toExist();
    },
    /**
     * @param {string} label
     * @returns {Detox.Expect}
     */
    isAccessibilityHeader(label) {
        return expect(element(by.label(label).and(by.traits(['header'])))).toExist();
    },
};

const match = {
    /**
     * @param {string} label
     * @returns {Detox.Element} accessibilityButtonBarButton
     */
    accessibilityButtonBarButton(label) {
        return element(by.label(label).and(by.traits(['button']).and(by.type('_UIButtonBarButton'))));
    },
    /**
     * @summary get a text field element
     * @returns {Detox.Element}
     */
    textField() {
        return element(by.type('LoopKitUI.PaddedTextField'));
    },
    /**
     * @param {string} label
     * @returns {Detox.Element} accessibilityButton
     */
    accessibilityButton(label) {
        return element(by.label(label).and(by.traits(['button'])));
    },
    /**
     * @param {string} label
     * @returns {Detox.Element} accessibilityBackButton
     */
    accessibilityBackButton(label) {
        return element(by.label(label).and(by.traits(['button']).and(by.type('UIAccessibilityBackButtonElement'))));
    },
    /**
     * @param {string} label
     * @returns {Detox.Element} buttonBarButton
     */
    buttonBarButton(label) {
        return element(by.label(label).and(by.type('_UIButtonBarButton')));
    },
    /**
     * @param {string} label
     * @returns {Detox.Element} accessibilityLabelText
     */
    accessibilityLabelText(label) {
        return element(by.label(label).and(by.traits(['text'])));
    },
    /**
     * @param {string} text
     * @returns {Detox.Element} accessibilityText
     */
    accessibilityText(text) {
        return element(by.text(text).and(by.traits(['text'])));
    },
    /**
     * @param {string} text
     * @returns {Detox.Element} accessibilityHeaderText
     */
    accessibilityHeaderText(text) {
        return element(by.text(text).and(by.traits(['text']).and(by.traits(['header']))));
    },
    /**
     * @param {string} text
     * @returns {Detox.Element} accessibilityHeader
     */
    accessibilityHeader(text) {
        return element(by.text(text).and(by.traits(['header'])));
    },
};

const setup = {
    /**
     * @name CGMSimulatorModel
     * @summary CGM model that can be applied to the simulator
     */
    CGMSimulatorModel: {
        Constant: { value: 0, name: "Constant" },
        SineCurve: { value: 1, name: "Sine Curve" },
        None: { value: 2, name: "No Data" }
    },
    /**
     * @name CGMSimulatorEffects
     * @summary CGM effects that can be applied to the simulator
     */
    CGMSimulatorEffects: {
        GlucoseNoise: { value: 0, name: "Glucose Noise" },
        RandomHighOutlier: { value: 1, name: "Random High Outlier" },
        RandomLowOutlier: { value: 2, name: "Random Low Outlier" },
        RandomError: { value: 2, name: "Random Error" }
    },
    /**
     * @name lauchLoop
     * @summary will lauch loop app with permissons for notifications and health enabled
     */
    async lauchLoop() {
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
    async setClosedLoop() {
        await match.accessibilityButtonBarButton('Settings').tap();
        await match.accessibilityButton('Closed Loop').tap();
        await expect(match.accessibilityButton('Closed Loop')).toHaveValue('1');
        await match.accessibilityButtonBarButton('Done').tap();
    },
    async addSimulatorPump() {
        await match.accessibilityButtonBarButton('Settings').tap();
        await element(by.text('Add Pump').and(by.type('UILabel'))).tap();
        match.accessibilityHeaderText('Pump Settings');
        await match.accessibilityButton('Continue').tap();
        await match.accessibilityButtonBarButton('Done').tap();
    },
    async addSimulatorCGM() {
        await match.accessibilityButtonBarButton('Settings').tap();
        await element(by.text('Add CGM').and(by.type('UILabel'))).atIndex(0).tap();
        await match.accessibilityButton('Simulator').tap();
        await match.accessibilityButtonBarButton('Done').tap();
    },
    /**
     * @param {string} [basalUnitsPerHour] e.g. '0.1 U/hr'
     */
    async simulatorPumpBasalSettings(basalUnitsPerHour) {
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
     * @param {string} maxBasalRate e.g. '1.0'
     * @param {string} maxBolus e.g. '10.0'
     */
    async simulatorPumpDeliveryLimitsSettings(maxBasalRate, maxBolus) {
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
    * @param {CGMSimulatorEffects} effect e.g. GlucoseNoise
    */
    async addSimulatorCGMEffect(effect) {
        await match.accessibilityButtonBarButton('Settings').tap();
        //TODO assuming the second item as pump 'simulator' is first
        await match.accessibilityLabelText('Simulator').atIndex(1).tap();
        match.accessibilityHeaderText('CGM Settings');
        await match.accessibilityLabelText(effect.name).tap();
        switch (effect) {
            case this.CGMSimulatorEffects.GlucoseNoise:
                await element(by.type('LoopKitUI.PaddedTextField')).clearText();
                //mg/dl
                await element(by.type('LoopKitUI.PaddedTextField')).typeText('100');
                //TODO: accessibility
                await element(by.label('Back').and(by.type('_UIButtonBarButton'))).tap();
                break;
            case this.CGMSimulatorEffects.RandomError:
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
    * @param {CGMSimulatorModel} model e.g. Constant
    * @param {Array} bgValues e.g. [100, 50]
    */
    async addSimulatorCGMModel(model, bgValues) {
        await match.accessibilityButtonBarButton('Settings').tap();
        //TODO assuming the second item as pump 'simulator' is first
        await match.accessibilityLabelText('Simulator').atIndex(1).tap();
        match.accessibilityHeaderText('CGM Settings');
        await match.accessibilityLabelText(model.name).tap();
        switch (model) {
            case this.CGMSimulatorModel.Constant:
                await element(by.type('LoopKitUI.PaddedTextField')).clearText();
                await element(by.type('LoopKitUI.PaddedTextField')).typeText(bgValues[0]);
                await match.accessibilityBackButton('CGM Settings').tap();
                break;
            case this.CGMSimulatorModel.SineCurve:
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
    async removeSimulatorPump() {
        await match.accessibilityButtonBarButton('Settings').tap();
        await match.accessibilityLabelText('Simulator').tap();
        match.accessibilityHeaderText('Pump Settings');
        await match.accessibilityButton('Delete Pump').tap();
        await match.accessibilityButton('Delete Pump').tap();
        await match.accessibilityButtonBarButton('Done').tap();
    },
    async removeSimulatorCGM() {
        await match.accessibilityButtonBarButton('Settings').tap();
        await match.accessibilityLabelText('Simulator').tap();
        match.accessibilityHeaderText('CGM Settings');
        await match.accessibilityButton('Delete CGM').tap();
        await match.accessibilityButton('Delete CGM').tap();
        await match.accessibilityButtonBarButton('Done').tap();
    }
};

module.exports = {
    match,
    assert,
    setup
};
