const match = require('../match');
const action = require('../action');
const { base } = require('../base/index');

class CGMSimulator extends base.Screen {
    constructor(language) {
        super({
            screenText: language.settingsScreen.CGMSimulatorScreen,
            generalText: language.general,
            backLabel: language.general.Done,
            scroll: {
                visibleBottomLabel: language.settingsScreen.CGMSimulatorScreen.DeleteCGM,
                visibleTopLabel: language.settingsScreen.CGMSimulatorScreen.Model.Constant,
            },
        });
    }
    CGMSettingsButton() {
        return match.accessible.BackButton(this.screenText.Header);
    }
    async BackToCGMSettings() {
        return this.CGMSettingsButton().tap();
    }
    ModelHeader() {
        return match.accessible.Header(this.screenText.Model.Header);
    }
    ConstantModelLabel() {
        return match.accessible.ClickableLabel(this.screenText.Model.Constant);
    }
    SineCurveModelLabel() {
        return match.accessible.ClickableLabel(this.screenText.Model.SineCurve).atIndex(0);
    }
    NoDataModelLabel() {
        return match.accessible.ClickableLabel(this.screenText.Model.None).atIndex(0);
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
     * @param {object} settings.effect.name
     * @param {object} settings.model
     * @param {string} settings.model.name
     * @param {array} settings.model.bgValues
     * @param {object} settings.history
     * @param {string} settings.history.name
     * @param {number} settings.history.backfillHours required if name is 'Backfill Glucose'
     * @param {string} settings.history.trendName required if name is 'Backfill Glucose'
     * @param {object} settings.alerts
     * @param {string} settings.general.Alert.name
     */
    async Apply(settings) {
        await this._setEffect(settings.effect);
        await this._setModel(settings.model);
        await this._setHistory(settings.history);
        await this._setAlerts(settings.alerts);
    }
    async _setEffect(effect) {
        if (effect == null) {
            return;
        }
        if (effect === this.screenText.Effect.GlucoseNoise) {
            await this.GlucoseNoiseEffectLabel().tap();
            var noiseField = match.UIEditableTextField();
            await noiseField.clearText();
            await noiseField.typeText('100');
            await this.Back();
        }
        if (effect === this.screenText.Effect.RandomError) {
            await this.RandomErrorEffectLabel().tap();
            var randomField = match.UIEditableTextField();
            await randomField.clearText();
            await randomField.typeText('10');
            await this.Back();
        }
        if (effect === this.screenText.Effect.RandomHighOutlier) {
            await this.RandomHighOutlierEffectLabel().tap();
            await this.BackToCGMSettings();
        }
        if (effect === this.screenText.Effect.RandomLowOutlier) {
            await this.RandomLowOutlierEffectLabel().tap();
            await this.BackToCGMSettings();
        }
    }
    async _setModel(model) {
        if (model == null) {
            return;
        }
        if (model.name === this.screenText.Model.Constant) {
            await this.ConstantModelLabel().tap();
            var constantField = match.UIEditableTextField();
            await constantField.clearText();
            await constantField.typeText(String(model.bgValues[0]));
            await this.BackToCGMSettings();
        }
        if (model.name === this.screenText.Model.SineCurve) {
            await this.SineCurveModelLabel().tap();
            await match.accessible.ClickableLabel(this.screenText.BaseGlucose).tap();
            var baseGlucoseField = match.UIEditableTextField();
            await baseGlucoseField.clearText();
            await baseGlucoseField.typeText(String(model.bgValues[0]));
            await match.accessible.BackButton(this.screenText.Model.SineCurve).tap();
            await match.accessible.ClickableLabel(this.screenText.Amplitude).tap();
            var amplitudeField = match.UIEditableTextField();
            await amplitudeField.clearText();
            await amplitudeField.typeText(String(model.bgValues[1]));
            await match.accessible.BackButton(this.screenText.Model.SineCurve).tap();
            await this.BackToCGMSettings();
        }
        if (model.name === this.screenText.Model.None) {
            await this.NoDataModelLabel().tap();
        }
    }
    async _setHistory(history) {
        if (history == null) {
            return;
        }
        await this.ScrollToBottom();
        if (history.name === this.screenText.History.BackfillGlucose) {
            await this.BackfillGlucoseHistoryLabel().tap();
            await action.SetPickerValue(0, `${history.backfillHours}`);
            await this.BackToCGMSettings();
        }
        if (history.name === this.screenText.History.Trend) {
            await this.TrendHistoryLabel().tap();
            await match.accessible.ClickableLabel(history.trend).tap();
        }
        await this.ScrollToTop();
    }
    async _setAlerts(alerts) {
        if (alerts == null) {
            return;
        }
        await this.ScrollToBottom();
        await this.IssueAlertsLabel().tap();
        if (general.Alert.name === this.screenText.Alerts.DelayedAlert) {
            await match.accessible.ClickableLabel(this.screenText.Alerts.DelayedAlert).tap();
        }
        if (general.Alert.name === this.screenText.Alerts.ReapeatingAlert) {
            await match.accessible.ClickableLabel(this.screenText.Alerts.ReapeatingAlert).tap();
        }
        await this.ScrollToTop();
    }
    async RemoveSimulator() {
        await this.ScrollToBottom();
        await this.DeleteCGMLabel().tap();
        await this.DeleteCGMConfirmationLabel().tap();
    }
}

module.exports = {
    CGMSimulator
};
