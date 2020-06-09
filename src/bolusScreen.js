const match = require('./match');

class BolusScreen {
    constructor(language) {
        this.language = language.bolusScreen;
        this.language.general = language.general;
    }
    async Open() {
        try {
            //assume we are starting from the open screen
            await match.accessible.Button(this.language.Bolus).tap();
        } catch (err) { } //catch and continue
    }
    async Cancel() {
        await this.CancelHeaderButton().tap();
    }
    CancelHeaderButton() {
        return match.accessible.ButtonBarButton(this.language.general.Cancel);
    }
    async Deliver() {
        await this.DeliverButton().tap();
    }
    DeliverButton() {
        return match.accessible.Button(this.language.Deliver);
    }
    DisabledDeliverButton() {
        return match.accessible.DisabledButton(this.language.Deliver);
    }
    BolusHeader() {
        return match.accessible.Header(this.language.Bolus);
    }
    BolusLabel() {
        return match.accessible.Label(this.language.Bolus);
    }
    EnteredLabel() {
        return match.accessible.Label(this.language.Entered);
    }
    RecommendedLabel() {
        return match.accessible.Label(this.language.Recommended);
    }
    /**
     * @example await bolus.ExpectCannotDeliverBolus();
     */
    async ExpectCannotDeliverBolus() {
        await expect(match.accessible.DisabledButton(this.language.Deliver)).toExist();
    }
    /**
     * @param {number} units
     * @example await bolus.SetBolusAmount(10.5);
     */
    async SetBolusAmount(units) {
        await match.UITextField().clearText();
        await match.UITextField().typeText(units);
    }
    /**
     * @example await bolus.SetAuthentication();
     */
    async SetAuthentication() {
        await match.UITextField().clearText();
        await match.UITextField().typeText(units);
    }
};

module.exports = { BolusScreen };
