const element = require('detox').element;
const match = require('./match');

const pump = {
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
     * @name pump.setBasalSettings
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
     * @name pump.checkBasal
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
};

module.exports = pump;