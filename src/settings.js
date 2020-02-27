const element = require('detox').element;
const match = require('./match');
const cgm = require('./cgm');

async function goToSettingsScreen() {
    await match.accessible.ButtonBarButton('Settings').tap();
    await waitFor(match.accessible.Header('Settings')).toExist().withTimeout(2000);
}

async function exitCurrentSetting() {
    await match.accessible.BackButton('Settings').tap();
    await waitFor(match.accessible.Header('Settings')).toExist().withTimeout(2000);
}

async function returnToHomeScreen() {
    await match.accessible.ButtonBarButton('Done').tap();
}

async function swipeSettingsScreenDown() {
    await match.accessible.HeaderLabel('SERVICES').swipe('down', 'fast');
    await waitFor(match.accessible.HeaderLabel('PUMP')).toExist().withTimeout(2000);
}

async function swipeSettingsScreenUp() {
    await match.accessible.HeaderLabel('CONFIGURATION').swipe('up', 'fast');
    await waitFor(match.accessible.HeaderLabel('SERVICES')).toExist().withTimeout(2000);
}

/**
 * @summary the assumption is that we always start from the home screen and then return to the home screen
 */
let startedFromHomeScreen = true;

const settings = {
    /**
     * @param {string} bgValue
     * @example await settings.CGMSimulatorConstantBloodGlugose('112');
     */
    async CGMSimulatorConstantBloodGlugose(bgValue) {
        await cgm.ApplyModel(cgm.Model.Constant, [bgValue]);
    },
    /**
     * @summary insulin activity model
     * @example settings.InsulinModel.Fiasp
     */
    InsulinModel: {
        Walsh: { value: 0, name: 'Walsh' },
        RapidAdults: { value: 1, name: 'Rapid-Acting – Adults' },
        RapidChildren: { value: 2, name: 'Rapid-Acting – Children' },
        Fiasp: { value: 3, name: 'Fiasp' },
        NotSet: { value: 4, name: '' }
    },
    /**
     * @summary basal rates to be set. NOTE: it is assumed that the rates are given in order of time
     * @param {Array} rates [{time:'12:00 AM', unitsPerHour:'0.1'}]
     * @example await settings.BasalRates([{time:'12:00 AM', unitsPerHour:'0.1'},{time:'12:30 AM', unitsPerHour:'0.3'}])
     */
    async BasalRates(rates) {
        if (rates) {
            console.log('applying BasalRates');
            const unitsSuffix = 'U/hr';
            if (startedFromHomeScreen) {
                await goToSettingsScreen();
            }
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
            await exitCurrentSetting();

            if (startedFromHomeScreen) {
                await returnToHomeScreen();
            }
        }
    },
    /**
     * @name settings.SuspendThreshold
     * @summary set the suspend threshold in mg/dL
     * @param {object} threshold e.g. '150'
     * @example await settings.SuspendThreshold({value:150});
     */
    async SuspendThreshold(threshold) {
        if (threshold) {
            if (startedFromHomeScreen) {
                await goToSettingsScreen();
            }

            await match.accessible.Text('Suspend Threshold').tap();
            await match.UIEditableTextField().typeText(threshold.value);
            await expect(match.UIEditableTextField()).toHaveText(threshold.value);
            await exitCurrentSetting();

            if (startedFromHomeScreen) {
                await returnToHomeScreen();
            }
        }
    },
    /**
     * @param {object} { maxBasalRate string, maxBolus string }
     * @example await settings.DeliveryLimits({maxBasalRate:'1.0', maxBolus:'10.0'})
     */
    async DeliveryLimits(limits) {
        if (limits) {
            if (startedFromHomeScreen) {
                await goToSettingsScreen();
            }

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
            await exitCurrentSetting();

            if (startedFromHomeScreen) {
                await returnToHomeScreen();
            }
        }
    },
    /**
     * @param {InsulinModel} model e.g. 'Walsh'
     * @example await settings.ApplyInsulinModel(settings.InsulinModel.Fiasp)
     */
    async ApplyInsulinModel(model) {
        if (model) {
            if (startedFromHomeScreen) {
                await goToSettingsScreen();
            }

            await match.accessible.Text('Insulin Model').tap();
            await match.accessible.Text(model.name).tap();
            await exitCurrentSetting();

            if (startedFromHomeScreen) {
                await returnToHomeScreen();
            }
        }
    },
    /**
    * @summary ratios be set. NOTE: it is assumed that the ratios are given in order of time
    * @param {Array} ratios [{time:'12:00 AM', carbGramsPerInsulinUnit:'8'}]
    * @example await settings.CarbRatios([{time:'12:00 AM', carbGramsPerInsulinUnit:'8'},{time:'12:30 AM', carbGramsPerInsulinUnit:'7'}])
    */
    async CarbRatios(ratios) {
        if (ratios) {
            if (startedFromHomeScreen) {
                await goToSettingsScreen();
            }
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
            await exitCurrentSetting();
            if (startedFromHomeScreen) {
                await returnToHomeScreen();
            }
        }
    },
    /**
    * @summary Sensitivities be set. NOTE: it is assumed that the Sensitivities are given in order of time
    * @param {Array} sensitivities [{time:'12:00 AM', bgValuePerInsulinUnit:'500'}]
    * @example await settings.InsulinSensitivities([{time:'12:00 AM', bgValuePerInsulinUnit:'500'},{time:'12:30 AM', bgValuePerInsulinUnit:'499'}])
    */
    async InsulinSensitivities(sensitivities) {
        if (sensitivities) {
            if (startedFromHomeScreen) {
                await goToSettingsScreen();
            }
            await swipeSettingsScreenUp();

            const unitsSuffix = 'mg/dL/U';
            await match.accessible.Label('Insulin Sensitivities').atIndex(1).tap();
            for (let index = 0; index < sensitivities.length; index++) {
                const sensitivity = sensitivities[index];
                await match.accessible.ButtonBarButton('Add').tap();
                await match.accessible.Label(`${sensitivity.bgValuePerInsulinUnit} ${unitsSuffix}`).atIndex(1).tap();
            }
            await match.accessible.Label('Save').tap();
            await exitCurrentSetting();
            if (startedFromHomeScreen) {
                await returnToHomeScreen();
            } else {
                await swipeSettingsScreenDown();
            }
        }
    },
    /**
     * @summary correct ranges to be set. NOTE: it is assumed that the ranges are given in order of time
     * @param {object} ranges e.g. [{ time: '12:00 AM', min: '80', max: '150' }];
     * @example await settings.CorrectionRanges([{ time: '12:00 AM', min: '80', max: '150' },{ time: '12:30 AM', min: '80', max: '130' }])
     */
    async CorrectionRanges(ranges) {
        if (ranges) {

            if (startedFromHomeScreen) {
                await goToSettingsScreen();
            }
            const correctionRangePickerColumns = {
                Time: 1,
                MinimumValue: 2,
                Separator: 3,
                MaximumValue: 4,
                Units: 5,
            };
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
            await exitCurrentSetting();
            if (startedFromHomeScreen) {
                await returnToHomeScreen();
            }
        }
    },
    /**
     * @param {object} override e.g. { min: '80', max: '150' };
     * @example await settings.PreMealCorrectionRange({ min: '80', max: '150' })
     */
    async PreMealCorrectionRange(preMeal) {
        if (preMeal) {
            if (startedFromHomeScreen) {
                await goToSettingsScreen();
            }
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
            await exitCurrentSetting();
            if (startedFromHomeScreen) {
                await returnToHomeScreen();
            }
        }
    },
    /**
     * @name settings.ClosedLoop
     * @summary turn on closed loop mode
     */
    async ClosedLoop() {
        if (startedFromHomeScreen) {
            await goToSettingsScreen();
        }
        await match.accessible.Button('Closed Loop').tap();
        //NOTE: not elegant but try catch approach is used by others in detox tests
        try {
            await expect(match.accessible.Button('Closed Loop')).toHaveValue('1');
        } catch (err) {
            await match.accessible.Button('Closed Loop').tap();
            await expect(match.accessible.Button('Closed Loop')).toHaveValue('1');
        }
        if (startedFromHomeScreen) {
            await returnToHomeScreen();
        }
    },
    /**
     * @name settings.OpenLoop
     * @summary set to open loop mode
     */
    async OpenLoop() {
        if (startedFromHomeScreen) {
            await goToSettingsScreen();
        }
        await match.accessible.Button('Closed Loop').tap();
        //NOTE: not elegant but try catch approach is used by others in detox tests
        try {
            await expect(match.accessible.Button('Closed Loop')).toHaveValue('0');
        } catch (err) {
            await match.accessible.Button('Closed Loop').tap();
            await expect(match.accessible.Button('Closed Loop')).toHaveValue('0');
        }
        if (startedFromHomeScreen) {
            await returnToHomeScreen();
        }
    },
    /**
     * @summary add CGM Simulator
     */
    async CGMSimulator() {
        if (startedFromHomeScreen) {
            await goToSettingsScreen();
        }
        await match.accessible.UILabel('Add CGM').tap();
        await match.accessible.Button('Simulator').tap();
        if (startedFromHomeScreen) {
            await returnToHomeScreen();
        }
    },
    /**
     * @summary add Pump Simulator
     */
    async PumpSimulator() {
        if (startedFromHomeScreen) {
            await goToSettingsScreen();
        }
        await match.accessible.UILabel('Add Pump').atIndex(0).tap();
        await match.accessible.Button('Simulator').tap();
        await match.accessible.Button('Continue').tap();
        if (startedFromHomeScreen) {
            await returnToHomeScreen();
        }
    },
    /**
     * @summary Defaults that can be used to apply to all settings
     * @example await settings.Apply(settings.Defaults)
     */
    Defaults: {
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
         * @summary ApplyInsulinModel: { value: 2, name: 'Rapid-Acting – Children' }
         */
        ApplyInsulinModel: { value: 2, name: 'Rapid-Acting – Children' },
        /**
         * @summary CarbRatios: [{ time: '12:00 AM', carbGramsPerInsulinUnit: '8' }]
         */
        CarbRatios: [{ time: '12:00 AM', carbGramsPerInsulinUnit: '8' }],
        /**
         * @summary InsulinSensitivities: [{ time: '12:00 AM', bgValuePerInsulinUnit: '500' }]
         */
        InsulinSensitivities: [{ time: '12:00 AM', bgValuePerInsulinUnit: '500' }],
        /**
         * @summary  CorrectionRanges: [{ time: '12:00 AM', min: '179', max: '180' }]
         */
        CorrectionRanges: [{ time: '12:00 AM', min: '179', max: '180' }],
        /**
         * @summary  PreMealCorrectionRange: { min: '179', max: '180' }
         */
        PreMealCorrectionRange: { min: '179', max: '180' },
        /**
         *  @summary  ClosedLoop: true
         */
        ClosedLoop: true,
        /**
         *  @summary  CGMSimulator: true
         */
        CGMSimulator: true,
        /**
         *  @summary  PumpSimulator: true
         */
        PumpSimulator: true,
    },
    Type: {
        BasalRates: 'BasalRates',
        CarbRatios: 'CarbRatios',
        DeliveryLimits: 'DeliveryLimits',
        InsulinModel: 'ApplyInsulinModel',
        SuspendThreshold: 'SuspendThreshold',
        InsulinSensitivities: 'InsulinSensitivities',
        CorrectionRanges: 'CorrectionRanges',
        PreMealCorrectionRange: 'PreMealCorrectionRange',
        ClosedLoop: 'ClosedLoop',
        PumpSimulator: 'PumpSimulator',
        CGMSimulator: 'CGMSimulator',
    },
    /**
     * @summary filter out settings defaults for those that you don't want to apply
     * @param {object} values
     * @param {Array} types
     * @example settings.Filter(settings.Defaults, [settings.Types.BasalRates])
     * @returns filtered Defaults set
     */
    Filter(values, types) {
        const filtered = values;
        if (types) {
            for (const type of types) {
                delete filtered[type];
            }
        }
        return filtered;
    },
    /**
     * @summary helper function to set seetings by applying the {settings.Defaults}
     * @param  {Defaults} values list of settings that will not be applied
     * @example await settings.Apply(settings.Defaults)
     */
    async Apply(values) {
        startedFromHomeScreen = false;
        await goToSettingsScreen();
        await this.BasalRates(values.BasalRates);
        await this.DeliveryLimits(values.DeliveryLimits);
        await this.SuspendThreshold(values.SuspendThreshold);
        await this.ApplyInsulinModel(values.ApplyInsulinModel);
        await this.CarbRatios(values.CarbRatios);
        await this.InsulinSensitivities(values.InsulinSensitivities);
        await this.CorrectionRanges(values.CorrectionRanges);
        if (values.ClosedLoop) {
            await this.ClosedLoop();
        } else {
            await this.OpenLoop();
        }
        startedFromHomeScreen = true;
        await returnToHomeScreen();
    },
};

module.exports = settings;