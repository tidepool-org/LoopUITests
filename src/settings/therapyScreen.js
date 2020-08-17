const base = require('../base/index');
const match = require('../match');

const CorrectionRangeScreen = require('./correctionRangeScreen');
const DeliveryLimitsScreen = require('./deliveryLimitsScreen');
const BasalRatesScreen = require('./basalRatesScreen');
const InsulinModelScreen = require('./insulinModelScreen');
const SuspendThresholdScreen = require('./suspendThresholdScreen');
const CarbRatioScreen = require('./carbRatioScreen');
const InsulinSensitivitiesScreen = require('./insulinSensitivitiesScreen');
const PremealRangeScreen = require('./premealRangeScreen');
const WorkoutRangeScreen = require('./workoutRangeScreen');


module.exports = class TherapyScreen extends base.Screen {
    constructor(language, config) {
        super({
            screenText: language.homeScreen.ActiveCarbohydratesScreen,
            generalText: language.general,
            header: {
                backLabel: 'Settings',
            },
            open: {
                isBtn: true,
                label: 'chevron.right',
            },
        });
        this.deliveryLimitsScreen = new DeliveryLimitsScreen(language, config.deliveryLimit);
        this.correctionRangeScreen = new CorrectionRangeScreen(language, config.correctionRange);
        this.basalRatesScreen = new BasalRatesScreen(language, config.basalRate);
        this.insulinModelScreen = new InsulinModelScreen(language);
        this.insulinSensitivitiesScreen = new InsulinSensitivitiesScreen(language, config.insulinSensitivity);
        this.suspendThresholdScreen = new SuspendThresholdScreen(language, config.suspendThreshold);
        this.carbRatioScreen = new CarbRatioScreen(language, config.carbRatio);
        this.workoutRangeScreen = new WorkoutRangeScreen(language);
        this.premealRangeScreen = new PremealRangeScreen(language);

    }
    SuspendThresholdLabel() {
        return this.suspendThresholdScreen.OpenButton();
    }
    SuspendThresholdInfo() {
        return match.accessible.TextLabel(this.screenText.SuspendThresholdInfo);
    }
    async OpenSuspendThresholdScreen() {
        await this.SuspendThresholdLabel().tap();
        return this.suspendThresholdScreen;
    }

    CorrectionRangeLabel() {
        return this.correctionRangeScreen.OpenButton();
    }
    CorrectionRangeInfo() {
        return match.accessible.TextLabel(this.screenText.CorrectionRangeInfo);
    }
    async OpenCorrectionRangeScreen() {
        await this.CorrectionRangeLabel().tap();
        return this.CorrectionRangeScreen;
    }

    PreMealRangeLabel() {
        return this.correctionRangeScreen.OpenButton();
    }
    PreMealRangeInfo() {
        return match.accessible.TextLabel(this.screenText.PreMealRangeInfo);
    }
    async OpenPreMealRangeScreen() {
        await this.CorrectionRangeLabel().tap();
        return this.CorrectionRangeScreen;
    }

    WorkoutRangeLabel() {
        return this.correctionRangeScreen.OpenButton();
    }
    WorkoutRangeInfo() {
        return match.accessible.TextLabel(this.screenText.WorkoutRangeInfo);
    }
    async OpenWorkoutRangeScreen() {
        await this.CorrectionRangeLabel().tap();
        return this.CorrectionRangeScreen;
    }

    BasalRateLabel() {
        return this.basalRatesScreen.OpenButton();
    }
    BasalRateInfo() {
        return match.accessible.TextLabel(this.screenText.BasalRateInfo);
    }
    async OpenBasalRateScreen() {
        await this.BasalRateLabel().tap();
        return this.basalRatesScreen;
    }

    DeliveryLimitsLabel() {
        return this.deliveryLimitsScreen.OpenButton();
    }
    DeliveryLimitsInfo() {
        return match.accessible.TextLabel(this.screenText.DeliveryLimitsInfo);
    }
    async OpenDeliveryLimitsScreen() {
        await this.DeliveryLimitsLabel().tap();
        return this.deliveryLimitsScreen;
    }

    InsulinModelLabel() {
        return this.insulinModelScreen.OpenButton();
    }
    InsulinModelInfo() {
        return match.accessible.TextLabel(this.screenText.InsulinModelInfo);
    }
    async OpenInsulinModelScreen() {
        await this.InsulinModelLabel.tap();
        return this.insulinModelScreen;
    }

    CarbRatiosLabel() {
        return this.carbRatioScreen.OpenButton();
    }
    CarbRatiosInfo() {
        return match.accessible.TextLabel(this.screenText.CarbRatiosInfo);
    }
    async OpenCarbRatiosScreen() {
        await this.CarbRatiosLabel().tap();
        return this.carbRatioScreen;
    }

    InsulinSensitivitiesLabel() {
        return this.insulinSensitivitiesScreen.OpenButton();
    }
    InsulinSensitivitiesInfo() {
        return match.accessible.TextLabel(this.screenText.InsulinSensitivitiesInfo);
    }
    async OpenInsulinSensitivitiesScreen() {
        await this.InsulinSensitivitiesLabel().tap();
        return this.insulinSensitivitiesScreen;
    }
}
