const match = require('../match');
const action = require('../action');

class CGMSimulatorScreen {
    constructor(language) {
        this.language = language.settingsScreen.CGMSimulatorScreen;
        this.language.general = language.general;
    }
    Header() {
        return match.accessible.Header(this.language.CGMSettings);
    }
    DoneButton() {
        return match.accessible.Button(this.language.general.Done).atIndex(0);
    }
    BackButton() {
        return match.accessible.Button(this.language.general.Back);
    }
    CGMSettingsButton() {
        return match.accessible.BackButton(this.language.CGMSettings);
    }
    ModelHeader() {
        return match.accessible.Header(this.language.Model.Header);
    }
    ConstantModelLabel() {
        return match.accessible.Label(this.language.Model.Constant);
    }
    SineCurveModelLabel() {
        return match.accessible.Label(this.language.Model.SineCurve).atIndex(0);
    }
    NoDataModelLabel() {
        return match.accessible.Label(this.language.Model.None).atIndex(0);
    }
    EffectsHeader() {
        return match.accessible.Header(this.language.Effect.Header);
    }
    RandomErrorEffectLabel() {
        return match.accessible.Label(this.language.Effect.RandomError);
    }
    GlucoseNoiseEffectLabel() {
        return match.accessible.Label(this.language.Effect.GlucoseNoise);
    }
    RandomHighOutlierEffectLabel() {
        return match.accessible.Label(this.language.Effect.RandomHighOutlier);
    }
    RandomLowOutlierEffectLabel() {
        return match.accessible.Label(this.language.Effect.RandomLowOutlier);
    }
    BackfillGlucoseHistoryLabel() {
        return match.accessible.Label(this.language.History.BackfillGlucose);
    }

    TrendHistoryLabel() {
        return match.accessible.Label(this.language.History.Trend);
    }
    HistoryHeader() {
        return match.accessible.Header(this.language.History.Header);
    }
    AlertsHeader() {
        return match.accessible.Header(this.language.Alerts.Header);
    }
    IssueAlertsLabel() {
        return match.accessible.Label(this.language.Alerts.IssueAlerts);
    }
    DeleteCGMLabel() {
        return match.accessible.Label(this.language.DeleteCGM);
    }
    DeleteCGMConfirmationLabel() {
        return match.accessible.Label(this.language.DeleteCGM).atIndex(1);
    }
    async BackfillSaveAndClose() {
        await match.accessible.ButtonBarButton(this.language.general.Save).tap();
    }
    async AlertSaveAndClose() {
        await match.accessible.ButtonBarButton(this.language.general.Done).tap();
    }
    async BackToCGMSettings() {
        await this.CGMSettingsButton().tap();
    }
    async Close() {
        await this.DoneButton().tap();
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
        if (effect)
            if (effect === this.language.Effect.GlucoseNoise) {
                await this.GlucoseNoiseEffectLabel().tap();
                await match.UIEditableTextField().clearText();
                await match.UIEditableTextField().typeText('100');
                await this.BackButton().tap();
            }
        if (effect === this.language.Effect.RandomError) {
            await this.RandomErrorEffectLabel().tap();
            await match.UIEditableTextField().clearText();
            await match.UIEditableTextField().typeText('10');
            await this.BackButton().tap();
        }
        if (effect === this.language.Effect.RandomHighOutlier) {
            await this.RandomHighOutlierEffectLabel().tap();
            await this.CGMSettingsButton().tap();
        }
        if (effect === this.language.Effect.RandomLowOutlier) {
            await this.RandomLowOutlierEffectLabel().tap();
            await this.CGMSettingsButton().tap();
        }
    }
    async _setModel(model) {
        if (model) {
            if (model.name === this.language.Model.Constant) {
                await this.ConstantModelLabel().tap();
                await match.UIEditableTextField().clearText();
                await match.UIEditableTextField().typeText(String(model.bgValues[0]));
                await match.accessible.BackButton(this.language.CGMSettings).tap();
                return;
            }
            if (model.name === this.language.Model.SineCurve) {
                await this.SineCurveModelLabel().tap();
                await match.accessible.Label(this.language.BaseGlucose).tap();
                await match.UIEditableTextField().clearText();
                await match.UIEditableTextField().typeText(String(model.bgValues[0]));
                await match.accessible.BackButton(this.language.Model.SineCurve).tap();
                await match.accessible.Label(this.language.Amplitude).tap();
                await match.UIEditableTextField().clearText();
                await match.UIEditableTextField().typeText(String(model.bgValues[1]));
                await match.accessible.BackButton(this.language.Model.SineCurve).tap();
                await match.accessible.BackButton(this.language.CGMSettings).tap();
                return;
            }
            if (model.name === this.language.Model.None) {
                await this.NoDataModelLabel().tap();
                return;
            }
        }
    }
    async _setHistory(history) {
        if (history) {
            if (history.name === this.language.History.BackfillGlucose) {
                await this.BackfillGlucoseHistoryLabel().tap();
                await action.SetPickerValue(0, `${history.backfillHours}`);
            }
            if (history.name === this.language.History.Trend) {
                await this.TrendHistoryLabel().tap();
                await match.accessible.Label(history.trend).tap();
            }
        }
    }
    async _setAlerts(alerts) {
        if (alerts) {
            await this.IssueAlertsLabel().tap();
            if (general.Alert.name === this.language.Alerts.DelayedAlert) {
                await match.accessible.Label(this.language.Alerts.DelayedAlert).tap();
            }
            if (general.Alert.name === this.language.Alerts.ReapeatingAlert) {
                await match.accessible.Label(this.language.Alerts.ReapeatingAlert).tap();
            }
        }
    }
    async RemoveSimulator() {
        await this.HistoryHeader().swipe('up', 'fast');
        await this.DeleteCGMLabel().tap();
        await this.DeleteCGMConfirmationLabel().tap();
    }
}

module.exports = {
    CGMSimulatorScreen
};
