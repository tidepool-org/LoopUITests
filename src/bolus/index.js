const match = require('../match');
const base = require('../base/index');

class BolusScreen extends base.Screen {
    constructor(language) {
        super({
            screenText: language.bolusScreen,
            generalText: language.general,
            header: {
                backLabel: language.general.Cancel,
            },
            open: {
                isBtn: true,
                label: language.bolusScreen.Header,
            },
        });
    }
    /**
     * @override Screen.BackButton()
     * */
    BackButton() {
        return match.accessible.ButtonBarButton(this.backLabel);
    }
    async Deliver() {
        await this.DeliverButton().tap();
    }
    SaveAndDeliverButton() {
        return match.accessible.Button(this.screenText.SaveDeliver);
    }
    BolusLabel() {
        return match.accessible.TextLabel(this.screenText.Header);
    }
    BolusUnits() {
        return match.accessible.TextLabel(this.screenText.Unit).atIndex(0);
    }
    RecommendedLabel() {
        return match.accessible.TextLabel(this.screenText.Recommended);
    }
    RecommendedBolusLabel() {
        return match.accessible.TextLabel(this.screenText.RecommendedBolus);
    }
    RecommendedBolusUnits() {
        return match.accessible.TextLabel(this.screenText.Unit).atIndex(1);
    }
    ActiveCarbsLabel() {
        return match.accessible.TextLabel(this.screenText.ActiveCarbs);
    }
    BolusSummaryHeader() {
        return match.accessible.TextLabel(this.screenText.BolusSummary);
    }
    GlucoseHeader() {
        return match.accessible.TextLabel(this.screenText.Glucose).atIndex(1);
    }
    async SetBolusAmount(units) {
        var bolusAmountField = match.UITextField();
        await bolusAmountField.clearText();
        await bolusAmountField.typeText(String(units));
        await bolusAmountField.tapReturnKey();
    }
    AuthenticationLabel() {
        return match.Text('Authenticate to bolus');
    }
    async SetAuthentication(passcode) {
        var authField = match.UITextField();
        await authField.clearText();
        await authField.typeText(String(passcode));
        await authField.tapReturnKey();
    }
};

module.exports = BolusScreen;
