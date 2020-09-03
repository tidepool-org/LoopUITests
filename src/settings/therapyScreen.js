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
            screenText: language.settingsScreen.TherapySettingsScreen,
            generalText: language.general,
            header: {
                backLabel: language.general.Done,
            },
            open: {
                isBtn: true,
                label: language.settingsScreen.TherapySettingsScreen.Header + '\n' + language.settingsScreen.TherapySettingsScreen.Info,
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
    /**
     * @override
     */
    BackButton() {
        return match.accessible.Button(this.generalText.Done).atIndex(0);
    }
    async ReturnToHomeScreen() {
        await this.Back();
        await match.accessible.Button(this.generalText.Done).tap();
    }
    SuspendThresholdLabel() {
        return this.suspendThresholdScreen.OpenButton();
    }
    SuspendThresholdInfo() {
        return this.suspendThresholdScreen.InfoLabel();
    }
    async OpenSuspendThresholdScreen() {
        await this.SuspendThresholdLabel().tap();
        return this.suspendThresholdScreen;
    }

    CorrectionRangeLabel() {
        return this.correctionRangeScreen.OpenButton();
    }
    CorrectionRangeInfo() {
        return this.correctionRangeScreen.InfoLabel();
    }
    async OpenCorrectionRangeScreen() {
        await this.CorrectionRangeLabel().tap();
        return this.correctionRangeScreen;
    }

    PreMealRangeLabel() {
        return this.premealRangeScreen.OpenButton();
    }
    PreMealRangeInfo() {
        return this.premealRangeScreen.InfoLabel();
    }
    async OpenPreMealRangeScreen() {
        await this.PreMealRangeLabel().tap();
        return this.premealRangeScreen;
    }

    WorkoutRangeLabel() {
        return this.workoutRangeScreen.OpenButton();
    }
    WorkoutRangeInfo() {
        return this.workoutRangeScreen.InfoLabel();
    }
    async OpenWorkoutRangeScreen() {
        await this.WorkoutRangeLabel().tap();
        return this.workoutRangeScreen;
    }

    BasalRateLabel() {
        return this.basalRatesScreen.OpenButton();
    }
    BasalRateInfo() {
        return this.basalRatesScreen.InfoLabel();
    }
    async OpenBasalRateScreen() {
        //`Basal Rate` vs `Basal Rates` on settings screen versions
        await match.accessible.ClickableLabel('Basal Rates').tap();
        return this.basalRatesScreen;
    }

    DeliveryLimitsLabel() {
        return this.deliveryLimitsScreen.OpenButton();
    }
    DeliveryLimitsMaxBasalRateLabel() {
        return this.deliveryLimitsScreen.MaxBasalRateLabel();
    }
    DeliveryLimitsMaxBolusLabel() {
        return this.deliveryLimitsScreen.MaxBolusLabel();
    }
    DeliveryLimitsInfo() {
        return this.deliveryLimitsScreen.InfoLabel();
    }
    async OpenDeliveryLimitsScreen() {
        await this.DeliveryLimitsLabel().tap();
        return this.deliveryLimitsScreen;
    }

    InsulinModelLabel() {
        return this.insulinModelScreen.OpenButton();
    }
    InsulinModelInfo() {
        return this.insulinModelScreen.InfoLabel();
    }
    async OpenInsulinModelScreen() {
        await this.SwipeUp(this.InsulinModelLabel());
        await this.InsulinModelLabel().tap();
        return this.insulinModelScreen;
    }

    CarbRatiosLabel() {
        return this.carbRatioScreen.OpenButton();
    }
    CarbRatiosInfo() {
        return this.carbRatioScreen.InfoLabel();
    }
    async OpenCarbRatioScreen() {
        await this.CarbRatiosLabel().tap();
        return this.carbRatioScreen;
    }

    InsulinSensitivitiesLabel() {
        return this.insulinSensitivitiesScreen.OpenButton();
    }
    InsulinSensitivitiesInfo() {
        return this.insulinSensitivitiesScreen.InfoLabel();
    }
    async OpenInsulinSensitivitiesScreen() {
        await this.ScrollToBottom();
        await this.InsulinSensitivitiesLabel().tap();
        return this.insulinSensitivitiesScreen;
    }
}
