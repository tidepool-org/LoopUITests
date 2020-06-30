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
        return match.accessible.Label(this.language.Carbohydrates);
    }
    InsulinLabel() {
        return match.accessible.Label(this.language.Insulin);
    }
    InsulinButton() {
        return match.accessible.Button(this.language.Insulin);
    }
    async _isInsulinOn() {
        try {
            await expect(this.InsulinButton()).toHaveValue('1');
            return true;
        } catch (error) {
            return false;
        }
    }
    async SetInsulin(turnOn) {
        let allReadyOn = await this._isInsulinOn();
        if (turnOn == true) {
            if (allReadyOn == false) {
                await this.InsulinButton().tap();
            }
        } else if (turnOn == false) {
            if (allReadyOn == true) {
                await this.InsulinButton().tap();
            }
        }
    }
    GlucoseMomentumLabel() {
        return match.accessible.Label(this.language.GlucoseMomentum);
    }
    RetrospectiveCorrectionLabel() {
        return match.accessible.Label(this.language.RetrospectiveCorrection);
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
