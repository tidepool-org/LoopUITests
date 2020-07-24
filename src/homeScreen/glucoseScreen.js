const match = require('../match');

class GlucoseScreen {
    constructor(language) {
        this.language = language.homeScreen.GlucoseScreen;
        this.language.general = language.general;
    }
    Header() {
        return match.accessible.Header(this.language.PredictedGlucose);
    }
    CarbohydratesLabel() {
        return match.accessible.ClickableLabel(this.language.Carbohydrates);
    }
    InsulinLabel() {
        return match.accessible.ClickableLabel(this.language.Insulin);
    }
    async _isInsulinOn() {
        try {
            await expect(this.InsulinLabel()).toHaveValue('1');
            return true;
        } catch (error) {
            return false;
        }
    }
    async SetInsulin(turnOn) {
        let allReadyOn = await this._isInsulinOn();
        if (turnOn == true) {
            if (allReadyOn == false) {
                await this.InsulinLabel().tap();
            }
        } else if (turnOn == false) {
            if (allReadyOn == true) {
                await this.InsulinLabel().tap();
            }
        }
    }
    GlucoseMomentumLabel() {
        return match.accessible.ClickableLabel(this.language.GlucoseMomentum);
    }
    RetrospectiveCorrectionLabel() {
        return match.accessible.ClickableLabel(this.language.RetrospectiveCorrection);
    }
    BackButton() {
        return match.accessible.BackButton(this.language.general.Status);
    }
    async Close() {
        await this.BackButton().tap();
    }
}

module.exports = {
    GlucoseScreen
};
