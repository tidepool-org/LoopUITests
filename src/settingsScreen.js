const element = require('detox').element;
const match = require('./match');
const config = require('./config');

const { setting } = require('./properties');

class CGMSimulatorScreen {
    constructor(language) {
        this.language = language;
    }
    async Close() {
        if (this.needsClosing) {
            await this.DoneButton().atIndex(0).tap();
        }
    }
    async Apply(settings) {
        if (settings.effect) {
            await this._setCGMEffect(settings.effect);
        }
        if (settings.modelData) {
            await this._setCGMModel(settings.modelData);
        }
        if (settings.backfillHours) {
            await this._setCGMBackfill(settings.backfillHours);
        }
    }
    async _setCGMEffect(effect) {
        await match.accessible.Label(effect).tap();
        switch (effect) {
            case setting.cgmEffect.GlucoseNoise:
                await match.UIEditableTextField().clearText();
                await match.UIEditableTextField().typeText('100');
                await match.accessible.ButtonBarButton(this.language.general.Back).tap();
                break;
            case setting.cgmEffect.RandomError:
                await match.UIEditableTextField().clearText();
                await match.UIEditableTextField().typeText('10');
                await match.accessible.ButtonBarButton(this.language.general.Back).tap();
                break;
            default:
                break;
        }
    }
    async _setCGMModel(modelData) {
        if (modelData) {
            await match.accessible.Label(modelData.model).tap();
            switch (modelData.model) {
                case setting.cgmModel.Constant:
                    await match.UIEditableTextField().clearText();
                    await match.UIEditableTextField().typeText(modelData.bgValues[0]);
                    await match.accessible.BackButton(this.language.cgmSimulatorSettingsScreen.CGMSettings).tap();
                    break;
                case setting.cgmModel.SineCurve:
                    await match.accessible.Label(this.language.cgmSimulatorSettingsScreen.BaseGlucose).tap();
                    await match.UIEditableTextField().clearText();
                    await match.UIEditableTextField().typeText(modelData.bgValues[0]);
                    await match.accessible.BackButton(this.language.cgmSimulatorSettingsScreen.SineCurve).tap();
                    await match.accessible.Label(this.language.cgmSimulatorSettingsScreen.Amplitude).tap();
                    await match.UIEditableTextField().clearText();
                    await match.UIEditableTextField().typeText(modelData.bgValues[1]);
                    await match.accessible.BackButton(this.language.cgmSimulatorSettingsScreen.SineCurve).tap();
                    await match.accessible.BackButton(this.language.cgmSimulatorSettingsScreen.CGMSettings).tap();
                    break;
                default:
                    break;
            }
        }
    }
    async _setCGMBackfill(hours) {
        this.needsClosing = false;
        await match.accessible.Label(this.language.cgmSimulatorSettingsScreen.BackfillGlucose).tap();
        await match.accessible.SetPickerValue(0, `${hours}`);
        await match.accessible.ButtonBarButton(this.language.general.Save).tap();
    }
    async RemoveSimulator() {
        this.needsClosing = false;
        await match.accessible.Label(this.language.settingsScreen.DeleteCGM).tap();
        await match.accessible.Label(this.language.settingsScreen.DeleteCGM).atIndex(1).tap();
    }
}

class BasalRatesScreen {
    constructor(language) {
        this.language = language;
    }
    BasalRatesHeader() {
        return match.accessible.Header(this.language.settingsScreen.BasalRates);
    }
    async Close() {
        await match.accessible.BackButton(this.language.settingsScreen.Settings).tap();
    }
    /**
     * @summary basal rate to be set. NOTE: it is assumed that the rates are given in order of time
    * @param {Object} rate
     * @param {String} rate.time
     * @param {String} rate.unitsPerHour
     */
    async Apply(rate) {
        if (rate) {
            await match.accessible.ButtonBarButton(this.language.general.Add).tap();
            await match.accessible.Label(`${rate.time}`).atIndex(0).tap();
            await match.accessible.SetPickerValue(1, `${rate.unitsPerHour} ${config.basalRatesUnits}`);
        }
    }

    /**
     * @summary basal rates to be set. NOTE: it is assumed that the rates are given in order of time
     * @param {Array} rates [{time:'12:00 AM', unitsPerHour:'0.1'}]
     */
    async ApplyAll(rates) {
        if (rates) {
            for (let index = 0; index < rates.length; index++) {
                await this.Apply(rates[index]);
            }
        }
    }
    /**
     * @summary basal rate to be set {time:'12:00 AM', unitsPerHour:'0.1'}
     * @param {Object} rate
     * @param {String} rate.time
     * @param {String} rate.unitsPerHour
     */
    async Edit(rate) {
        if (rate) {
            await match.accessible.Label(`${rate.time}`).atIndex(0).tap();
            await match.accessible.SetPickerValue(1, `${rate.unitsPerHour} ${config.basalRatesUnits}`);
        }
    }
    async Save() {
        await match.accessible.Label(this.language.settingsScreen.SaveToSimulator).tap();
    }
}

class DeliveryLimitsScreen {
    constructor(language) {
        this.language = language;
    }
    DeliveryLimitsHeader() {
        return match.accessible.Header(this.language.settingsScreen.DeliveryLimits);
    }
    async Close() {
        await match.accessible.BackButton(this.language.settingsScreen.Settings).tap();
    }
    async Save() {
        await match.accessible.Label(this.language.settingsScreen.SaveToSimulator).tap();
    }
    async Apply(limits) {
        await match.UIEditableTextField().atIndex(0).clearText();
        await match.UIEditableTextField().atIndex(0).typeText(String(limits.maxBasalRate));
        await match.UIEditableTextField().atIndex(0).tapReturnKey();
        await expect(match.UIEditableTextField().atIndex(0)).toHaveText(String(limits.maxBasalRate));
        await match.UIEditableTextField().atIndex(1).clearText();
        await match.UIEditableTextField().atIndex(1).typeText(String(limits.maxBolus));
        await match.UIEditableTextField().atIndex(1).tapReturnKey();
        await expect(match.UIEditableTextField().atIndex(1)).toHaveText(String(limits.maxBolus));
    }
    async ApplyWithExpectations(limits, additionalExpectations) {
        await this.Apply(limits);
        if (additionalExpectations) {
            await additionalExpectations();
        }
    }
}

class InsulinSensitivitiesScreen {
    constructor(language) {
        this.language = language;
    }
    InsulinSensitivitiesHeader() {
        return match.accessible.Header(this.language.settingsScreen.InsulinSensitivities);
    }
    async Cancel() {
        await match.accessible.ButtonBarButton(this.language.general.Cancel).tap();
    }
    async Save() {
        await match.accessible.Label(this.language.general.Save).tap();
    }
    async ApplyAll(sensitivities) {
        if (sensitivities) {
            for (let index = 0; index < sensitivities.length; index++) {
                await this.Apply(sensitivities[index]);
            }
        }
    }
    /**
     * @param {Object} sensitivity
     * @param {String} sensitivity.time
     * @param {String} sensitivity.bgValuePerInsulinUnit
     */
    async Apply(sensitivity) {
        await match.accessible.ButtonBarButton(this.language.general.Add).tap();
        //select time unless this is the first Insulin Sensitivitiy we have set...
        if (sensitivity.time != "12:00 AM") {
            await match.accessible.Label(`${sensitivity.time}`).atIndex(0).tap();
        }
        await match.accessible.SetPickerValue(1, `${sensitivity.bgValuePerInsulinUnit} ${config.insulinSensitivitiesUnits}`);
    }
    /**
     * @param {Object} sensitivity
     * @param {String} sensitivity.time
     * @param {String} sensitivity.bgValuePerInsulinUnit
     */
    async Edit(sensitivity) {
        await match.accessible.Label(`${sensitivity.time}`).atIndex(0).tap();
        await match.accessible.SetPickerValue(1, `${sensitivity.bgValuePerInsulinUnit} ${config.insulinSensitivitiesUnits}`);
    }
}

class CorrectionRangeScreen {
    pickerIndexForTime(time) {
        switch (time) {
            case '12:00 AM':
                return 0;
            case '12:30 AM':
                return 1;
            case '1:00 AM':
                return 2;
            case '1:30 AM':
                return 3;
            case '2:00 AM':
                return 4;
            case '2:30 AM':
                return 6;
            default:
                return 0;
        }
    }
    constructor(language) {
        this.language = language;
    }
    CorrectionRangeHeader() {
        return match.accessible.Header(this.language.settingsScreen.CorrectionRange);
    }
    async Close() {
        await match.accessible.BackButton(this.language.settingsScreen.Settings).tap();
    }
    async Save() {
        await match.accessible.Label(this.language.general.Save).tap();
    }
    async Cancel() {
        await match.accessible.ButtonBarButton(this.language.general.Cancel).tap();
    }
    async ApplyAll(ranges) {
        for (let index = 0; index < ranges.length; index++) {
            await this.Apply(ranges[index]);
        }
    }
    /**
     * @param {Object} range
     * @param {String} range.time
     * @param {String} range.max
     * @param {String} range.min
     */
    async Apply(range) {
        let pickerIndex = this.pickerIndexForTime(range.time);
        await match.accessible.ButtonBarButton(this.language.general.Add).tap();
        await match.accessible.Label(`${range.time}`).atIndex(pickerIndex).tap();
        let currentMax = config.correctionRangesMaximum;
        do {
            await match.accessible.PickerItem(1, `${currentMax}`).tap();
            currentMax--;
        } while (currentMax >= range.max);

        let currentMin = range.max;
        do {
            if (currentMin == range.max) {
                await match.accessible.PickerItem(4, `${currentMin}`).tap();
            } else if (currentMin == (range.max - 1)) {
                await match.accessible.PickerItem(2, `${currentMin}`).tap();
            } else {
                await match.accessible.PickerItem(1, `${currentMin}`).tap();
            }
            currentMin--;
        } while (currentMin >= range.min);
    }
}

class CarbRatiosScreen {
    constructor(language) {
        this.language = language;
    }
    CarbRatiosHeader() {
        return match.accessible.Header(this.language.settingsScreen.CarbRatios);
    }
    async Close() {
        await match.accessible.BackButton(this.language.settingsScreen.Settings).tap();
    }
    async Cancel() {
        await match.accessible.ButtonBarButton(this.language.general.Cancel).tap();
    }
    async ApplyAll(ratios) {
        if (ratios) {
            for (let index = 0; index < ratios.length; index++) {
                await this.Apply(ratios[index], index);
            }
        }
    }
    async Apply(ratio, index) {
        if (ratio) {
            await match.accessible.ButtonBarButton(this.language.general.Add).tap();
            if (index == 0) {
                await element(by.type('UITextField')).clearText();
                await element(by.type('UITextField')).typeText(String(ratio.carbGramsPerInsulinUnit));
                await expect(element(by.type('UITextField'))).toHaveText(String(ratio.carbGramsPerInsulinUnit));
            } else {
                await element(by.type('UITextField').atIndex(index)).clearText();
                await element(by.type('UITextField').atIndex(index)).typeText(String(ratio.carbGramsPerInsulinUnit));
                await expect(element(by.type('UITextField').atIndex(index))).toHaveText(String(ratio.carbGramsPerInsulinUnit));
            }
        }
    }
}

class SettingsScreen {
    startAndReturnToSettings() {
        return {
            fromSettings: true,
            toSettings: true,
        }
    }
    constructor(language) {
        this.language = language;
        this.cgmSimulatorScreen = new CGMSimulatorScreen(language);
        this.basalRatesScreen = new BasalRatesScreen(language);
        this.deliveryLimitsScreen = new DeliveryLimitsScreen(language);
        this.insulinSensitivitiesScreen = new InsulinSensitivitiesScreen(language);
        this.correctionRangeScreen = new CorrectionRangeScreen(language);
        this.carbRatiosScreen = new CarbRatiosScreen(language);
    }
    async _exitSetting() {
        await match.accessible.BackButton(this.language.settingsScreen.Settings).tap();
    }
    async _selectPumpSimulator() {
        await match.accessible.Id('Simulator Small').tap();
    }
    async Open() {
        await match.accessible.ButtonBarButton(this.language.settingsScreen.Settings).tap();
    }
    async Close() {
        await this.DoneButton().tap();
    }
    async OpenBasalRatesScreen() {
        await this.BasalRatesLabel().tap();
        return this.basalRatesScreen;
    }
    async OpenCGMSimulatorScreen() {
        await this.ScrollToTop();
        await this.CGMSimulatorLabel().tap();
        return this.cgmSimulatorScreen;
    }
    async OpenDeliveryLimitsScreen() {
        try {
            await this.DeliveryLimitsLabel().tap();
        } catch (error) {
            //sometimes there are multiples?
            await this.DeliveryLimitsLabel().atIndex(1).tap();
        }
        return this.deliveryLimitsScreen;
    }
    async OpenInsulinSensitivitiesScreen() {
        await this.ScrollToBottom();
        await this.InsulinSensitivitiesLabel().atIndex(1).tap();
        return this.insulinSensitivitiesScreen;
    }
    async OpenCorrectionRangeScreen() {
        await this.ScrollToTop();
        try {
            await this.CorrectionRangeLabel().tap();
        } catch (error) {
            await this.CorrectionRangeLabel().atIndex(0).tap();
        }
        return this.correctionRangeScreen;
    }
    async OpenCarbRatiosScreen() {
        await this.CarbRatiosLabel().tap();
        return this.carbRatiosScreen;
    }
    DoneButton() {
        return match.accessible.ButtonBarButton(this.language.general.Done);
    }
    ConfigurationHeader() {
        return match.accessible.Header(this.language.settingsScreen.Configuration);
    }
    ServicesHeader() {
        return match.accessible.Header(this.language.settingsScreen.Services);
    }
    PumpHeader() {
        return match.accessible.Header(this.language.settingsScreen.Pump);
    }
    ContinuousGlucoseMonitorHeader() {
        return match.accessible.Header(this.language.settingsScreen.ContinuousGlucoseMonitor);
    }
    SettingsHeader() {
        return match.accessible.Header(this.language.settingsScreen.Settings);
    }
    BasalRatesLabel() {
        return match.accessible.Label(this.language.settingsScreen.BasalRates)
    }
    SuspendThresholdLabel() {
        return match.accessible.Label(this.language.settingsScreen.SuspendThreshold)
    }
    DeliveryLimitsLabel() {
        return match.accessible.Label(this.language.settingsScreen.DeliveryLimits)
    }
    InsulinModelLabel() {
        return match.accessible.Label(this.language.settingsScreen.InsulinModel)
    }
    CarbRatiosLabel() {
        return match.accessible.Label(this.language.settingsScreen.CarbRatios)
    }
    InsulinSensitivitiesLabel() {
        return match.accessible.Label(this.language.settingsScreen.InsulinSensitivities)
    }
    CorrectionRangeLabel() {
        return match.accessible.Label(this.language.settingsScreen.CorrectionRange);
    }
    ClosedLoopButton() {
        return match.accessible.Button(this.language.settingsScreen.ClosedLoop);
    }
    IssueReportLabel() {
        return match.accessible.Label(this.language.settingsScreen.IssueReport);
    }
    AddPumpLabel() {
        return match.accessible.Label(this.language.settingsScreen.AddPump);
    }
    AddCGMLabel() {
        return match.accessible.Label(this.language.settingsScreen.AddCGM);
    }
    CGMSimulatorLabel() {
        try {
            return match.accessible.Label(this.language.settingsScreen.Simulator).atIndex(1);
        } catch (err) {
            try {
                return match.accessible.Label(this.language.settingsScreen.Simulator).atIndex(0);
            } catch (err2) {
                return match.accessible.Label(this.language.settingsScreen.Simulator).atIndex(2);
            }
        }
    }
    async ScrollToBottom() {
        try {
            await expect(match.accessible.Label(this.language.settingsScreen.Services)).toBeVisible();
        } catch (err) {
            await match.accessible.Header(this.language.settingsScreen.Configuration).swipe('up', 'fast');
            await expect(match.accessible.Label(this.language.settingsScreen.Services)).toBeVisible();
        }
    }
    async ScrollToTop() {
        try {
            await expect(match.accessible.Label(this.language.settingsScreen.Pump)).toBeVisible();
        } catch (err) {
            await match.accessible.Header(this.language.settingsScreen.Configuration).swipe('down', 'fast');
            await expect(match.accessible.Label(this.language.settingsScreen.Pump)).toBeVisible();
        }
    }
    /**
     * @summary helper function to set settings by applying configured values
     * @param  values list of settings that will not be applied
     */
    async Apply(values) {
        if (values.AddCGMSimulator) {
            await this.AddCGMSimulator();
        }
        if (values.AddPumpSimulator) {
            await this.AddPumpSimulator();
        }
        if (values.CGMSimulatorSettings) {
            let screen = this.OpenCGMSimulatorScreen();
            await screen.Apply(values.CGMSimulatorSettings);
            await screen.Close();
        }
        if (values.CorrectionRanges) {
            let screen = this.OpenCorrectionRangeScreen();
            await screen.ApplyAll(values.CorrectionRanges);
            await screen.Save();
            await screen.Close();
        }
        if (values.BasalRates) {
            let screen = this.OpenBasalRatesScreen();
            await screen.ApplyAll(values.BasalRates);
            await screen.Save();
            await screen.Close();
        }
        if (values.DeliveryLimits) {
            let screen = this.OpenDeliveryLimitsScreen();
            await screen.Apply(values.DeliveryLimits);
            await screen.Save();
            await screen.Close();
        }
        if (values.InsulinSensitivities) {
            let screen = this.OpenInsulinSensitivitiesScreen();
            await screen.ApplyAll(values.InsulinSensitivities);
            await screen.Save();
            await screen.Close();
        }
        if (values.CarbRatios) {
            let screen = this.OpenCarbRatiosScreen();
            await screen.ApplyAll(values.CarbRatios);
            await screen.Close();
        }

        await this.SetSuspendThreshold(values.SuspendThreshold);
        await this.SetInsulinModel(values.InsulinModel);

        if (values.ClosedLoop) {
            if (values.ClosedLoop == true) {
                await this.SetClosedLoop();
            } else if (values.ClosedLoop == false) {
                await this.SetOpenLoop();
            }
        }
    }
    /**
     * @summary set the suspend threshold in mg/dL
     * @param {Object} threshold e.g. '150'
     * @param {String} threshold.value
     */
    async SetSuspendThreshold(threshold) {
        if (threshold) {
            await this.SuspendThresholdLabel().tap();
            await match.accessible.Label('mg/dL').atIndex(0).tap();
            await match.accessible.SetPickerValue(0, `${threshold.value}`);
            await match.accessible.Button(this.language.general.Save).tap();
            await this._exitSetting();
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
            await this._exitSetting();
        }
    }
    /**
     * @summary correct ranges to be set. NOTE: it is assumed that the ranges are given in order of time
     * @param {Array} ranges e.g. [{ time: '12:00 AM', min: '80', max: '150' }];
     */
    async SetCorrectionRanges_v2(ranges) {
        const minimumColumn = 3;
        const maximumColumn = 1;
        if (ranges) {
            try {
                await this.CorrectionRangeLabel().tap();
            } catch (error) {
                await this.CorrectionRangeLabel().atIndex(0).tap();
            }
            await match.accessible.ButtonBarButton(this.language.general.Add).tap();
            for (let index = 0; index < ranges.length; index++) {
                const range = ranges[index];
                await match.accessible.Label(`${range.time}`).atIndex(0).tap();
                await match.accessible.SetPickerValue(maximumColumn, range.max);
                await match.accessible.SetPickerValue(minimumColumn, range.min);
            }
            await match.accessible.Label(this.language.general.Save).tap();
            await this._exitSetting();
        }
    }
    /**
     * @param {Object} preMeal e.g. { min: '80', max: '150' };
     * @param {string} preMeal.min - the minimum value
     * @param {string} preMeal.max - the maximum value
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
            await match.accessible.Label(this.language.general.Save).tap();
            await this._exitSetting();
        }
    }
    async SetClosedLoop() {
        await this.ScrollToTop();
        //NOTE: not elegant but try catch approach is used by others in detox tests
        try {
            await this.ClosedLoopButton().tap();
            await expect(this.ClosedLoopButton()).toHaveValue('1');
        } catch (err) {
            await expect(this.ClosedLoopButton()).toHaveValue('0');
            await this.ClosedLoopButton().tap();
            await expect(this.ClosedLoopButton()).toHaveValue('1');
        }
    }
    async SetOpenLoop() {
        await this.ScrollToTop();
        //NOTE: not elegant but try catch approach is used by others in detox tests
        try {
            await this.ClosedLoopButton().tap();
            await expect(this.ClosedLoopButton()).toHaveValue('0');
        } catch (err) {
            await expect(this.ClosedLoopButton()).toHaveValue('1');
            await this.ClosedLoopButton().tap();
            await expect(this.ClosedLoopButton()).toHaveValue('0');
        }
    }
    async IssueReport() {
        await this.IssueReportLabel().tap();
        await expect(match.accessible.Header(this.language.settingsScreen.IssueReport)).toBeVisible();
        await this._exitSetting();
    }
    async AddCGMSimulator() {
        await this.AddCGMLabel().tap();
        await match.accessible.Button(this.language.settingsScreen.Simulator).tap();
    }
    async RemoveCGM() {
        await this.ScrollToTop();
        await this.cgmSimulatorScreen.Open();
        await this.cgmSimulatorScreen.RemoveSimulator();
        await this.cgmSimulatorScreen.Close();
    }
    async RemoveCGMData() {
        await this.ScrollToBottom();
        //TODO static text and not a button?
        await match.accessible.Label(this.language.settingsScreen.DeleteCGMData).atIndex(0).tap();
        await match.accessible.Label(this.language.settingsScreen.DeleteCGMData).atIndex(1).tap();
    }
    async AddPumpSimulator() {
        try {
            await this.AddPumpLabel().atIndex(1).tap();
        } catch (err) {
            await this.AddPumpLabel().atIndex(0).tap();
        }
        await match.accessible.Button(this.language.settingsScreen.Simulator).tap();
        await match.accessible.Button(this.language.general.Continue).tap();
    }
    async RemovePump() {
        await this.ScrollToTop();
        await this._selectPumpSimulator();
        //TODO static text and not a button?
        await match.accessible.Label(this.language.settingsScreen.DeletePump).tap();
        await match.accessible.Label(this.language.settingsScreen.DeletePump).atIndex(1).tap();
    }
    async RemovePumpData() {
        await this.ScrollToBottom();
        //TODO static text and not a button?
        await match.accessible.Label(this.language.settingsScreen.DeletePumpData).atIndex(0).tap();
        await match.accessible.Label(this.language.settingsScreen.DeletePumpData).atIndex(1).tap();
    }
    async OpenIssueReport() {
        await this.IssueReportLabel().tap();
    }
    async CloseIssueReport() {
        await this._exitSetting();
    }
    async HasAlert() {
        await expect(match.accessible.Alert()).toExist();
    }
    async DismissAlert() {
        await match.accessible.AlertButton(this.language.general.OK).tap();
    }
}

module.exports = {
    SettingsScreen
};
