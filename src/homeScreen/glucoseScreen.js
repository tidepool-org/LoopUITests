const match = require('../match');

const { base } = require('../base/index');

class GlucoseScreen extends base.Screen {
    constructor(language) {
        super({
            openClickableLabel: language.homeScreen.GlucoseScreen.Glucose,
            screenText: language.homeScreen.GlucoseScreen,
            generalText: language.general,
            backLabel: language.general.Status,
        });
    }
    CarbohydratesLabel() {
        return match.accessible.ClickableLabel(this.screenText.Carbohydrates);
    }
    InsulinLabel() {
        return match.accessible.ClickableLabel(this.screenText.Insulin);
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
        if (turnOn == null) {
            return;
        }
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
        return match.accessible.ClickableLabel(this.screenText.GlucoseMomentum);
    }
    RetrospectiveCorrectionLabel() {
        return match.accessible.ClickableLabel(this.screenText.RetrospectiveCorrection);
    }
}

module.exports = {
    GlucoseScreen
};
