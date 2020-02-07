const element = require('detox').element;
const match = require('./match');

const pump = {
    /**
     * @name insulinModel
     * @summary insulin activity model
     */
    insulinModel: {
        Walsh: { value: 0, name: "Walsh" },
        RapidAdults: { value: 1, name: "Rapid-Acting – Adults" },
        RapidChildren: { value: 2, name: "Rapid-Acting – Children" },
        Fiasp: { value: 3, name: "Fiasp" }
    },
    /**
     * @name pump.add
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
     * @name pump.remove
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
     * @name pump.setBasalRates
     * @param {string} [basalUnitsPerHour] e.g. '0.1'
    */
    async setBasalRates(basalUnitsPerHour) {
        const unitsSuffix =  'U/hr';
        await match.accessibilityButtonBarButton('Settings').tap();
        await match.accessibilityText('Basal Rates').tap();
        await expect(match.accessibilityHeader('Basal Rates')).toExist();
        await match.accessibilityButtonBarButton('Add').tap();
        await match.accessibilityLabelText(`0 ${unitsSuffix}`).atIndex(0).tap();
        await match.accessibilityLabelText(`${basalUnitsPerHour} ${unitsSuffix}`).tap();
        await match.accessibilityLabelText('Save to simulator').tap();
        await match.accessibilityBackButton('Settings').tap();
        await match.accessibilityButtonBarButton('Done').tap();
    },
    /**
     * @name pump.checkBasalRates
     * @param {string} [basalUnitsPerHour] e.g. '0.1 U/hr'
    */
    async checkBasalRates(basalUnitsPerHour) {
        await match.accessibilityButtonBarButton('Settings').tap();
        await match.accessibilityText('Basal Rates').tap();
        await expect(match.accessibilityHeader('Basal Rates')).toExist();
        //TODO check the rate
        await match.accessibilityBackButton('Settings').tap();
        await match.accessibilityButtonBarButton('Done').tap();
    },
    /**
     * @name pump.setSuspend
     * @param {string} threshold e.g. '150'
     */
    async setSuspend(threshold) {
        await match.accessibilityButtonBarButton('Settings').tap();
        await match.accessibilityText('Suspend Threshold').tap();
        await element(by.type('LoopKitUI.PaddedTextField')).atIndex(0).typeText(threshold);
        await match.accessibilityBackButton('Settings').tap();
        await match.accessibilityButtonBarButton('Done').tap();
    },
    /**
     * @name pump.checkSuspend
     * @param {string} maxBasalRate e.g. '1.0'
     * @param {string} threshold e.g. '150'
     */
    async checkSuspend(threshold) {
        await match.accessibilityButtonBarButton('Settings').tap();
        await match.accessibilityText('Suspend Threshold').tap();
        await expect(element(by.type('LoopKitUI.PaddedTextField')).atIndex(0)).toHaveText(threshold);
        await match.accessibilityBackButton('Settings').tap();
        await match.accessibilityButtonBarButton('Done').tap();
    },
    /**
     * @name pump.setDeliveryLimits
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
     * @name pump.checkDeliveryLimits
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
    /**
     * @summary add a bolus
     * @param {string} units
     */
    async bolus(units) {
        await match.accessibilityButton('Bolus').tap();
        await element(by.type('UITextField')).clearText();
        await element(by.type('UITextField')).typeText(units);
        await match.accessibilityButtonBarButton('Cancel').tap();
    },
    /**
     * @name pump.setInsulinModel
     * @param {insulinModel} model e.g. 'Walsh'
     */
    async setInsulinModel(model) {
        await match.accessibilityButtonBarButton('Settings').tap();
        await match.accessibilityText('Insulin Model').tap();
        await match.accessibilityText(model.name).tap();
        await match.accessibilityBackButton('Settings').tap();
        await match.accessibilityButtonBarButton('Done').tap();
    },
    /**
     * @name pump.checkInsulinModel
     * @param {insulinModel} model e.g. 'Walsh'
     */
    async checkInsulinModel(model) {
        await match.accessibilityButtonBarButton('Settings').tap();
        await match.accessibilityText('Insulin Model').tap();
        await match.accessibilityText(model.name).tap();
        await match.accessibilityBackButton('Settings').tap();
        await match.accessibilityButtonBarButton('Done').tap();
    },
    /**
     * @name pump.setCorrectionRange
     * @param {insulinModel} model e.g. 'Walsh'
     */
    async setCorrectionRange(model) {
        await match.accessibilityButtonBarButton('Settings').tap();
        await match.accessibilityText('Correction Range').tap();
        await match.accessibilityText(model.name).tap();
        await match.accessibilityBackButton('Settings').tap();
        await match.accessibilityButtonBarButton('Done').tap();
    },
    /**
     * @name pump.checkCorrectionRange
     * @param {boolean} isSet
     */
    async checkCorrectionRange(isSet) {
        await match.accessibilityButtonBarButton('Settings').tap();
        await expect(element(by.text('Correction Range'))).toExist();
        await element(by.text('Correction Range')).tap();
        await expect(match.accessibilityButtonBarButton('Edit', isSet)).toExist();
        await match.accessibilityBackButton('Settings').tap();
        await match.accessibilityButtonBarButton('Done').tap();
    },
    /**
     * @name pump.setCarbRatios
     * @param {string} ratio
     */
    async setCarbRatios(ratio) {
        await match.accessibilityButtonBarButton('Settings').tap();
        await expect(element(by.text('Carb Ratios'))).toExist();
        await element(by.text('Carb Ratios')).tap();
        await match.accessibilityButtonBarButton('Add').tap();
        await element(by.type('UITextField')).clearText();
        await element(by.type('UITextField')).typeText(ratio);
        await match.accessibilityBackButton('Settings').tap();
        await match.accessibilityButtonBarButton('Done').tap();
    },
    /**
     * @name pump.setInsulinSensitivities
     * @param {string} sensitivites
     */
    async setInsulinSensitivities(sensitivity) {
        const unitsSuffix = 'mg/dL/U';
        await match.accessibilityButtonBarButton('Settings').tap();
        //need to scroll to section
        await element(by.text('Carb Ratios')).swipe('up', 'fast');
        await match.accessibilityLabelText('Insulin Sensitivities').tap();
        await match.accessibilityButtonBarButton('Add').tap();
        //TODO: why are there two??
        await match.accessibilityLabelText(`${sensitivity} ${unitsSuffix}`).atIndex(1).tap();
        await match.accessibilityLabelText('Save').tap();
        await match.accessibilityBackButton('Settings').tap();
        await match.accessibilityButtonBarButton('Done').tap();
    },
};

module.exports = pump;