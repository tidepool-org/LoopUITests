const match = require('./match');
const { base } = require('./base/index');

class BolusScreen extends base.Screen {
    constructor(language) {
        super({
            openScreenLabel: language.bolusScreen.Header,
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
        return match.accessible.Label(this.screenText.Header);
    }
    EnteredLabel() {
        return match.accessible.Label(this.screenText.Entered);
    }
    RecommendedLabel() {
        return match.accessible.Label(this.screenText.Recommended);
    }
    async ExpectCannotDeliverBolus() {
        await expect(match.accessible.DisabledButton(this.screenText.Deliver)).toExist();
    }
    async SetBolusAmount(units) {
        await match.UITextField().clearText();
        await match.UITextField().typeText(String(units));
        await match.UITextField().tapReturnKey();
    }
    AuthenticationLabel() {
        return match.Text('Authenticate to bolus');
    }
    async SetAuthentication(passcode) {
        await match.UITextField().clearText();
        await match.UITextField().typeText(String(passcode));
        await match.UITextField().tapReturnKey();
    }
};

module.exports = { BolusScreen };
