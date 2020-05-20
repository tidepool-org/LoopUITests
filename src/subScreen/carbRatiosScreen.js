const element = require('detox').element;
const match = require('../match');
const { indexForTime } = require('../properties');

class CarbRatiosScreen {
    constructor(language) {
        this.language = language;
    }
    Header() {
        return match.accessible.Header(this.language.settingsScreen.CarbRatios);
    }
    BackButton() {
        return match.accessible.BackButton(this.language.settingsScreen.Settings);
    }
    CancelButton() {
        return match.accessible.ButtonBarButton(this.language.general.Cancel);
    }
    AddButton() {
        return match.accessible.ButtonBarButton(this.language.general.Add);
    }
    async Close() {
        await this.BackButton().tap();
    }
    async Cancel() {
        await this.CancelButton().tap();
    }
    async ApplyAll(ratios) {
        if (ratios) {
            for (let index = 0; index < ratios.length; index++) {
                await this.Apply(ratios[index]);
            }
        }
    }
    /**
     * @param {object} ratio
     * @param {number} ratio.carbGramsPerInsulinUnit
     */
    async Apply(ratio) {
        if (ratio) {
            await this.AddButton().tap();
            let index = indexForTime(ratio.time);
            if (index == 0) {
                await element(by.type('UITextField')).clearText();
                await element(by.type('UITextField')).typeText(String(ratio.carbGramsPerInsulinUnit));
                await expect(element(by.type('UITextField'))).toHaveText(String(ratio.carbGramsPerInsulinUnit));
            } else {
                await element(by.type('UITextField').atIndex(index)).clearText();
                await element(by.type('UITextField').atIndex(index)).typeText(String(ratio.carbGramsPerInsulinUnit));
                await expect(element(by.type('UITextField').atIndex(index))).toHaveText(String(ratio.carbGramsPerInsulinUnit));
            }
        }
    }
}

module.exports = {
    CarbRatiosScreen
};
