const match = require('./match');

const { BaseScreen } = require('./baseScreen');

class BolusScreen extends BaseScreen {
    constructor(language) {
        super({
            headerLabel: language.bolusScreen.MealBolus,
            openScreenLabel: language.bolusScreen.Bolus,
            screenTxt: language.bolusScreen,
            generalTxt: language.general,
        });
    }
    async Deliver() {
        await this.DeliverButton().tap();
    }
    DeliverButton() {
        return match.accessible.Button(this.screenTxt.Deliver);
    }
    DisabledDeliverButton() {
        return match.accessible.DisabledButton(this.screenTxt.Deliver);
    }
    BolusLabel() {
        return match.accessible.Label(this.screenTxt.Bolus);
    }
    EnteredLabel() {
        return match.accessible.Label(this.screenTxt.Entered);
    }
    RecommendedLabel() {
        return match.accessible.Label(this.screenTxt.Recommended);
    }
    async ExpectCannotDeliverBolus() {
        await expect(match.accessible.DisabledButton(this.screenTxt.Deliver)).toExist();
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
