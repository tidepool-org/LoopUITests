const element = require('detox').element;
const match = require('./match');

/**
 * @summary represents the pump simulator
 */
const pump = {
    settings: {
        /**
         * @name pump.settings.BasalRates
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
         * @name pump.settings.CheckBasalRates
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
         * @name pump.settings.Suspend
         * @summary set the suspend threshold in mg/dL
         * @param {string} threshold e.g. '150'
         */
        async Suspend(threshold) {
            await match.accessible.ButtonBarButton('Settings').tap();
            await match.accessible.Text('Suspend Threshold').tap();
            await match.uiEditableTextField().typeText(threshold);
            await expect(match.uiEditableTextField()).toHaveText(threshold);
            await match.accessible.BackButton('Settings').tap();
            await match.accessible.ButtonBarButton('Done').tap();
        },
        /**
         * @name pump.settings.CheckSuspend
         * @summary check the suspend threshold in mg/dL
         * @param {string} threshold e.g. '150'
         */
        async CheckSuspend(threshold) {
            await match.accessible.ButtonBarButton('Settings').tap();
            await match.accessible.Text('Suspend Threshold').tap();
            await expect(match.uiEditableTextField()).toHaveText(threshold);
            await match.accessible.BackButton('Settings').tap();
            await match.accessible.ButtonBarButton('Done').tap();
        },
        /**
         * @name pump.settings.DeliveryLimits
         * @param {string} maxBasalRate e.g. '1.0'
         * @param {string} maxBolus e.g. '10.0'
         */
        async DeliveryLimits(maxBasalRate, maxBolus) {
            await match.accessible.ButtonBarButton('Settings').tap();
            await match.accessible.Text('Delivery Limits').tap();
            //TODO: using atIndex, need a better way to select these
            await match.uiEditableTextField().atIndex(0).clearText();
            await match.uiEditableTextField().atIndex(0).typeText(maxBasalRate);
            await match.uiEditableTextField().atIndex(0).tapReturnKey();
            await expect(match.uiEditableTextField().atIndex(0)).toHaveText(maxBasalRate);
            await match.uiEditableTextField().atIndex(1).clearText();
            await match.uiEditableTextField().atIndex(1).typeText(maxBolus);
            await match.uiEditableTextField().atIndex(1).tapReturnKey();
            await expect(match.uiEditableTextField().atIndex(1)).toHaveText(maxBolus);
            await match.accessible.Label('Save to simulator').tap();
            await match.accessible.BackButton('Settings').tap();
            await match.accessible.ButtonBarButton('Done').tap();
        },
        /**
         * @name pump.settings.CheckDeliveryLimits
         * @param {string} maxBasalRate e.g. '1.0'
         * @param {string} maxBolus e.g. '10.0'
         */
        async CheckDeliveryLimits(maxBasalRate, maxBolus) {
            await match.accessible.ButtonBarButton('Settings').tap();
            await match.accessible.Text('Delivery Limits').tap();
            await expect(match.uiEditableTextField().atIndex(0)).toHaveText(maxBasalRate);
            await expect(match.uiEditableTextField().atIndex(1)).toHaveText(maxBolus);
            await match.accessible.BackButton('Settings').tap();
            await match.accessible.ButtonBarButton('Done').tap();
        },
        /**
         * @name pump.settings.InsulinModel
         * @param {insulinModel} model e.g. 'Walsh'
         */
        async InsulinModel(model) {
            await match.accessible.ButtonBarButton('Settings').tap();
            await match.accessible.Text('Insulin Model').tap();
            await match.accessible.Text(model.name).tap();
            await match.accessible.BackButton('Settings').tap();
            await match.accessible.ButtonBarButton('Done').tap();
        },
        /**
         * @name pump.settings.CheckInsulinModel
         * @param {insulinModel} model e.g. 'Walsh'
         */
        async CheckInsulinModel(model) {
            await match.accessible.ButtonBarButton('Settings').tap();
            await match.accessible.Text('Insulin Model').tap();
            await match.accessible.Text(model.name).tap();
            await match.accessible.BackButton('Settings').tap();
            await match.accessible.ButtonBarButton('Done').tap();
        },
        /**
         * @name pump.settings.CarbRatios
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
         * @name pump.settings.InsulinSensitivities
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
         * @name pump.settings.CheckCorrectionRange
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
         * @name pump.settings.CorrectionRange
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

            if (corrections.range){
                console.log('corrections.range: ',corrections.range);
                //TODO: atIndex!! need a better way
                // await match.accessible.Label('12:00 AM').atIndex(0).tap();
                // await match.accessible.Label(`${corrections.range.max}`).atIndex(1).tap();
                // await match.accessible.Label(`${corrections.range.min}`).atIndex(0).tap();
                // await match.accessible.Label('Save').tap();
            }
            if (corrections.preMeal){
                console.log('corrections.preMeal: ',corrections.preMeal);
            }
            await match.accessible.BackButton('Settings').tap();
            await match.accessible.ButtonBarButton('Done').tap();
        },
    },
    /**
     * @name pump.Add
     * @summary add the simulator pump for loop
     */
    async Add() {
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
    async Remove() {
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
     * @name pump.RemoveData
     * @summary remove the simulator pump data for loop
     */
    async RemoveData() {
        await match.accessible.ButtonBarButton('Settings').tap();
        await match.accessible.UILabel('Carb Ratios').swipe('up', 'fast');
        //TODO static text and not a button?
        await match.accessible.Label('Delete Pump Data').atIndex(0).tap();
        await match.accessible.Label('Delete Pump Data').atIndex(1).tap();
        await match.accessible.ButtonBarButton('Done').tap();
    },

    /**
     * @summary add a bolus
     * @param {string} units
     */
    async Bolus(units) {
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
};

module.exports = pump;