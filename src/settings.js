const element = require('detox').element;
const match = require('./match');
const cgm = require('./cgm');

/**
 * @summary insulin activity model
 * @example InsulinModel.Fiasp
 */
var InsulinModel = {
    Walsh: 'Walsh',
    RapidAdults: 'Rapid-Acting – Adults',
    RapidChildren: 'Rapid-Acting – Children',
    Fiasp: 'Fiasp'
};

/**
 * @summary Defaults that can be used to apply to all settings
 * @example await settings.Apply(SettingDefault)
 */
var SettingDefault = {
    /**
     * @summary DeliveryLimits: { maxBolus: '10.0', maxBasalRate: '3.0' }
     */
    DeliveryLimits: { maxBolus: '10.0', maxBasalRate: '3.0' },
    /**
     * @summary BasalRates: [{ time: '12:00 AM', unitsPerHour: '0.1' }]
     */
    BasalRates: [{ time: '12:00 AM', unitsPerHour: '0.1' }],
    /**
     * @summary SuspendThreshold: { value: '75' }
     */
    SuspendThreshold: { value: '75' },
    /**
     * @summary InsulinModel: InsulinModel.RapidChildren
     */
    InsulinModel: InsulinModel.RapidChildren,
    /**
     * @summary CarbRatios: [{ time: '12:00 AM', carbGramsPerInsulinUnit: '8' }]
     */
    CarbRatios: [{ time: '12:00 AM', carbGramsPerInsulinUnit: '8' }],
    /**
     * @summary InsulinSensitivities: [{ time: '12:00 AM', bgValuePerInsulinUnit: '500' }]
     */
    InsulinSensitivities: [{ time: '12:00 AM', bgValuePerInsulinUnit: '500' }],
    /**
     * @summary  CorrectionRanges: [{ time: '12:00 AM', min: '120', max: '160' }]
     */
    CorrectionRanges: [{ time: '12:00 AM', min: '120', max: '160' }],
    /**
     * @summary  PreMealCorrectionRange: { min: '179', max: '180' }
     */
    PreMealCorrectionRange: { min: '80', max: '180' },
    /**
     *  @summary  ClosedLoop: true
     */
    ClosedLoop: true,
    /**
     *  @summary  AddCGMSimulator: true
     */
    AddCGMSimulator: true,
    /**
     *  @summary  AddPumpSimulator: true
     */
    AddPumpSimulator: true,
};

/**
 * @summary maps to Settings functions and is used to Filter functions when applying settings
 */
var SettingType = {
    BasalRates: 'BasalRates',
    CarbRatios: 'CarbRatios',
    DeliveryLimits: 'DeliveryLimits',
    InsulinModel: 'InsulinModel',
    SuspendThreshold: 'SuspendThreshold',
    InsulinSensitivities: 'InsulinSensitivities',
    CorrectionRanges: 'CorrectionRanges',
    PreMealCorrectionRange: 'PreMealCorrectionRange',
    ClosedLoop: 'ClosedLoop',
    AddPumpSimulator: 'AddPumpSimulator',
    AddCGMSimulator: 'AddCGMSimulator',
};

/**
 * @summary filter out settings defaults for those that you don't want to apply
 * @param {object} values
 * @param {Array} types
 * @example FilterSettings(SettingDefault, [SettingType.SetBasalRates])
 * @returns filtered Defaults set
 */
var FilterSettings = function (values, types) {
    const filtered = values;
    if (types) {
        for (const type of types) {
            console.log("remove: ", type);
            delete filtered[type];
        }
    }
    return filtered;
};

class Settings {
    /**
     * @example await settings.Open();
     */
    async Open() {
        try {
            //assume we are starting from the open screen
            await match.accessible.ButtonBarButton('Settings').tap();
        } catch (err) { } //catch and continue
        //await waitFor(match.accessible.Header('Settings')).toExist().withTimeout(2000);
    }
    /**
     * @example await settings.Close();
     */
    async Close() {
        await match.accessible.ButtonBarButton('Done').tap();
    }
    async  _exitSetting() {
        await match.accessible.BackButton('Settings').tap();
        await waitFor(match.accessible.Header('Settings')).toBeVisible().withTimeout(2000);
    }
    async  _swipeSettingsScreenDown(fromLabel) {
        await match.accessible.Label(fromLabel).swipe('down', 'fast');
    }
    async  _swipeSettingsScreenUp(toLabel) {
        try {
            await expect(match.accessible.Label(toLabel)).toBeVisible();
        }catch(err){
            await match.accessible.HeaderLabel('CONFIGURATION').swipe('up', 'fast');
            await expect(match.accessible.Label(toLabel)).toBeVisible();
        }
    }
    /**
     * @summary helper function to set settings by applying configured values
     * @param  {SettingDefault} values list of settings that will not be applied
     * @example await settings.Apply(SettingDefault)
     */
    async Apply(values) {
        console.log('Apply: ', values);
        if (values.AddCGMSimulator){
            await this.AddCGMSimulator();
        }
        if(values.AddPumpSimulator){
            await this.AddPumpSimulator();
        }
        await this.SetCorrectionRanges(values.CorrectionRanges);
        await this.SetSuspendThreshold(values.SuspendThreshold);
        await this.SetBasalRates(values.BasalRates);
        await this.SetDeliveryLimits(values.DeliveryLimits);
        await this.SetInsulinModel(values.InsulinModel);
        await this.SetCarbRatios(values.CarbRatios);
        await this.SetInsulinSensitivities(values.InsulinSensitivities);
        if (values.ClosedLoop) {
            await this.ClosedLoop();
        } else {
            await this.OpenLoop();
        }
    }
    /**
     * @param {string} bgValue
     * @example await settings.AddCGMSimulatorConstantBloodGlugose('112');
     */
    async AddCGMSimulatorConstantBloodGlugose(bgValue) {
        await cgm.ApplyModel(cgm.Model.Constant, [bgValue]);
    }
    /**
     * @summary basal rates to be set. NOTE: it is assumed that the rates are given in order of time
     * @param {Array} rates [{time:'12:00 AM', unitsPerHour:'0.1'}]
     * @example await settings.SetBasalRates([{time:'12:00 AM', unitsPerHour:'0.1'},{time:'12:30 AM', unitsPerHour:'0.3'}])
     */
    async SetBasalRates(rates) {
        if (rates) {
            const unitsSuffix = 'U/hr';
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
                match.accessible.Label(`${rate.time}`);
            }
            await match.accessible.Label('Save to simulator').tap();
            await this._exitSetting();

        }
    }
    /**
     * @name settings.SetSuspendThreshold
     * @summary set the suspend threshold in mg/dL
     * @param {object} threshold e.g. '150'
     * @example await settings.SetSuspendThreshold({value:150});
     */
    async SetSuspendThreshold(threshold) {
        if (threshold) {
            await match.accessible.Text('Suspend Threshold').tap();
            await match.UIEditableTextField().typeText(threshold.value);
            await expect(match.UIEditableTextField()).toHaveText(threshold.value);
            await this._exitSetting();

        }
    }
    /**
     * @param {object} { maxBasalRate string, maxBolus string }
     * @example await settings.SetDeliveryLimits({maxBasalRate:'1.0', maxBolus:'10.0'})
     */
    async SetDeliveryLimits(limits) {
        if (limits) {
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
            await this._exitSetting();

        }
    }
    /**
     * @param {InsulinModel} model e.g. 'Walsh'
     * @example await settings.SetInsulinModel(InsulinModel.Fiasp)
     */
    async SetInsulinModel(model) {
        if (model) {
            //await this._swipeSettingsScreenUp('Insulin Model');
            await match.accessible.Text('Insulin Model').tap();
            await match.accessible.Text(model).tap();
            await this._exitSetting();
            //await this._swipeSettingsScreenDown('Insulin Model');
        }
    }
    /**
    * @summary ratios be set. NOTE: it is assumed that the ratios are given in order of time
    * @param {Array} ratios [{time:'12:00 AM', carbGramsPerInsulinUnit:'8'}]
    * @example await settings.SetCarbRatios([{time:'12:00 AM', carbGramsPerInsulinUnit:'8'},{time:'12:30 AM', carbGramsPerInsulinUnit:'7'}])
    */
    async SetCarbRatios(ratios) {
        if (ratios) {
            //await this._swipeSettingsScreenUp('Carb Ratios');
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
            await this._exitSetting();
            //await this._swipeSettingsScreenDown('Carb Ratios');
        }
    }
    /**
    * @summary Sensitivities be set. NOTE: it is assumed that the Sensitivities are given in order of time
    * @param {Array} sensitivities [{time:'12:00 AM', bgValuePerInsulinUnit:'500'}]
    * @example await settings.SetInsulinSensitivities([{time:'12:00 AM', bgValuePerInsulinUnit:'500'},{time:'12:30 AM', bgValuePerInsulinUnit:'499'}])
    */
    async SetInsulinSensitivities(sensitivities) {
        if (sensitivities) {
            await this._swipeSettingsScreenUp('SERVICES');
            const unitsSuffix = 'mg/dL/U';
            await match.accessible.Label('Insulin Sensitivities').atIndex(1).tap();
            for (let index = 0; index < sensitivities.length; index++) {
                const sensitivity = sensitivities[index];
                await match.accessible.ButtonBarButton('Add').tap();
                await match.accessible.Label(`${sensitivity.bgValuePerInsulinUnit} ${unitsSuffix}`).atIndex(1).tap();
            }
            await match.accessible.Label('Save').tap();
            await this._exitSetting();
            await this._swipeSettingsScreenDown('SERVICES');
        }
    }
    /**
     * @summary correct ranges to be set. NOTE: it is assumed that the ranges are given in order of time
     * @param {object} ranges e.g. [{ time: '12:00 AM', min: '80', max: '150' }];
     * @example await settings.SetCorrectionRanges([{ time: '12:00 AM', min: '80', max: '150' },{ time: '12:30 AM', min: '80', max: '130' }])
     */
    async SetCorrectionRanges(ranges) {
        if (ranges) {
            await match.accessible.Text('Correction Range').tap();
            await match.accessible.ButtonBarButton('Add').tap();

            let correctionRangePickerIndex = 0;
            for (let index = 0; index < ranges.length; index++) {
                const range = ranges[index];
                await match.accessible.Label(`${range.time}`).atIndex(correctionRangePickerIndex).tap();
                for (let currentMax = 180; currentMax >= range.max; currentMax--) {
                    await match.accessible.PickerItem(1, `${currentMax}`).tap();
                }
                for (let currentMin = range.max; currentMin >= range.min; currentMin--) {
                    if (currentMin == range.max) {
                        await match.accessible.PickerItem(4, `${currentMin}`).tap();
                    } else if (currentMin == (range.max - 1))
                        await match.accessible.PickerItem(2, `${currentMin}`).tap();
                    else {
                        await match.accessible.PickerItem(1, `${currentMin}`).tap();
                    }
                }
                correctionRangePickerIndex++;
            }
            await match.accessible.Label('Save').tap();
            await this._exitSetting();
        }
    }
    /**
     * @param {Object} preMeal e.g. { min: '80', max: '150' };
     * @param {string} preMeal.min - the minimum value
     * @param {string} preMeal.max - the maximum value
     * @example await settings.SetPreMealCorrectionRange({ min: '80', max: '150' })
     */
    async SetPreMealCorrectionRange(preMeal) {
        if (preMeal) {
            const glucosePreMealOverridePickerColumns = {
                Label: 1,
                MinimumValue: 2,
                Separator: 3,
                MaximumValue: 4,
                Units: 5,
            };
            await match.accessible.Text('Correction Range').tap();
            if (preMeal) {
                await match.accessible.Label('Pre-Meal').tap();
                await match.accessible.PickerItem(2, `${preMeal.max}`).tap();
                await match.accessible.PickerItem(2, `${preMeal.min}`).atIndex(glucosePreMealOverridePickerColumns.MinimumValue).tap(); //sets min
            }
            await match.accessible.Label('Save').tap();
            await this._exitSetting();
        }

    }
    /**
     * @name settings.ClosedLoop
     * @summary turn on closed loop mode
     */
    async ClosedLoop() {
        await match.accessible.Button('Closed Loop').tap();
        //NOTE: not elegant but try catch approach is used by others in detox tests
        try {
            await expect(match.accessible.Button('Closed Loop')).toHaveValue('1');
        } catch (err) {
            await match.accessible.Button('Closed Loop').tap();
            await expect(match.accessible.Button('Closed Loop')).toHaveValue('1');
        }
    }
    /**
     * @name settings.OpenLoop
     * @summary set to open loop mode
     */
    async OpenLoop() {
        await match.accessible.Button('Closed Loop').tap();
        //NOTE: not elegant but try catch approach is used by others in detox tests
        try {
            await expect(match.accessible.Button('Closed Loop')).toHaveValue('0');
        } catch (err) {
            await match.accessible.Button('Closed Loop').tap();
            await expect(match.accessible.Button('Closed Loop')).toHaveValue('0');
        }
    }
    /**
     * @summary add CGM Simulator
     */
    async AddCGMSimulator() {
        await match.accessible.UILabel('Add CGM').tap();
        await match.accessible.Button('Simulator').tap();
    }
    /**
     * @summary add Pump Simulator
     */
    async AddPumpSimulator() {
        await match.accessible.UILabel('Add Pump').atIndex(0).tap();
        await match.accessible.Button('Simulator').tap();
        await match.accessible.Button('Continue').tap();
    }
}

module.exports = {
    Settings,
    FilterSettings,
    SettingDefault,
    SettingType,
    InsulinModel
};
