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
        await match.accessible.ButtonBarButton('Settings').tap();
        await match.accessible.UILabel('Add Pump').tap();
        match.accessible.HeaderText('Pump Settings');
        await match.accessible.Button('Simulator').tap();
        await match.accessible.Button('Continue').tap();
        await match.accessible.ButtonBarButton('Done').tap();
    },
    /**
     * @name pump.remove
     * @summary remove the simulator pump for loop
     */
    async remove() {
        await match.accessible.ButtonBarButton('Settings').tap();
        await match.accessible.Label('Simulator').tap();
        match.accessible.HeaderText('Pump Settings');
        //TODO static text and not a button?
        await match.accessible.Label('Delete Pump').tap();
        await match.accessible.Label('Delete Pump').atIndex(1).tap();
        await waitFor(match.accessible.Label('Add Pump')).toExist().withTimeout(2000);
        await match.accessible.ButtonBarButton('Done').tap();
    },
    /**
     * @name pump.removeData
     * @summary remove the simulator pump data for loop
     */
    async removeData() {
        await match.accessible.ButtonBarButton('Settings').tap();
        await match.accessible.UILabel('Carb Ratios').swipe('up', 'fast');
        //TODO static text and not a button?
        await match.accessible.Label('Delete Pump Data').atIndex(0).tap();
        await match.accessible.Label('Delete Pump Data').atIndex(1).tap();
        await match.accessible.ButtonBarButton('Done').tap();
    },
    /**
     * @name pump.setBasalRates
     * @param {string} [basalUnitsPerHour] e.g. '0.1'
    */
    async setBasalRates(basalUnitsPerHour) {
        const unitsSuffix = 'U/hr';
        await match.accessible.ButtonBarButton('Settings').tap();
        await match.accessible.Text('Basal Rates').tap();
        await expect(match.accessible.Header('Basal Rates')).toExist();
        await match.accessible.ButtonBarButton('Add').tap();
        await match.accessible.Label(`0 ${unitsSuffix}`).atIndex(0).tap();
        await match.accessible.Label(`${basalUnitsPerHour} ${unitsSuffix}`).tap();
        await match.accessible.Label('Save to simulator').tap();
        await match.accessible.BackButton('Settings').tap();
        await match.accessible.ButtonBarButton('Done').tap();
    },
    /**
     * @name pump.checkBasalRates
     * @param {string} [basalUnitsPerHour] e.g. '0.1 U/hr'
    */
    async checkBasalRates(basalUnitsPerHour) {
        await match.accessible.ButtonBarButton('Settings').tap();
        await match.accessible.Text('Basal Rates').tap();
        await expect(match.accessible.Header('Basal Rates')).toExist();
        //TODO check the rate
        await match.accessible.BackButton('Settings').tap();
        await match.accessible.ButtonBarButton('Done').tap();
    },
    /**
     * @name pump.setSuspend
     * @param {string} threshold e.g. '150'
     */
    async setSuspend(threshold) {
        await match.accessible.ButtonBarButton('Settings').tap();
        await match.accessible.Text('Suspend Threshold').tap();
        await match.uiEditableTextField().atIndex(0).typeText(threshold);
        await match.accessible.BackButton('Settings').tap();
        await match.accessible.ButtonBarButton('Done').tap();
    },
    /**
     * @name pump.checkSuspend
     * @param {string} maxBasalRate e.g. '1.0'
     * @param {string} threshold e.g. '150'
     */
    async checkSuspend(threshold) {
        await match.accessible.ButtonBarButton('Settings').tap();
        await match.accessible.Text('Suspend Threshold').tap();
        await expect(match.uiEditableTextField().atIndex(0)).toHaveText(threshold);
        await match.accessible.BackButton('Settings').tap();
        await match.accessible.ButtonBarButton('Done').tap();
    },
    /**
     * @name pump.setDeliveryLimits
     * @param {string} maxBasalRate e.g. '1.0'
     * @param {string} maxBolus e.g. '10.0'
     */
    async setDeliveryLimits(maxBasalRate, maxBolus) {
        await match.accessible.ButtonBarButton('Settings').tap();
        await match.accessible.Text('Delivery Limits').tap();
        //TODO: using atIndex, need a better way to select these
        await match.uiEditableTextField().atIndex(0).clearText();
        await match.uiEditableTextField().atIndex(0).typeText(maxBasalRate);
        await match.uiEditableTextField().atIndex(0).tapReturnKey();
        await match.uiEditableTextField().atIndex(1).clearText();
        await match.uiEditableTextField().atIndex(1).typeText(maxBolus);
        await match.uiEditableTextField().atIndex(1).tapReturnKey();
        await match.accessible.Label('Save to simulator').tap();
        await match.accessible.BackButton('Settings').tap();
        await match.accessible.ButtonBarButton('Done').tap();
    },
    /**
     * @name pump.checkDeliveryLimits
     * @param {string} maxBasalRate e.g. '1.0'
     * @param {string} maxBolus e.g. '10.0'
     */
    async checkDeliveryLimits(maxBasalRate, maxBolus) {
        await match.accessible.ButtonBarButton('Settings').tap();
        await match.accessible.Text('Delivery Limits').tap();
        await expect(match.uiEditableTextField().atIndex(0)).toHaveText(maxBasalRate);
        await expect(match.uiEditableTextField().atIndex(1)).toHaveText(maxBolus);
        await match.accessible.BackButton('Settings').tap();
        await match.accessible.ButtonBarButton('Done').tap();
    },
    /**
     * @summary add a bolus
     * @param {string} units
     */
    async bolus(units) {
        await match.accessible.Button('Bolus').tap();
        //TODO: why can't we match on label? by.label('Bolus Amount')
        await element(by.type('UITextField')).clearText();
        await element(by.type('UITextField')).typeText(units);
        await element(by.type('UIButton').and(by.label('Deliver')).and(by.traits(['button']))).tap();
        //TODO: can't interact with auth screen as long time pause before ready
        await waitFor(element(by.type('UITextField'))).toExist().withTimeout(1400);
        await element(by.type('UITextField')).typeText('fake_pw');
        await element(by.type('UITextField')).tapReturnKey();
    },
    /**
     * @name pump.setInsulinModel
     * @param {insulinModel} model e.g. 'Walsh'
     */
    async setInsulinModel(model) {
        await match.accessible.ButtonBarButton('Settings').tap();
        await match.accessible.Text('Insulin Model').tap();
        await match.accessible.Text(model.name).tap();
        await match.accessible.BackButton('Settings').tap();
        await match.accessible.ButtonBarButton('Done').tap();
    },
    /**
     * @name pump.checkInsulinModel
     * @param {insulinModel} model e.g. 'Walsh'
     */
    async checkInsulinModel(model) {
        await match.accessible.ButtonBarButton('Settings').tap();
        await match.accessible.Text('Insulin Model').tap();
        await match.accessible.Text(model.name).tap();
        await match.accessible.BackButton('Settings').tap();
        await match.accessible.ButtonBarButton('Done').tap();
    },
    /**
     * @name pump.setCorrectionRange
     * @param {corrections} corrections e.g. { range: { min: '80', max: '150' } });
     * corrections:{
     *    range:{ min: string, max: string,},
     *     preMeal:{min: string, max: string},
     *     workout:{min: string, max: string}
     * },
     */
    async setCorrectionRange2(corrections) {
        console.log('corrections: ', corrections);
        await match.accessible.ButtonBarButton('Settings').tap();
        await match.accessible.Text('Correction Range').tap();
        await match.accessible.ButtonBarButton('Add').tap();

        //TODO: atIndex!! need a better way
        await match.accessible.Label('12:00 AM').atIndex(0).tap();
        await match.accessible.Label(`${corrections.range.max}`).atIndex(1).tap();
        //
        await match.accessible.Label(`${corrections.range.min}`).atIndex(4).tap();
        await match.accessible.Label('Save').tap();
        await match.accessible.BackButton('Settings').tap();
        await match.accessible.ButtonBarButton('Done').tap();
    },
    /**
     * @name pump.setCorrectionRange
     * @param {corrections} corrections e.g. { range: { min: '80', max: '150' } });
     */
    async setCorrectionRange(corrections) {
        await match.accessible.ButtonBarButton('Settings').tap();
        await match.accessible.Text('Correction Range').tap();
        await match.accessible.ButtonBarButton('Add').tap();

        console.log('corrections: ', corrections);

        // if (corrections.range){
        //     console.log('corrections: ',corrections);
        // }

        //adjustable
        //UIAccessibilityPickerComponent
        //
        await match.accessible.Label('12:00 AM');

        //await match.accessible.Label('min').atIndex(1).tap();
        //await expect(element(by.label('min'))).toBeVisible();
        //await element(by.label('min')).setColumnToValue(1,"70");
        //await element(by.label('max')).setColumnToValue(1,"160");


        //await element(by.type('UIPickerTableView').withDescendant(by.type('UILabel').and(by.label('180')))).atIndex(0).tap();
        await element(by.type('UILabel').and(by.label('180')).withAncestor(by.type('UIPickerTableView'))).atIndex(0).tap();

        // await element(by.label('min').and(by.traits(['text']).and(by.type('UILabel')))).atIndex(0).tap();
        //await match.accessible.Label('min').tap();

        // await match.accessible.Text('max').tap();

        // await match.accessible.Text(model.name).tap();
        // await match.accessible.BackButton('Settings').tap();
        // await match.accessible.ButtonBarButton('Done').tap();
    },
    /**
     * @name pump.checkCorrectionRange
     * @param {boolean} isSet
     */
    async checkCorrectionRange(isSet) {
        await match.accessible.ButtonBarButton('Settings').tap();
        await expect(match.accessible.UILabel('Correction Range')).toExist();
        await match.accessible.UILabel('Correction Range').tap();
        await expect(match.accessible.ButtonBarButton('Edit', isSet)).toExist();
        await match.accessible.BackButton('Settings').tap();
        await match.accessible.ButtonBarButton('Done').tap();
    },
    /**
     * @name pump.setCarbRatios
     * @param {string} ratio
     */
    async setCarbRatios(ratio) {
        await match.accessible.ButtonBarButton('Settings').tap();
        await expect(match.accessible.UILabel('Carb Ratios')).toExist();
        await match.accessible.UILabel('Carb Ratios').tap();
        await match.accessible.ButtonBarButton('Add').tap();
        await element(by.type('UITextField')).clearText();
        await element(by.type('UITextField')).typeText(ratio);
        await match.accessible.BackButton('Settings').tap();
        await match.accessible.ButtonBarButton('Done').tap();
    },
    /**
     * @name pump.setInsulinSensitivities
     * @param {string} sensitivites
     */
    async setInsulinSensitivities(sensitivity) {
        const unitsSuffix = 'mg/dL/U';
        await match.accessible.ButtonBarButton('Settings').tap();
        //need to scroll to section
        await match.accessible.UILabel('Carb Ratios').swipe('up', 'fast');
        await match.accessible.Label('Insulin Sensitivities').tap();
        await match.accessible.ButtonBarButton('Add').tap();
        //TODO: why are there two??
        await match.accessible.Label(`${sensitivity} ${unitsSuffix}`).atIndex(1).tap();
        await match.accessible.Label('Save').tap();
        await match.accessible.BackButton('Settings').tap();
        await match.accessible.ButtonBarButton('Done').tap();
    },
};

module.exports = pump;