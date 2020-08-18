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
            screenText: language.settingsScreen_new.TherapySettingsScreen,
            generalText: language.general,
            header: {
                backLabel: 'Settings',
            },
            open: {
                isBtn: true,
                label: 'chevron.right',
            },
        });
        var lang = {
            general: language.general,
            settingsScreen: language.settingsScreen_new.TherapySettingsScreen,
        };
        this.deliveryLimitsScreen = new DeliveryLimitsScreen(lang, config.deliveryLimit);
        this.correctionRangeScreen = new CorrectionRangeScreen(lang, config.correctionRange);
        this.basalRatesScreen = new BasalRatesScreen(lang, config.basalRate);
        this.insulinModelScreen = new InsulinModelScreen(lang);
        this.insulinSensitivitiesScreen = new InsulinSensitivitiesScreen(lang, config.insulinSensitivity);
        this.suspendThresholdScreen = new SuspendThresholdScreen(lang, config.suspendThreshold);
        this.carbRatioScreen = new CarbRatioScreen(lang, config.carbRatio);
        this.workoutRangeScreen = new WorkoutRangeScreen(lang);
        this.premealRangeScreen = new PremealRangeScreen(lang);
    }
    SuspendThresholdLabel() {
        return this.suspendThresholdScreen.OpenButton();
    }
    SuspendThresholdInfo() {
        return match.accessible.TextLabel(this.screenText.SuspendThresholdScreen.Info);
    }
    async OpenSuspendThresholdScreen() {
        await this.SuspendThresholdLabel().tap();
        return this.suspendThresholdScreen;
    }

    CorrectionRangeLabel() {
        return this.correctionRangeScreen.OpenButton();
    }
    CorrectionRangeInfo() {
        return match.accessible.TextLabel(this.screenText.CorrectionRangeScreen.Info);
    }
    async OpenCorrectionRangeScreen() {
        await this.CorrectionRangeLabel().tap();
        return this.CorrectionRangeScreen;
    }

    PreMealRangeLabel() {
        return this.premealRangeScreen.OpenButton();
    }
    PreMealRangeInfo() {
        return match.accessible.TextLabel(this.screenText.PremealRangeScreen.Info);
    }
    async OpenPreMealRangeScreen() {
        await this.PreMealRangeLabel().tap();
        return this.premealRangeScreen;
    }

    WorkoutRangeLabel() {
        return this.workoutRangeScreen.OpenButton();
    }
    WorkoutRangeInfo() {
        return match.accessible.TextLabel(this.screenText.WorkoutRangeScreen.Info);
    }
    async OpenWorkoutRangeScreen() {
        await this.WorkoutRangeLabel().tap();
        return this.workoutRangeScreen;
    }

    BasalRateLabel() {
        return this.basalRatesScreen.OpenButton();
    }
    BasalRateInfo() {
        return match.accessible.TextLabel(this.screenText.BasalRateScreen.Info);
    }
    async OpenBasalRateScreen() {
        await this.SwipeUp(this.screenText.BasalRateScreen.Header);
        await this.BasalRateLabel().tap();
        return this.basalRatesScreen;
    }

    DeliveryLimitsLabel() {
        return this.deliveryLimitsScreen.OpenButton();
    }
    DeliveryLimitsMaxBasalRateLabel() {
        return match.accessible.TextLabel(this.screenText.DeliveryLimitsScreen.MaxBasalRate);
    }
    DeliveryLimitsMaxBolusLabel() {
        return match.accessible.TextLabel(this.screenText.DeliveryLimitsScreen.MaxBolus);
    }
    DeliveryLimitsInfo() {
        return match.accessible.TextLabel(this.screenText.DeliveryLimitsScreen.Info).atIndex(0);
    }
    async OpenDeliveryLimitsScreen() {
        await this.SwipeUp(this.screenText.DeliveryLimitsScreen.Header);
        await this.DeliveryLimitsLabel().tap();
        return this.deliveryLimitsScreen;
    }

    InsulinModelLabel() {
        return this.insulinModelScreen.OpenButton();
    }
    InsulinModelInfo() {
        return match.accessible.TextLabel(this.screenText.InsulinModelScreen.Info);
    }
    async OpenInsulinModelScreen() {
        await this.InsulinModelLabel.tap();
        return this.insulinModelScreen;
    }

    CarbRatiosLabel() {
        return this.carbRatioScreen.OpenButton();
    }
    CarbRatiosInfo() {
        return match.accessible.TextLabel(this.screenText.CarbRatiosScreen.Info).atIndex(0);
    }
    async OpenCarbRatiosScreen() {
        await this.CarbRatiosLabel().tap();
        return this.carbRatioScreen;
    }

    InsulinSensitivitiesLabel() {
        return this.insulinSensitivitiesScreen.OpenButton();
    }
    InsulinSensitivitiesInfo() {
        return match.accessible.TextLabel(this.screenText.InsulinSensitivitiesScreen.Info);
    }
    async OpenInsulinSensitivitiesScreen() {
        await this.InsulinSensitivitiesLabel().tap();
        return this.insulinSensitivitiesScreen;
    }
}
