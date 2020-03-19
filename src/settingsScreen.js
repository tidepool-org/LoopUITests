const element = require('detox').element;
const match = require('./match');
const { Label, SettingsLabel } = require('./labels');

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
 * @summary CGMModel that can be applied to the simulator
 */
var CGMModel = {
    Constant: 'Constant',
    SineCurve: 'Sine Curve',
    None: 'No Data'
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
     * @summary  CorrectionRanges: [{ time: '12:00 AM', min: '140', max: '160' }]
     */
    CorrectionRanges: [{ time: '12:00 AM', min: '140', max: '160' }],
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
    /**
     * @summary  CGMSimulatorSettings: { modelData: { model: CGMModel.Constant, bgValues: ['142'] }, backfillHours: '3' }
     */
    CGMSimulatorSettings: { modelData: { model: CGMModel.Constant, bgValues: ['142'] }, backfillHours: '3' }
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
    CGMSimulatorSettings: 'CGMSimulatorSettings'
};

/**
 * @summary CGMEffect that can be applied to the simulator
 */
var CGMEffect = {
    GlucoseNoise: 'Glucose Noise',
    RandomHighOutlier: 'Random High Outlier',
    RandomLowOutlier: 'Random Low Outlier',
    RandomError: 'Random Error'
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
            delete filtered[type];
        }
    }
    return filtered;
};


var _setCGMEffect = async function (effect) {
    await match.accessible.Label(effect).tap();
    switch (effect) {
        case CGMEffect.GlucoseNoise:
            await match.UIEditableTextField().clearText();
            await match.UIEditableTextField().typeText('100');
            await match.ButtonBarButton(Label.Back).tap();
            break;
        case CGMEffect.RandomError:
            await match.UIEditableTextField().clearText();
            await match.UIEditableTextField().typeText('10');
            await match.ButtonBarButton(Label.Back).tap();
            break;
        default:
            break;
    }
};

var _setCGMModel = async function (modelData) {
    if (modelData) {
        await match.accessible.Label(modelData.model).tap();
        switch (modelData.model) {
            case CGMModel.Constant:
                await match.UIEditableTextField().clearText();
                await match.UIEditableTextField().typeText(modelData.bgValues[0]);
                await match.accessible.BackButton('CGM Settings').tap();
                break;
            case CGMModel.SineCurve:
                await match.accessible.Label('Base Glucose').tap();
                await match.UIEditableTextField().clearText();
                await match.UIEditableTextField().typeText(modelData.bgValues[0]);
                await match.accessible.BackButton('Sine Curve').tap();
                await match.accessible.Label('Amplitude').tap();
                await match.UIEditableTextField().clearText();
                await match.UIEditableTextField().typeText(modelData.bgValues[1]);
                await match.accessible.BackButton('Sine Curve').tap();
                await match.accessible.BackButton('CGM Settings').tap();
                break;
            default:
                break;
        }
    }
};
var _setCGMBackfill = async function (hours) {
    await match.accessible.Label('Backfill Glucose').tap();
    await match.accessible.Label('3 hr').tap();
    await match.accessible.BackButton('CGM Settings').tap();
};

var _exitSetting = async function () {
    await match.accessible.BackButton(SettingsLabel.Settings).tap();
    // TODO: not reccomended
    // await waitFor(match.accessible.Header(SettingsLabel.Settings)).toBeVisible().withTimeout(2000);
}
var _swipeSettingsScreenDown = async function (labelToSee) {
    try {
        await expect(match.accessible.Label(labelToSee)).toBeVisible();
    } catch (err) {
        await match.accessible.Label(SettingsLabel.Configuration).swipe('down', 'fast');
        await expect(match.accessible.Label(labelToSee)).toBeVisible();
    }
    return;
}
var _swipeSettingsScreenUp = async function (labelToSee) {
    try {
        await expect(match.accessible.Label(labelToSee)).toBeVisible();
    } catch (err) {
        await match.accessible.Header(SettingsLabel.Configuration).swipe('up', 'fast');
        await expect(match.accessible.Label(labelToSee)).toBeVisible();
    }
}
var _selectPumpSimulator = async function () {
    await match.accessible.Id('Simulator Small').tap();
}
var _selectCGMSimulator = async function () {
    // TODO: not reccomended
    // await waitFor(match.accessible.Label(SettingsLabel.ContinuousGlucoseMonitor)).toBeVisible().withTimeout(2000);
    //TODO: wee need to select by Id
    try {
        await match.accessible.Label(SettingsLabel.Simulator).atIndex(1).tap();
    } catch (err) {
        try {
            await match.accessible.Label(SettingsLabel.Simulator).atIndex(0).tap();
        } catch (err2) {
            await match.accessible.Label(SettingsLabel.Simulator).atIndex(2).tap();
        }
    }
}

class SettingsScreen {
    /**
     * @example await settings.Open();
     */
    async Open() {
        //assume we are starting from the open screen
        //await waitFor(match.accessible.ButtonBarButton(SettingsLabel.Settings)).toBeVisible().withTimeout(2000);
        await match.accessible.ButtonBarButton(SettingsLabel.Settings).tap();
    }
    /**
     * @example await settings.Close();
     */
    async Close() {
        await this.DoneButton().tap();
    }
    /**
     * @example settings.DoneButton();
     */
    DoneButton() {
        return match.accessible.ButtonBarButton(Label.Done);
    }
    /**
     * @example settings.ConfigurationHeader();
     */
    ConfigurationHeader() {
        return match.accessible.Header(SettingsLabel.Configuration);
    }
    /**
     * @example settings.ServicesHeader();
     */
    ServicesHeader() {
        return match.accessible.Header(SettingsLabel.Services);
    }
    /**
     * @example settings.PumpHeader();
     */
    PumpHeader() {
        return match.accessible.Header(SettingsLabel.Pump);
    }
    /**
     * @example settings.ContinuousGlucoseMonitorHeader();
     */
    ContinuousGlucoseMonitorHeader() {
        return match.accessible.Header(SettingsLabel.ContinuousGlucoseMonitor);
    }
    /**
     * @example settings.SettingsHeader();
     */
    SettingsHeader() {
        return match.accessible.Header(SettingsLabel.Settings);
    }
    BasalRatesLabel() {
        return match.accessible.Label(SettingsLabel.BasalRates)
    }
    SuspendThresholdLabel() {
        return match.accessible.Label(SettingsLabel.SuspendThreshold)
    }
    DeliveryLimitsLabel() {
        return match.accessible.Label(SettingsLabel.DeliveryLimits)
    }
    InsulinModelLabel() {
        return match.accessible.Label(SettingsLabel.InsulinModel)
    }
    CarbRatiosLabel() {
        return match.accessible.Label(SettingsLabel.CarbRatios)
    }
    InsulinSensitivitiesLabel() {
        return match.accessible.Label(SettingsLabel.InsulinSensitivities)
    }
    CorrectionRangeLabel() {
        return match.accessible.Label(SettingsLabel.CorrectionRange);
    }
    ClosedLoopButton() {
        return match.accessible.Button(SettingsLabel.ClosedLoop);
    }
    AddPumpLabel() {
        return match.accessible.Label(SettingsLabel.AddPump);
    }
    AddCGMLabel() {
        return match.accessible.Label(SettingsLabel.AddCGM);
    }
    async ScrollToBottom() {
        return _swipeSettingsScreenDown(SettingsLabel.ServicesHeader);
    }
    async ScrollToTop() {
        return _swipeSettingsScreenUp(SettingsLabel.ConfigurationHeader);
    }
    /**
     * @summary helper function to set settings by applying configured values
     * @param  {SettingDefault} values list of settings that will not be applied
     * @example await settings.Apply(SettingDefault)
     */
    async Apply(values) {
        if (values.AddCGMSimulator) {
            await this.AddCGMSimulator();
        }
        if (values.AddPumpSimulator) {
            await this.AddPumpSimulator();
        }
        await this.SetCGMSimulatorSettings(values.CGMSimulatorSettings);
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
     * @summary basal rates to be set. NOTE: it is assumed that the rates are given in order of time
     * @param {Array} rates [{time:'12:00 AM', unitsPerHour:'0.1'}]
     * @example await settings.SetBasalRates([{time:'12:00 AM', unitsPerHour:'0.1'},{time:'12:30 AM', unitsPerHour:'0.3'}])
     */
    async SetBasalRates(rates) {
        if (rates) {
            const unitsSuffix = 'U/hr';
            await this.BasalRatesLabel().tap();
            await expect(match.accessible.Header(SettingsLabel.BasalRates)).toExist();

            for (let index = 0; index < rates.length; index++) {
                const rate = rates[index];
                await match.accessible.ButtonBarButton(Label.Add).tap();
                if (index == 0) {
                    await match.accessible.Label(`0 ${unitsSuffix}`).atIndex(0).tap();
                } else {
                    await match.accessible.Label(`${rates[index - 1].unitsPerHour} ${unitsSuffix}`).atIndex(0).tap();
                }
                await match.accessible.Label(`${rate.unitsPerHour} ${unitsSuffix}`).tap();
                match.accessible.Label(`${rate.time}`);
            }
            await match.accessible.Label(SettingsLabel.SaveToSimulator).tap();
            await _exitSetting();
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
            await this.SuspendThresholdLabel().tap();
            await match.UIEditableTextField().typeText(threshold.value);
            await expect(match.UIEditableTextField()).toHaveText(threshold.value);
            await _exitSetting();
        }
    }
    /**
     * @param {object} { maxBasalRate string, maxBolus string }
     * @example await settings.SetDeliveryLimits({maxBasalRate:'1.0', maxBolus:'10.0'})
     */
    async SetDeliveryLimits(limits) {
        if (limits) {
            await this.DeliveryLimitsLabel().tap();
            //TODO: using atIndex, need a better way to select these
            await match.UIEditableTextField().atIndex(0).clearText();
            await match.UIEditableTextField().atIndex(0).typeText(limits.maxBasalRate);
            await match.UIEditableTextField().atIndex(0).tapReturnKey();
            await expect(match.UIEditableTextField().atIndex(0)).toHaveText(limits.maxBasalRate);
            await match.UIEditableTextField().atIndex(1).clearText();
            await match.UIEditableTextField().atIndex(1).typeText(limits.maxBolus);
            await match.UIEditableTextField().atIndex(1).tapReturnKey();
            await expect(match.UIEditableTextField().atIndex(1)).toHaveText(limits.maxBolus);
            await match.accessible.Label(SettingsLabel.SaveToSimulator).tap();
            await _exitSetting();
        }
    }
    /**
     * @param {InsulinModel} model
     * @example await settings.SetInsulinModel(InsulinModel.Fiasp)
     */
    async SetInsulinModel(model) {
        if (model) {
            await this.InsulinModelLabel().tap();
            await match.accessible.Text(model).tap();
            await _exitSetting();
        }
    }
    /**
    * @summary ratios be set. NOTE: it is assumed that the ratios are given in order of time
    * @param {Array} ratios [{time:'12:00 AM', carbGramsPerInsulinUnit:'8'}]
    * @example await settings.SetCarbRatios([{time:'12:00 AM', carbGramsPerInsulinUnit:'8'},{time:'12:30 AM', carbGramsPerInsulinUnit:'7'}])
    */
    async SetCarbRatios(ratios) {
        if (ratios) {
            await this.CarbRatiosLabel().tap();
            for (let index = 0; index < ratios.length; index++) {
                const ratio = ratios[index];
                await match.accessible.ButtonBarButton(Label.Add).tap();
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
            await _exitSetting();
        }
    }
    /**
    * @summary Sensitivities be set. NOTE: it is assumed that the Sensitivities are given in order of time
    * @param {Array} sensitivities [{time:'12:00 AM', bgValuePerInsulinUnit:'500'}]
    * @example await settings.SetInsulinSensitivities([{time:'12:00 AM', bgValuePerInsulinUnit:'500'},{time:'12:30 AM', bgValuePerInsulinUnit:'499'}])
    */
    async SetInsulinSensitivities(sensitivities) {
        if (sensitivities) {
            await _swipeSettingsScreenUp(SettingsLabel.InsulinSensitivities);
            const unitsSuffix = 'mg/dL/U';
            await this.InsulinSensitivitiesLabel().atIndex(1).tap();
            for (let index = 0; index < sensitivities.length; index++) {
                const sensitivity = sensitivities[index];
                await match.accessible.ButtonBarButton(Label.Add).tap();
                await match.accessible.Label(`${sensitivity.bgValuePerInsulinUnit} ${unitsSuffix}`).atIndex(1).tap();
            }
            await match.accessible.Label(Label.Save).tap();
            await _exitSetting();
            await _swipeSettingsScreenDown(SettingsLabel.Configuration);
        }
    }
    /**
     * @summary correct ranges to be set. NOTE: it is assumed that the ranges are given in order of time
     * @param {object} ranges e.g. [{ time: '12:00 AM', min: '80', max: '150' }];
     * @example await settings.SetCorrectionRanges([{ time: '12:00 AM', min: '80', max: '150' },{ time: '12:30 AM', min: '80', max: '130' }])
     */
    async SetCorrectionRanges(ranges) {
        if (ranges) {
            await this.CorrectionRangeLabel().tap();
            await match.accessible.ButtonBarButton(Label.Add).tap();

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
            await match.accessible.Label(Label.Save).tap();
            await _exitSetting();
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
            await this.CorrectionRangeLabel().tap();
            if (preMeal) {
                await match.accessible.Label('Pre-Meal').tap();
                await match.accessible.PickerItem(2, `${preMeal.max}`).tap();
                await match.accessible.PickerItem(2, `${preMeal.min}`).atIndex(glucosePreMealOverridePickerColumns.MinimumValue).tap(); //sets min
            }
            await match.accessible.Label(Label.Save).tap();
            await _exitSetting();
        }
    }
    /**
     * @name settings.ClosedLoop
     * @summary turn on closed loop mode
     */
    async ClosedLoop() {
        await _swipeSettingsScreenDown(SettingsLabel.ClosedLoop);
        await this.ClosedLoopButton().tap();
        //NOTE: not elegant but try catch approach is used by others in detox tests
        try {
            await expect(this.ClosedLoopButton()).toHaveValue('1');
        } catch (err) {
            await this.ClosedLoopButton().tap();
            await expect(this.ClosedLoopButton()).toHaveValue('1');
        }
    }
    /**
     * @name settings.OpenLoop
     * @summary set to open loop mode
     */
    async OpenLoop() {
        await _swipeSettingsScreenDown(SettingsLabel.ClosedLoop);
        await this.ClosedLoopButton().tap();
        //NOTE: not elegant but try catch approach is used by others in detox tests
        try {
            await expect(this.ClosedLoopButton()).toHaveValue('0');
        } catch (err) {
            await this.ClosedLoopButton().tap();
            await expect(this.ClosedLoopButton()).toHaveValue('0');
        }
    }
    /**
     * @name settings.IssueReport
     * @summary set to open loop mode
     * @example await settings.IssueReport();
     */
    async IssueReport() {
        await match.accessible.Label(SettingsLabel.IssueReport).tap();//TODO: not a button
        await expect(match.accessible.Header(SettingsLabel.IssueReport)).toBeVisible();
        await _exitSetting();
    }
    /**
     * @summary add CGM Simulator
     */
    async AddCGMSimulator() {
        await this.AddCGMLabel().tap();
        await match.accessible.Button(SettingsLabel.Simulator).tap();
    }
    /**
     * @summary Remove CGM
     */
    async RemoveCGM() {
        await _swipeSettingsScreenDown(SettingsLabel.Configuration);
        await _selectCGMSimulator();
        await match.accessible.Label(SettingsLabel.DeleteCGM).tap();
        await match.accessible.Label(SettingsLabel.DeleteCGM).atIndex(1).tap();
        // TODO: not reccomended
        // await waitFor(match.accessible.Label(SettingsLabel.AddCGM)).toExist().withTimeout(2000);
    }
    /**
     * @summary Remove CGM Data
     */
    async RemoveCGMData() {
        await _swipeSettingsScreenUp(SettingsLabel.DeleteCGMData);
        //TODO static text and not a button?
        await match.accessible.Label(SettingsLabel.DeleteCGMData).atIndex(0).tap();
        await match.accessible.Label(SettingsLabel.DeleteCGMData).atIndex(1).tap();
    }
    /**
     * @summary add Pump Simulator
     */
    async AddPumpSimulator() {
        try {
            await this.AddPumpLabel().atIndex(1).tap();
        } catch (err) {
            await this.AddPumpLabel().atIndex(0).tap();
        }
        await match.accessible.Button(SettingsLabel.Simulator).tap();
        await match.accessible.Button(Label.Continue).tap();
    }
    /**
     * @summary Remove Pump
     */
    async RemovePump() {
        await _swipeSettingsScreenDown(SettingsLabel.Pump);
        await _selectPumpSimulator();
        //TODO static text and not a button?
        await match.accessible.Label(SettingsLabel.DeletePump).tap();
        await match.accessible.Label(SettingsLabel.DeletePump).atIndex(1).tap();
        // TODO: not reccomended
        // await waitFor(match.accessible.Label(SettingsLabel.AddPump)).toExist().withTimeout(2000);
    }
    /**
     * @summary Remove Pump Data
     */
    async RemovePumpData() {
        await _swipeSettingsScreenUp(SettingsLabel.DeletePumpData);
        //TODO static text and not a button?
        await match.accessible.Label(SettingsLabel.DeletePumpData).atIndex(0).tap();
        await match.accessible.Label(SettingsLabel.DeletePumpData).atIndex(1).tap();
    }
    /**
     * @summary set the cgm simulator effect
     * @param {object} settings
     * @param {CGMEffect} settings.effect
     * @param {object} settings.modelData
     * @param {CGMModel} settings.modelData.model
     * @param {Array} settings.modelData.bgValues
     * @param {string} settings.backfillHours
     */
    async SetCGMSimulatorSettings(settings) {
        if (settings) {
            await _swipeSettingsScreenDown(SettingsLabel.Configuration);
            await _selectCGMSimulator();
            if (settings.effect) {
                await _setCGMEffect(settings.effect);
            }
            if (settings.modelData) {
                await _setCGMModel(settings.modelData);
            }
            if (settings.backfillHours) {
                await _setCGMBackfill(settings.backfillHours)
            }
            //TODO: multiple done buttons
            await this.DoneButton().atIndex(0).tap();
        }
    }
}

module.exports = {
    SettingsScreen,
    FilterSettings,
    SettingDefault,
    SettingType,
    InsulinModel,
    CGMModel,
    CGMEffect
};
