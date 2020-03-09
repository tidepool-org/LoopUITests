const match = require('./match');
const { Label, CarbsLabel } = require('./labels');

class Carbs {
    /**
     * @example await carbs.Open();
     */
    async Open() {
        try {
            //assume we are starting from the open screen
            await match.accessible.Button(CarbsLabel.AddMeal).tap();
        } catch (err) { } //catch and continue
    }
    /**
     * @example await carbs.Cancel();
     */
    async Cancel() {
        await match.accessible.ButtonBarButton(Label.Cancel).tap();
    }
    /**
     * @example await carbs.SaveWithoutBolus();
     */
    async SaveWithoutBolus() {
        await match.accessible.ButtonBarButton(Label.Continue).tap();
        await match.accessible.Button(CarbsLabel.SaveWithoutBolusing).tap();
    }
    /**
     * @summary add a meal entry
     * @param {string} amount
     * @example await carbs.SetCarbs('30');
     */
    async SetCarbs(amount) {
        //TODO: we need a better way to find this
        await match.UITextField().clearText();
        await match.UITextField().typeText(amount);
    }
    /**
     * @summary set the date / time for the given carbs
     * @param {string} date
     * @example await carbs.SetDate('30');
     */
    async SetDate(amount) {
        //TODO: we need a better way to find this
        await match.UITextField().clearText();
        await match.UITextField().typeText(amount);
    }
    /**
     * @summary set the absortion time for the given carbs
     * @param {string} hours
     * @example await carbs.SetAbsortionTime('1');
     */
    async SetAbsortionTime(hours) {
        //TODO: we need a better way to find this
        await match.UITextField().clearText();
        await match.UITextField().typeText(amount);
    }
}

module.exports = { Carbs };