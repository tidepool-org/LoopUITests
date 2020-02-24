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
        Fiasp: { value: 3, name: "Fiasp" },
        NotSet: { value: 4, name: "" }
    },
    /**
     * @name settings.BasalRates
     * @param {string} [basalUnitsPerHour] e.g. '0.1'
     */
    async BasalRates(basalUnitsPerHour) {
        if (basalUnitsPerHour) {
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
        }
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
        if (threshold) {
            await match.accessible.ButtonBarButton('Settings').tap();
            await match.accessible.Text('Suspend Threshold').tap();
            await match.UIEditableTextField().typeText(threshold);
            await expect(match.UIEditableTextField()).toHaveText(threshold);
            await match.accessible.BackButton('Settings').tap();
            await match.accessible.ButtonBarButton('Done').tap();
        }
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
     * @param {string} maxBasalRate e.g. '1.0'
     * @param {string} maxBolus e.g. '10.0'
     * @example await settings.DeliveryLimits('1.2','11.0')
     */
    async DeliveryLimits(maxBasalRate, maxBolus) {
        const limits = {
            maxBasalRateField: 0,
            maxBolusField: 1,
        };
        if (maxBasalRate || maxBolus) {
            await match.accessible.ButtonBarButton('Settings').tap();
            await match.accessible.Text('Delivery Limits').tap();
            if (maxBasalRate) {
                await match.UIEditableTextField().atIndex(limits.maxBasalRateField).clearText();
                await match.UIEditableTextField().atIndex(limits.maxBasalRateField).typeText(maxBasalRate);
                await match.UIEditableTextField().atIndex(limits.maxBasalRateField).tapReturnKey();
            }
            if (maxBolus) {
                await match.UIEditableTextField().atIndex(limits.maxBolusField).clearText();
                await match.UIEditableTextField().atIndex(limits.maxBolusField).typeText(maxBolus);
                await match.UIEditableTextField().atIndex(limits.maxBolusField).tapReturnKey();
            }
            await expect(match.UIEditableTextField().atIndex(limits.maxBasalRateField)).toHaveText(maxBasalRate);
            await expect(match.UIEditableTextField().atIndex(limits.maxBolusField)).toHaveText(maxBolus);
            await match.accessible.Label('Save to simulator').tap();
            await match.accessible.BackButton('Settings').tap();
            await match.accessible.ButtonBarButton('Done').tap();
        }
    },
    /**
     * @name settings.CheckDeliveryLimits
     * @param {string} maxBasalRate e.g. '1.0'
     * @param {string} maxBolus e.g. '10.0'
     */
    async CheckDeliveryLimits(maxBasalRate, maxBolus) {
        const limits = {
            maxBasalRateField: 0,
            maxBolusField: 1,
        };
        await match.accessible.ButtonBarButton('Settings').tap();
        await match.accessible.Text('Delivery Limits').tap();
        await expect(match.UIEditableTextField().atIndex(limits.maxBasalRateField)).toHaveText(maxBasalRate);
        await expect(match.UIEditableTextField().atIndex(limits.maxBolusField)).toHaveText(maxBolus);
        await match.accessible.BackButton('Settings').tap();
        await match.accessible.ButtonBarButton('Done').tap();
    },
    /**
     * @name settings.InsulinModel
     * @param {InsulinModels} model e.g. 'Walsh'
     */
    async InsulinModel(model) {
        if (model) {
            if (model.name == this.InsulinModels.NotSet) {
                return;
            }
            await match.accessible.ButtonBarButton('Settings').tap();
            await match.accessible.Text('Insulin Model').tap();
            await match.accessible.Text(model.name).tap();
            await match.accessible.BackButton('Settings').tap();
            await match.accessible.ButtonBarButton('Done').tap();
        }
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
        if (ratio) {
            await match.accessible.ButtonBarButton('Settings').tap();
            await expect(match.accessible.UILabel('Carb Ratios')).toExist();
            await match.accessible.UILabel('Carb Ratios').tap();
            await match.accessible.ButtonBarButton('Add').tap();
            await element(by.type('UITextField')).clearText();
            await element(by.type('UITextField')).typeText(ratio);
            await expect(element(by.type('UITextField'))).toHaveText(ratio);
            await match.accessible.BackButton('Settings').tap();
            await match.accessible.ButtonBarButton('Done').tap();
        }
    },
    /**
     * @name settings.InsulinSensitivities
     * @param {string} sensitivites
     */
    async InsulinSensitivities(sensitivity) {
        if (sensitivity) {
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
        }
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
     * @name settings.CorrectionRanges
     * @param {object} ranges e.g. [{ time: '12:00 AM', min: '80', max: '150' }];
     */
    async CorrectionRanges(ranges) {
        const correctionRangePickerColumns = {
            Units: 5,
            MaximumValue: 4,
            Separator: 3,
            MinimumValue: 2,
            Time: 1,
        };
        if (ranges) {
            await match.accessible.ButtonBarButton('Settings').tap();
            await match.accessible.Text('Correction Range').tap();
            await match.accessible.ButtonBarButton('Add').tap();

            let pickerItemIndex = 1;
            for (let index = 0; index < ranges.length; index++) {
                const range = ranges[index];
                await match.accessible.Label(`${range.time}`).atIndex(0).tap();
                await match.accessible.PickerItem(pickerItemIndex, `${range.max}`).tap();
                await match.accessible.PickerItem(pickerItemIndex, `${range.min}`).atIndex(correctionRangePickerColumns.MinimumValue).tap();
                pickerItemIndex++;
            }

            await match.accessible.Label('Save').tap();
            await match.accessible.BackButton('Settings').tap();
            await match.accessible.ButtonBarButton('Done').tap();
        }
    },
    /**
     * @name settings.CorrectionRangeOverride
     * @param {object} preMeal e.g. { min: '80', max: '150' };
     */
    async PreMealCorrectionRange(preMeal) {
        const glucosePreMealOverridePickerColumns = {
            Label: 1,
            MinimumValue: 2,
            Separator: 3,
            MaximumValue: 4,
            Units: 5,
        };
        await match.accessible.ButtonBarButton('Settings').tap();
        await match.accessible.Text('Correction Range').tap();
        if (preMeal) {
            await match.accessible.Label('Pre-Meal').tap();
            await match.accessible.PickerItem(2, `${preMeal.max}`).tap();
            await match.accessible.PickerItem(2, `${preMeal.min}`).atIndex(glucosePreMealOverridePickerColumns.MinimumValue).tap(); //sets min
        }
        await match.accessible.Label('Save').tap();
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
    Defaults: {
        /**
         * @summary
         */
        DeliveryLimits: { maxBolus: '10.0', maxBasalRate: '3.0' },
        BasalRates: { units: '0.1' },
        SuspendThreshold: { threshold: '75' },
        InsulinModel: { value: 2, name: "Rapid-Acting – Children" },
        CarbRatios: { ratio: '8' },
        InsulinSensitivities: { sensitivity: '500' },
        CorrectionRanges: [{ time: '12:00 AM', min: '179', max: '180' }],
        PreMealCorrectionRange: { min: '179', max: '180' },
    },
    /**
     * @summary Settings that are availabe to be set
     */
    Setting: {
        BasalRates: "BasalRates",
        DeliveryLimits: "DeliveryLimits",
        Suspend: "Suspend",
        InsulinModel: "InsulinModel",
        CarbRatios: "CarbRatios",
        InsulinSensitivities: "InsulinSensitivities",
        CorrectionRanges: "CorrectionRanges"
    },
    /**
     * @summary helper function to set seetings by applying the {settings.Defaults}
     * @param  {Setting[]} doNotSet list of settings that will not be applied
     * @example await settings.ApplyUsingDefaults(settings.Setting.Suspend)
     */
    async ApplyUsingDefaults(...doNotSet) {
        if (doNotSet.includes(this.Setting.BasalRates)) {
            await this.BasalRates('');
        } else {
            await this.BasalRates(this.Defaults.BasalRates.units);
        }
        if (doNotSet.includes(this.Setting.DeliveryLimits)) {
            await this.DeliveryLimits('', '');
        } else {
            await this.DeliveryLimits(this.Defaults.DeliveryLimits.maxBasalRate, this.Defaults.DeliveryLimits.maxBolus);
        }
        if (doNotSet.includes(this.Setting.Suspend)) {
            await this.Suspend('');
        } else {
            await this.Suspend(this.Defaults.SuspendThreshold.threshold);
        }
        if (doNotSet.includes(this.Setting.InsulinModel)) {
            await this.InsulinModel(this.InsulinModels.NotSet);
        } else {
            await this.InsulinModel(this.Defaults.InsulinModel);
        }
        if (doNotSet.includes(this.Setting.CarbRatios)) {
            await this.CarbRatios('');
        } else {
            await this.CarbRatios(this.Defaults.CarbRatios.ratio);
        }
        if (doNotSet.includes(this.Setting.InsulinSensitivities)) {
            await this.InsulinSensitivities('');
        } else {
            await this.InsulinSensitivities(this.Defaults.InsulinSensitivities.sensitivity);
        }
        if (doNotSet.includes(this.Setting.CorrectionRanges)) {
            await this.CorrectionRanges([]);
        } else {
            await this.CorrectionRanges(this.Defaults.CorrectionRanges);
        }
    },
};

module.exports = settings;