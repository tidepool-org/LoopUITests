const match = require('../match');

const { base } = require('../base/index');

class GlucoseScreen extends base.Screen {
    constructor(language) {
        super({
            screenText: language.homeScreen.GlucoseScreen,
            generalText: language.general,
            header: {
                backLabel: language.general.Status,
            },
            open: {
                isBtn: true,
                label: language.homeScreen.GlucoseScreen.Glucose,
            },
        });
    }
    CarbohydratesLabel() {
        return match.accessible.ClickableLabel(this.screenText.Carbohydrates);
    }
    InsulinLabel() {
        return match.accessible.ClickableLabel(this.screenText.Insulin);
    }
    async SetInsulin(turnOn) {
        if (turnOn == null) {
            return;
        }
        let allReadyOn = await this.IsOn(this.InsulinLabel());
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
