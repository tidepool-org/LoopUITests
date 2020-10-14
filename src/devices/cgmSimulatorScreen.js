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
    CGMSettingsButton() {
        return match.accessible.ButtonBarButton(this.screenText.Header);
    }
    async BackToCGMSettings() {
        return this.CGMSettingsButton().tap();
    }
    ModelHeader() {
        return match.accessible.Header(this.screenText.Model.Header);
    }
    MeasurementFrequencyLabel() {
        return match.accessible.ClickableLabel(this.screenText.Frequency.MeasurementFrequency);
    }
    SineCurveModelLabel() {
        return match.accessible.ClickableLabel(this.screenText.Model.SineCurve).atIndex(0);
    }
    NoDataModelLabel() {
        return match.accessible.ClickableLabel(this.screenText.Model.None).atIndex(0);
    }
    SignalLossModelLabel() {
        return match.accessible.ClickableLabel(this.screenText.Model.SignalLoss);
    }
    ConstantModelLabel() {
        return match.accessible.ClickableLabel(this.screenText.Model.Constant);
    }
    EffectsHeader() {
        return match.accessible.Header(this.screenText.Effect.Header);
    }
    RandomErrorEffectLabel() {
        return match.accessible.ClickableLabel(this.screenText.Effect.RandomError);
    }
    GlucoseNoiseEffectLabel() {
        return match.accessible.ClickableLabel(this.screenText.Effect.GlucoseNoise);
    }
    RandomHighOutlierEffectLabel() {
        return match.accessible.ClickableLabel(this.screenText.Effect.RandomHighOutlier);
    }
    RandomLowOutlierEffectLabel() {
        return match.accessible.ClickableLabel(this.screenText.Effect.RandomLowOutlier);
    }
    BackfillGlucoseHistoryLabel() {
        return match.accessible.ClickableLabel(this.screenText.History.BackfillGlucose);
    }
    TrendHistoryLabel() {
        return match.accessible.ClickableLabel(this.screenText.History.Trend).atIndex(0);
    }
    HistoryHeader() {
        return match.accessible.Header(this.screenText.History.Header);
    }
    AlertsHeader() {
        return match.accessible.Header(this.screenText.Alerts.Header);
    }
    IssueAlertsLabel() {
        return match.accessible.ClickableLabel(this.screenText.Alerts.IssueAlerts);
    }
    DeleteCGMLabel() {
        return match.accessible.ClickableLabel(this.screenText.DeleteCGM);
    }
    DeleteCGMConfirmationLabel() {
        return match.accessible.AlertButton(this.screenText.DeleteCGM);
    }
    async BackfillSaveAndClose() {
        await match.accessible.ButtonBarButton(this.generalText.Save).tap();
    }
    async AlertSaveAndClose() {
        await match.accessible.ButtonBarButton(this.generalText.Done).tap();
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
            await this.GlucoseNoiseEffectLabel().tap();
            var noiseField = match.UIEditableTextField();
            await noiseField.clearText();
            await noiseField.typeText(String(effect.glucoseNoiseValue));
            await match.accessible.ButtonBarButton(this.generalText.Back).tap();
        }
        if (effect.randomErrorPercent) {
            await this.RandomErrorEffectLabel().tap();
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
            await this.ConstantModelLabel().tap();
            var constantField = match.UIEditableTextField();
            await constantField.clearText();
            await constantField.typeText(String(model.bgValues[0]));
            await this.BackToCGMSettings();
        }
        if (model.name === modelText.SineCurve) {
            await this.SineCurveModelLabel().tap();
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
            await this.BackToCGMSettings();
        }
        if (model.name === modelText.None) {
            await this.NoDataModelLabel().tap();
        }
        if (model.name === modelText.SignalLoss) {
            await this.SignalLossModelLabel().tap();
        }
    }
    async _setFrequency(frequency) {
        if (frequency == null) {
            return;
        }
        let frequencyText = this.screenText.Frequency;
        await this.MeasurementFrequencyLabel().tap();
        if (frequency.minutes) {
            await match.accessible.ClickableLabel(frequencyText.Minutes).tap();
        } else if (frequency.seconds) {
            await match.accessible.ClickableLabel(frequencyText.Seconds).tap();
        }
        await match.accessible.ButtonBarButton(this.generalText.Back).tap();
    }
    async _setHistory(history) {
        if (history == null) {
            return;
        }
        let historyText = this.screenText.History;
        await this.SwipeUpUntilVisible(this.BackfillGlucoseHistoryLabel());
        if (history.name === historyText.BackfillGlucose) {
            await this.BackfillGlucoseHistoryLabel().tap();
            await action.SetDatePicker(`${history.backfillHours} ${historyText.Hours}`);
            await this.BackfillSaveAndClose();
        }
        if (history.name === historyText.Trend) {
            await this.TrendHistoryLabel().tap();
            await match.accessible.ClickableLabel(history.trend).tap();
            await this.SwipeDownUntilVisible(this.ModelHeader());
        }
    }
    async _setAlerts(alert) {
        if (alert == null) {
            return;
        }
        let alertText = this.screenText.Alerts;
        await this.SwipeUpUntilVisible(this.IssueAlertsLabel());
        await this.IssueAlertsLabel().tap();
        switch (alert.name) {
            case alertText.DelayedAlert,
                alertText.ReapeatingAlert,
                alertText.RetractAlertAbove,
                alertText.ImmediateAlert:
                await match.accessible.ClickableLabel(alert.name).tap();
                break;
            default:
                console.log('no match ', alert.name);
                break;
        }
        await this.SwipeDownUntilVisible(this.ModelHeader());
    }
    async RemoveSimulator() {
        await this.SwipeUpUntilVisible(this.DeleteCGMLabel());
        await this.DeleteCGMLabel().tap();
        await this.DeleteCGMConfirmationLabel().tap();
    }
}

module.exports = CGMSimulatorScreen;
