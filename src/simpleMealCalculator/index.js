const match = require('../match');
const base = require('../base/index');

class SimpleMealCalculatorScreen extends base.Screen {
    constructor(language) {
        super({
            generalText: language.general,
            header: {
                backLabel: language.general.Cancel,
            },
            open: {
                isBtn: true,
                label: 'Simple Meal Calculator',
            },
        });
    }
    get EnterBolusButton() {
        return match.accessible.Button('Enter Bolus');
    }
    get CarbohydratesLabel() {
        return match.accessible.TextLabel('Carbohydrates');
    }
    get CurrentGlucoseLabel() {
        return match.accessible.TextLabel('Current Glucose');
    }
    get RecommendedBolusLabel() {
        return match.accessible.TextLabel(this.screenText.RecommendedBolus);
    }
    get BolusLabel() {
        return match.accessible.TextLabel(this.screenText.Header);
    }
}

module.exports = SimpleMealCalculatorScreen;
