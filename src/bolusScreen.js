const match = require('./match');
const { base } = require('./base/index');

class BolusScreen extends base.Screen {
    constructor(language) {
        super({
            openLabel: language.bolusScreen.Header,
            screenText: language.bolusScreen,
            generalText: language.general,
        });
    }
    /**
     * @override so we access the correct CancelButton
     */
    CancelButton() {
        return match.accessible.ButtonBarButton(this.generalText.Cancel);
    }
    async Deliver() {
        await this.DeliverButton().tap();
    }
    DeliverButton() {
        return match.accessible.Button(this.screenText.Deliver);
    }
    DisabledDeliverButton() {
        return match.accessible.DisabledButton(this.screenText.Deliver);
    }
    BolusLabel() {
        return match.accessible.TextLabel(this.screenText.Header);
    }
    EnteredLabel() {
        return match.accessible.TextLabel(this.screenText.Entered);
    }
    RecommendedLabel() {
        return match.accessible.TextLabel(this.screenText.Recommended);
    }
    RecommendedBolusLabel() {
        return match.accessible.TextLabel('Recommended Bolus');
    }
    ActiveCarbsLabel() {
        return match.accessible.TextLabel('Active Carbs');
    }
    BolusSummaryHeader() {
        return match.accessible.TextLabel('Bolus Summary');
    }
    GlucoseHeader() {
        return match.accessible.TextLabel('Glucose').atIndex(0);
    }
    async ExpectCannotDeliverBolus() {
        await expect(match.accessible.DisabledButton(this.screenText.Deliver)).toExist();
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

module.exports = { BolusScreen };
