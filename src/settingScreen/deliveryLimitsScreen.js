const match = require('../match');

class DeliveryLimitsScreen {
    constructor(language) {
        this.language = language;
    }
    Header() {
        return match.accessible.Header(this.language.settingsScreen.DeliveryLimits);
    }
    BackButton() {
        return match.accessible.BackButton(this.language.settingsScreen.Settings);
    }
    SaveButton() {
        return match.accessible.Label(this.language.settingsScreen.SaveToSimulator);
    }
    async Close() {
        await this.BackButton().tap();
    }
    async Save() {
        await this.SaveButton().tap();
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

module.exports = {
    DeliveryLimitsScreen
};
