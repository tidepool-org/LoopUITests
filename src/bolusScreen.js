const match = require('./match');
const { Label, BolusLabel } = require('./labels');

class BolusScreen {
    /**
     * @example await bolus.Open();
     */
    async Open() {
        try {
            //assume we are starting from the open screen
            await match.accessible.Button(BolusLabel.Bolus).tap();
        } catch (err) { } //catch and continue
    }
    /**
     * @example await bolus.Cancel();
     */
    async Cancel() {
        await match.accessible.ButtonBarButton(Label.Cancel).tap();
    }
    /**
     * @example await bolus.Deliver();
     */
    async Deliver() {
        await match.accessible.Button(BolusLabel.Deliver).tap();
    }
    /**
     * @example await bolus.ExpectCannotDeliverBolus();
     */
    async ExpectCannotDeliverBolus() {
        await expect(match.accessible.DisabledButton(BolusLabel.Deliver)).toExist();
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
