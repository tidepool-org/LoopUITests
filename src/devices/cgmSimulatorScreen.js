const match = require('../match');
const action = require('../action');
const base = require('../base/index');

class CGMSimulatorScreen extends base.Screen {
    constructor(language) {
        super({
            screenText: language.device.CGMSimulatorScreen,
            generalText: language.general,
            header: {
                backLabel: language.general.Done,
            },
        });
    }
    get _cgmSettingsButton() {
        return match.accessible.ButtonBarButton(this.screenText.Header);
    }
    get _modelHeader() {
        return match.accessible.Header(this.screenText.Model.Header);
    }
    get _measurementFrequencyLabel() {
        return match.Label(this.screenText.Frequency.MeasurementFrequency);
    }
    get _sineCurveModelLabel() {
        return match.accessible.Button(this.screenText.Model.SineCurve).atIndex(0);
    }
    get _noDataModelLabel() {
        return match.Label(this.screenText.Model.None).atIndex(0);
    }
    get _signalLossModelLabel() {
        return match.Label(this.screenText.Model.SignalLoss);
    }
    get _constantModelLabel() {
        return match.Label(this.screenText.Model.Constant);
    }
    get _effectsHeader() {
        return match.accessible.Header(this.screenText.Effect.Header);
    }
    get _randomErrorEffectLabel() {
        return match.accessible.Button(this.screenText.Effect.RandomError);
    }
    get _glucoseNoiseEffectLabel() {
        return match.accessible.Button(this.screenText.Effect.GlucoseNoise);
    }
    get _randomHighOutlierEffectLabel() {
        return match.accessible.Button(this.screenText.Effect.RandomHighOutlier);
    }
    get _randomLowOutlierEffectLabel() {
        return match.accessible.Button(this.screenText.Effect.RandomLowOutlier);
    }
    get _backfillGlucoseHistoryLabel() {
        return match.Label(this.screenText.History.BackfillGlucose);
    }
    get _trendHistoryLabel() {
        return match.accessible.Button(this.screenText.History.Trend).atIndex(0);
    }
    get _historyHeader() {
        return match.accessible.Header(this.screenText.History.Header);
    }
    get _alertsHeader() {
        return match.accessible.Header(this.screenText.Alerts.Header);
    }
    get _issueAlertsLabel() {
        return match.Label(this.screenText.Alerts.IssueAlerts);
    }
    get _deleteCGMLabel() {
        return match.Label(this.screenText.DeleteCGM);
    }
    get _deleteCGMConfirmationLabel() {
        return match.accessible.AlertButton(this.screenText.DeleteCGM);
    }
    get _backfillSaveAndCloseButton() {
        return match.accessible.ButtonBarButton(this.generalText.Save);
    }
    get DoneButton() {
        return match.accessible.ButtonBarButton(this.generalText.Done);
    }
    /**
     * @param {object} settings
     * @param {object} settings.effect
     * @param {number} settings.effect.glucoseNoiseValue
     * @param {number} settings.effect.randomErrorPercent
     * @param {object} settings.frequency
     * @param {boolean} settings.frequency.minutes
     * @param {boolean} settings.frequency.seconds
     * @param {object} settings.model
     * @param {string} settings.model.name
     * @param {array} settings.model.bgValues
     * @param {object} settings.history
     * @param {string} settings.history.name
     * @param {number} settings.history.backfillHours required if name is 'Backfill Glucose'
     * @param {string} settings.history.trendName required if name is 'Backfill Glucose'
     * @param {object} settings.alert
     * @param {string} settings.alert.name
     */
    async Apply(settings) {
        await this._setFrequency(settings.frequency);
        await this._setEffect(settings.effect);
        await this._setModel(settings.model);
        await this._setAlerts(settings.alert);
        //last as we have to 'Save' which will close the screen
        await this._setHistory(settings.history);
    }
    async _setEffect(effect) {
        if (effect == null) {
            return;
        }
        if (effect.glucoseNoiseValue) {
            await this._glucoseNoiseEffectLabel.tap();
            var noiseField = match.UIEditableTextField();
            await noiseField.clearText();
            await noiseField.typeText(String(effect.glucoseNoiseValue));
            await match.accessible.ButtonBarButton(this.generalText.Back).tap();
        }
        if (effect.randomErrorPercent) {
            await this._randomErrorEffectLabel.tap();
            var randomField = match.UIEditableTextField();
            await randomField.clearText();
            await randomField.typeText(String(effect.randomErrorPercent));
            await match.accessible.ButtonBarButton(this.generalText.Back).tap();
        }
    }
    async _setModel(model) {
        if (model == null) {
            return;
        }
        let modelText = this.screenText.Model;
        if (model.name === modelText.Constant) {
            await this._constantModelLabel.tap();
            var constantField = match.UIEditableTextField();
            await constantField.clearText();
            await constantField.typeText(String(model.bgValues[0]));
            await this._cgmSettingsButton.tap();
        }
        if (model.name === modelText.SineCurve) {
            await this._sineCurveModelLabel.tap();
            await match.accessible.ClickableLabel(this.screenText.BaseGlucose).tap();
            var baseGlucoseField = match.UIEditableTextField();
            await baseGlucoseField.clearText();
            await baseGlucoseField.typeText(String(model.bgValues[0]));
            await match.accessible.ButtonBarButton(modelText.SineCurve).tap();
            await match.accessible.ClickableLabel(this.screenText.Amplitude).tap();
            var amplitudeField = match.UIEditableTextField();
            await amplitudeField.clearText();
            await amplitudeField.typeText(String(model.bgValues[1]));
            await match.accessible.ButtonBarButton(modelText.SineCurve).tap();
            await this._cgmSettingsButton.tap();
        }
        if (model.name === modelText.None) {
            await this._noDataModelLabel.tap();
        }
        if (model.name === modelText.SignalLoss) {
            await this._signalLossModelLabel.tap();
        }
    }
    async _setFrequency(frequency) {
        if (frequency == null) {
            return;
        }
        let frequencyText = this.screenText.Frequency;
        await this._measurementFrequencyLabel.tap();
        if (frequency.minutes) {
            await match.Label(frequencyText.Minutes).tap();
        } else if (frequency.seconds) {
            await match.Label(frequencyText.Seconds).tap();
        }
        await match.accessible.ButtonBarButton(this.generalText.Back).tap();
    }
    async _setHistory(history) {
        if (history == null) {
            return;
        }
        let historyText = this.screenText.History;
        await this.SwipeUpUntilVisible(this._backfillGlucoseHistoryLabel);
        if (history.name === historyText.BackfillGlucose) {
            await this._backfillGlucoseHistoryLabel.tap();
            await action.SetDatePicker(`${history.backfillHours} ${historyText.Hours}`);
            await this._backfillSaveAndCloseButton.tap();
        }
        if (history.name === historyText.Trend) {
            await this._trendHistoryLabel.tap();
            await match.Label(history.trend).tap();
            await this.SwipeDownUntilVisible(this._modelHeader);
        }
    }
    async _setAlerts(alert) {
        if (alert == null) {
            return;
        }
        let alertText = this.screenText.Alerts;
        await this.SwipeUpUntilVisible(this._issueAlertsLabel);
        await this._issueAlertsLabel.tap();
        await match.Label(alert.name).tap();
    }
    async RemoveSimulator() {
        await this.SwipeUpUntilVisible(this._deleteCGMLabel);
        await this._deleteCGMLabel.tap();
        await this._deleteCGMConfirmationLabel.tap();
    }
}

module.exports = CGMSimulatorScreen;
