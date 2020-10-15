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
    get DoneButton() {
        return match.accessible.Button(this.generalText.Done).atIndex(0);
    }
    get DeliverButton() {
        return match.accessible.Button(this.screenText.Deliver);
    }
    get EnterBolusButton() {
        return match.accessible.Button(this.screenText.EnterBolus);
    }
    get BolusLabel() {
        return match.accessible.TextLabel(this.screenText.Header);
    }
    get BolusUnits() {
        return match.accessible.TextLabel(this.screenText.Unit).atIndex(0);
    }
    get RecommendedLabel() {
        return match.accessible.TextLabel(this.screenText.Recommended);
    }
    get RecommendedBolusLabel() {
        return match.accessible.TextLabel(this.screenText.RecommendedBolus);
    }
    get RecommendedBolusUnits() {
        return match.accessible.TextLabel(this.screenText.Unit).atIndex(1);
    }
    get ActiveCarbsLabel() {
        return match.accessible.TextLabel(this.screenText.ActiveCarbs);
    }
    get BolusSummaryHeader() {
        return match.accessible.TextLabel(this.screenText.BolusSummary);
    }
    get GlucoseHeader() {
        return match.accessible.TextLabel(this.screenText.Glucose).atIndex(1);
    }

    async Deliver() {
        await this.DoneButton.tap();
        await this.DeliverButton.longPress();
    }
    async EnterBolus() {
        await this.EnterBolusButton.tapReturnKey();
    }
    async SetBolusAmount(units) {
        var bolusAmountField = match.UITextField();
        await bolusAmountField.clearText();
        await bolusAmountField.typeText(String(units));
        await bolusAmountField.tapReturnKey();
    }
}

module.exports = BolusScreen;
