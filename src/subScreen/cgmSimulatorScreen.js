const match = require('../match');
const action = require('../action');

class CGMSimulatorScreen {
    constructor(language) {
        this.language = language.cgmSimulatorSettingsScreen;
        this.language.general = language.general;
    }
    Header() {
        return match.accessible.Header(this.language.CGMSettings);
    }
    DoneButton() {
        return match.accessible.Button(this.language.general.Done);
    }
    ModelHeader() {
        return match.accessible.Header(this.language.Model.Header);
    }
    ConstantModelLabel() {
        return match.accessible.Label(this.language.Model.Constant);
    }
    SineCurveModelLabel() {
        return match.accessible.Label(this.language.Model.SineCurve);
    }
    NoDataModelLabel() {
        return match.accessible.Label(this.language.Model.None);
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
            case this.language.Effect.GlucoseNoise:
                await match.UIEditableTextField().clearText();
                await match.UIEditableTextField().typeText('100');
                await match.accessible.ButtonBarButton(this.language.general.Back).tap();
                break;
            case this.language.Effect.RandomError:
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
                case this.language.Model.Constant:
                    await match.UIEditableTextField().clearText();
                    await match.UIEditableTextField().typeText(String(modelData.bgValues[0]));
                    await match.accessible.BackButton(this.language.CGMSettings).tap();
                    break;
                case this.language.Model.SineCurve:
                    await match.accessible.Label(this.language.BaseGlucose).tap();
                    await match.UIEditableTextField().clearText();
                    await match.UIEditableTextField().typeText(String(modelData.bgValues[0]));
                    await match.accessible.BackButton(this.language.SineCurve).tap();
                    await match.accessible.Label(this.language.Amplitude).tap();
                    await match.UIEditableTextField().clearText();
                    await match.UIEditableTextField().typeText(modelData.bgValues[1]);
                    await match.accessible.BackButton(this.language.SineCurve).tap();
                    await match.accessible.BackButton(this.language.CGMSettings).tap();
                    break;
                default:
                    break;
            }
        }
    }
    async _setCGMBackfill(hours) {
        this.needsClosing = false;
        await match.accessible.Label(this.language.BackfillGlucose).tap();
        await action.SetPickerValue(0, `${hours}`);
        await match.accessible.ButtonBarButton(this.language.general.Save).tap();
    }
    async RemoveSimulator() {
        this.needsClosing = false;
        await match.accessible.Label(this.language.settingsScreen.DeleteCGM).tap();
        await match.accessible.Label(this.language.settingsScreen.DeleteCGM).atIndex(1).tap();
    }
}

module.exports = {
    CGMSimulatorScreen
};
