const element = require('detox').element;
const match = require('./match');

const settings = {
    /**
     * @summary insulin activity model
     * @example settings.InsulinModel.Fiasp
     */
    InsulinModel: {
        Walsh: { value: 0, name: "Walsh" },
        RapidAdults: { value: 1, name: "Rapid-Acting – Adults" },
        RapidChildren: { value: 2, name: "Rapid-Acting – Children" },
        Fiasp: { value: 3, name: "Fiasp" },
        NotSet: { value: 4, name: "" }
    },
    /**
     * @summary basal rates to be set. NOTE: it is assumed that the rates are given in order of time
     * @param {Array} rates [{time:'12:00 AM', unitsPerHour:'0.1'}]
     * @example await settings.BasalRates([{time:'12:00 AM', unitsPerHour:'0.1'},{time:'12:30 AM', unitsPerHour:'0.3'}])
     */
    async BasalRates(rates) {
        const unitsSuffix = 'U/hr';
        await match.accessible.ButtonBarButton('Settings').tap();
        await match.accessible.Text('Basal Rates').tap();
        await expect(match.accessible.Header('Basal Rates')).toExist();

        for (let index = 0; index < rates.length; index++) {
            const rate = rates[index];
            await match.accessible.ButtonBarButton('Add').tap();
            if (index == 0) {
                await match.accessible.Label(`0 ${unitsSuffix}`).atIndex(0).tap();
            } else {
                await match.accessible.Label(`${rates[index - 1].unitsPerHour} ${unitsSuffix}`).atIndex(0).tap();
            }
            await match.accessible.Label(`${rate.unitsPerHour} ${unitsSuffix}`).tap();
            await match.accessible.Label(`${rate.time}`);
        }

        await match.accessible.Label('Save to simulator').tap();
        await match.accessible.BackButton('Settings').tap();
        await match.accessible.ButtonBarButton('Done').tap();
    },
    /**
     * @name settings.SuspendThreshold
     * @summary set the suspend threshold in mg/dL
     * @param {string} threshold e.g. '150'
     */
    async SuspendThreshold(threshold) {
        await match.accessible.ButtonBarButton('Settings').tap();
        await match.accessible.Text('Suspend Threshold').tap();
        await match.UIEditableTextField().typeText(threshold);
        await expect(match.UIEditableTextField()).toHaveText(threshold);
        await match.accessible.BackButton('Settings').tap();
        await match.accessible.ButtonBarButton('Done').tap();
    },
    /**
     * @param {object} { maxBasalRate string, maxBolus string }
     * @example await settings.DeliveryLimits({maxBasalRate:'1.0', maxBolus:'10.0'})
     */
    async DeliveryLimits(limits) {
        await match.accessible.ButtonBarButton('Settings').tap();
        await match.accessible.Text('Delivery Limits').tap();
        //TODO: using atIndex, need a better way to select these
        await match.UIEditableTextField().atIndex(0).clearText();
        await match.UIEditableTextField().atIndex(0).typeText(limits.maxBasalRate);
        await match.UIEditableTextField().atIndex(0).tapReturnKey();
        await expect(match.UIEditableTextField().atIndex(0)).toHaveText(limits.maxBasalRate);
        await match.UIEditableTextField().atIndex(1).clearText();
        await match.UIEditableTextField().atIndex(1).typeText(limits.maxBolus);
        await match.UIEditableTextField().atIndex(1).tapReturnKey();
        await expect(match.UIEditableTextField().atIndex(1)).toHaveText(limits.maxBolus);
        await match.accessible.Label('Save to simulator').tap();
        await match.accessible.BackButton('Settings').tap();
        await match.accessible.ButtonBarButton('Done').tap();
    },
    /**
     * @name settings.InsulinModel
     * @param {InsulinModel} model e.g. 'Walsh'
     * @example await settings.SelectInsulinModel(settings.InsulinModel.Fiasp)
     */
    async SelectInsulinModel(model) {
        await match.accessible.ButtonBarButton('Settings').tap();
        await match.accessible.Text('Insulin Model').tap();
        await match.accessible.Text(model.name).tap();
        await match.accessible.BackButton('Settings').tap();
        await match.accessible.ButtonBarButton('Done').tap();
    },
    /**
    * @summary ratios be set. NOTE: it is assumed that the ratios are given in order of time
    * @param {Array} ratios [{time:'12:00 AM', carbGramsPerInsulinUnit:'8'}]
    * @example await settings.CarbRatios([{time:'12:00 AM', carbGramsPerInsulinUnit:'8'},{time:'12:30 AM', carbGramsPerInsulinUnit:'7'}])
    */
    async CarbRatios(ratios) {
        await match.accessible.ButtonBarButton('Settings').tap();
        await expect(match.accessible.UILabel('Carb Ratios')).toExist();
        await match.accessible.UILabel('Carb Ratios').tap();

        for (let index = 0; index < ratios.length; index++) {
            const ratio = ratios[index];
            await match.accessible.ButtonBarButton('Add').tap();
            if (index == 0) {
                await element(by.type('UITextField')).clearText();
                await element(by.type('UITextField')).typeText(ratio.carbGramsPerInsulinUnit);
                await expect(element(by.type('UITextField'))).toHaveText(ratio.carbGramsPerInsulinUnit);
            } else {
                await element(by.type('UITextField').atIndex(index)).clearText();
                await element(by.type('UITextField').atIndex(index)).typeText(ratio.carbGramsPerInsulinUnit);
                await expect(element(by.type('UITextField').atIndex(index))).toHaveText(ratio.carbGramsPerInsulinUnit);
            }
        }
        await match.accessible.BackButton('Settings').tap();
        await match.accessible.ButtonBarButton('Done').tap();
    },
    /**
    * @summary Sensitivities be set. NOTE: it is assumed that the Sensitivities are given in order of time
    * @param {Array} sensitivities [{time:'12:00 AM', bgValuePerInsulinUnit:'500'}]
    * @example await settings.InsulinSensitivities([{time:'12:00 AM', bgValuePerInsulinUnit:'500'},{time:'12:30 AM', bgValuePerInsulinUnit:'499'}])
    */
    async InsulinSensitivities(sensitivities) {
        const unitsSuffix = 'mg/dL/U';
        await match.accessible.ButtonBarButton('Settings').tap();
        //need to scroll to section
        await match.accessible.UILabel('Carb Ratios').swipe('up', 'fast');
        await match.accessible.Label('Insulin Sensitivities').tap();
        for (let index = 0; index < sensitivities.length; index++) {
            const sensitivity = sensitivities[index];
            await match.accessible.ButtonBarButton('Add').tap();
            await match.accessible.Label(`${sensitivity.bgValuePerInsulinUnit} ${unitsSuffix}`).atIndex(1).tap();
        }
        await match.accessible.Label('Save').tap();
        await match.accessible.BackButton('Settings').tap();
        await match.accessible.ButtonBarButton('Done').tap();
    },
    /**
     * @summary correct ranges to be set. NOTE: it is assumed that the ranges are given in order of time
     * @param {object} ranges e.g. [{ time: '12:00 AM', min: '80', max: '150' }];
     * @example await settings.CorrectionRanges([{ time: '12:00 AM', min: '80', max: '150' },{ time: '12:30 AM', min: '80', max: '130' }])
     */
    async CorrectionRanges(ranges) {
        const correctionRangePickerColumns = {
            Time: 1,
            MinimumValue: 2,
            Separator: 3,
            MaximumValue: 4,
            Units: 5,
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
     * @param {object} override e.g. { min: '80', max: '150' };
     * @example await settings.PreMealCorrectionRange({ min: '80', max: '150' })
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