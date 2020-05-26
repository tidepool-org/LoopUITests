const match = require('../match');
const action = require('../action');
const { setting } = require('../properties');

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
                    await match.UIEditableTextField().typeText(String(modelData.bgValues[0]));
                    await match.accessible.BackButton(this.language.cgmSimulatorSettingsScreen.CGMSettings).tap();
                    break;
                case setting.cgmModel.SineCurve:
                    await match.accessible.Label(this.language.cgmSimulatorSettingsScreen.BaseGlucose).tap();
                    await match.UIEditableTextField().clearText();
                    await match.UIEditableTextField().typeText(String(modelData.bgValues[0]));
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
