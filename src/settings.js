const element = require('detox').element;
const match = require('./match');

const settings = {
    /**
     * @name InsulinModels
     * @summary insulin activity model
     */
    InsulinModels: {
        Walsh: { value: 0, name: "Walsh" },
        RapidAdults: { value: 1, name: "Rapid-Acting – Adults" },
        RapidChildren: { value: 2, name: "Rapid-Acting – Children" },
        Fiasp: { value: 3, name: "Fiasp" }
    },
    /**
     * @name settings.BasalRates
     * @param {string} [basalUnitsPerHour] e.g. '0.1'
     */
    async BasalRates(basalUnitsPerHour) {
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
     * @name settings.CheckBasalRates
     * @param {string} [basalUnitsPerHour] e.g. '0.1 U/hr'
    */
    async CheckBasalRates(basalUnitsPerHour) {
        await match.accessible.ButtonBarButton('Settings').tap();
        await match.accessible.Text('Basal Rates').tap();
        await expect(match.accessible.Header('Basal Rates')).toExist();
        //TODO check the rate
        await match.accessible.BackButton('Settings').tap();
        await match.accessible.ButtonBarButton('Done').tap();
    },
    /**
     * @name settings.Suspend
     * @summary set the suspend threshold in mg/dL
     * @param {string} threshold e.g. '150'
     */
    async Suspend(threshold) {
        await match.accessible.ButtonBarButton('Settings').tap();
        await match.accessible.Text('Suspend Threshold').tap();
        await match.UIEditableTextField().typeText(threshold);
        await expect(match.UIEditableTextField()).toHaveText(threshold);
        await match.accessible.BackButton('Settings').tap();
        await match.accessible.ButtonBarButton('Done').tap();
    },
    /**
     * @name settings.CheckSuspend
     * @summary check the suspend threshold in mg/dL
     * @param {string} threshold e.g. '150'
     */
    async CheckSuspend(threshold) {
        await match.accessible.ButtonBarButton('Settings').tap();
        await match.accessible.Text('Suspend Threshold').tap();
        await expect(match.UIEditableTextField()).toHaveText(threshold);
        await match.accessible.BackButton('Settings').tap();
        await match.accessible.ButtonBarButton('Done').tap();
    },
    /**
     * @name settings.DeliveryLimits
     * @param {string} maxBasalRate e.g. '1.0'
     * @param {string} maxBolus e.g. '10.0'
     */
    async DeliveryLimits(maxBasalRate, maxBolus) {
        await match.accessible.ButtonBarButton('Settings').tap();
        await match.accessible.Text('Delivery Limits').tap();
        //TODO: using atIndex, need a better way to select these
        await match.UIEditableTextField().atIndex(0).clearText();
        await match.UIEditableTextField().atIndex(0).typeText(maxBasalRate);
        await match.UIEditableTextField().atIndex(0).tapReturnKey();
        await expect(match.UIEditableTextField().atIndex(0)).toHaveText(maxBasalRate);
        await match.UIEditableTextField().atIndex(1).clearText();
        await match.UIEditableTextField().atIndex(1).typeText(maxBolus);
        await match.UIEditableTextField().atIndex(1).tapReturnKey();
        await expect(match.UIEditableTextField().atIndex(1)).toHaveText(maxBolus);
        await match.accessible.Label('Save to simulator').tap();
        await match.accessible.BackButton('Settings').tap();
        await match.accessible.ButtonBarButton('Done').tap();
    },
    /**
     * @name settings.CheckDeliveryLimits
     * @param {string} maxBasalRate e.g. '1.0'
     * @param {string} maxBolus e.g. '10.0'
     */
    async CheckDeliveryLimits(maxBasalRate, maxBolus) {
        await match.accessible.ButtonBarButton('Settings').tap();
        await match.accessible.Text('Delivery Limits').tap();
        await expect(match.UIEditableTextField().atIndex(0)).toHaveText(maxBasalRate);
        await expect(match.UIEditableTextField().atIndex(1)).toHaveText(maxBolus);
        await match.accessible.BackButton('Settings').tap();
        await match.accessible.ButtonBarButton('Done').tap();
    },
    /**
     * @name settings.InsulinModel
     * @param {InsulinModels} model e.g. 'Walsh'
     */
    async InsulinModel(model) {
        await match.accessible.ButtonBarButton('Settings').tap();
        await match.accessible.Text('Insulin Model').tap();
        await match.accessible.Text(model.name).tap();
        await match.accessible.BackButton('Settings').tap();
        await match.accessible.ButtonBarButton('Done').tap();
    },
    /**
     * @name settings.CheckInsulinModels
     * @param {InsulinModels} model e.g. 'Walsh'
     */
    async CheckInsulinModels(model) {
        await match.accessible.ButtonBarButton('Settings').tap();
        await match.accessible.Text('Insulin Model').tap();
        await match.accessible.Text(model.name).tap();
        await match.accessible.BackButton('Settings').tap();
        await match.accessible.ButtonBarButton('Done').tap();
    },
    /**
     * @name settings.CarbRatios
     * @param {string} ratio
     */
    async CarbRatios(ratio) {
        await match.accessible.ButtonBarButton('Settings').tap();
        await expect(match.accessible.UILabel('Carb Ratios')).toExist();
        await match.accessible.UILabel('Carb Ratios').tap();
        await match.accessible.ButtonBarButton('Add').tap();
        await element(by.type('UITextField')).clearText();
        await element(by.type('UITextField')).typeText(ratio);
        await expect(element(by.type('UITextField'))).toHaveText(ratio);
        await match.accessible.BackButton('Settings').tap();
        await match.accessible.ButtonBarButton('Done').tap();
    },
    /**
     * @name settings.InsulinSensitivities
     * @param {string} sensitivites
     */
    async InsulinSensitivities(sensitivity) {
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
    /**
     * @name settings.CheckCorrectionRange
     * @param {boolean} isSet
     */
    async CheckCorrectionRange(isSet) {
        await match.accessible.ButtonBarButton('Settings').tap();
        await expect(match.accessible.UILabel('Correction Range')).toExist();
        await match.accessible.UILabel('Correction Range').tap();
        await expect(match.accessible.ButtonBarButton('Edit', isSet)).toExist();
        await match.accessible.BackButton('Settings').tap();
        await match.accessible.ButtonBarButton('Done').tap();
    },
    /**
     * @name settings.CorrectionRange
     * @param {corrections} corrections e.g. { range: { min: '80', max: '150' } });
     * corrections:{
     *    range:{ min: string, max: string,},
     *     preMeal:{min: string, max: string},
     *     workout:{min: string, max: string}
     * },
     */
    async CorrectionRange(corrections) {
        console.log('corrections: ', corrections);
        await match.accessible.ButtonBarButton('Settings').tap();
        await match.accessible.Text('Correction Range').tap();
        await match.accessible.ButtonBarButton('Add').tap();

        if (corrections.range) {
            console.log('corrections.range: ', corrections.range);
            //TODO: atIndex!! need a better way
            // await match.accessible.Label('12:00 AM').atIndex(0).tap();
            // await match.accessible.Label(`${corrections.range.max}`).atIndex(1).tap();
            // await match.accessible.Label(`${corrections.range.min}`).atIndex(0).tap();
            // await match.accessible.Label('Save').tap();
        }
        if (corrections.preMeal) {
            console.log('corrections.preMeal: ', corrections.preMeal);
        }
        await match.accessible.BackButton('Settings').tap();
        await match.accessible.ButtonBarButton('Done').tap();
    },
    /**
     * @name settings.ClosedLoop
     * @summary turn on closed loop mode
     */
    async ClosedLoop() {
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
    /**
     * @name settings.OpenLoop
     * @summary set to open loop mode
     */
    async OpenLoop() {
        await match.accessible.ButtonBarButton('Settings').tap();
        await match.accessible.Button('Closed Loop').tap();
        //NOTE: not elegant but try catch approach is used by others in detox tests
        try {
            await expect(match.accessible.Button('Closed Loop')).toHaveValue('0');
        } catch (err) {
            await match.accessible.Button('Closed Loop').tap();
            await expect(match.accessible.Button('Closed Loop')).toHaveValue('0');
        }
        await match.accessible.ButtonBarButton('Done').tap();
    },
};

module.exports = settings;