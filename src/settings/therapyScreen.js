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
        this._deliveryLimitsScreen = new DeliveryLimitsScreen(language, config.deliveryLimit);
        this._correctionRangeScreen = new CorrectionRangeScreen(language, config.correctionRange);
        this._basalRatesScreen = new BasalRatesScreen(language, config.basalRate);
        this._insulinModelScreen = new InsulinModelScreen(language);
        this._insulinSensitivitiesScreen = new InsulinSensitivitiesScreen(language, config.insulinSensitivity);
        this._suspendThresholdScreen = new SuspendThresholdScreen(language, config.suspendThreshold);
        this._carbRatioScreen = new CarbRatioScreen(language, config.carbRatio);
        this._workoutRangeScreen = new WorkoutRangeScreen(language);
        this._premealRangeScreen = new PremealRangeScreen(language);
    }
    /**
     * @override
     */
    get BackButton() {
        return match.accessible.Button(this.generalText.Done).atIndex(0);
    }
    get SuspendThresholdLabel() {
        return this._suspendThresholdScreen.OpenButton;
    }
    get SuspendThresholdInfo() {
        return this._suspendThresholdScreen.InfoLabel;
    }
    get CorrectionRangeLabel() {
        return this._correctionRangeScreen.OpenButton;
    }
    get CorrectionRangeInfo() {
        return this._correctionRangeScreen.InfoLabel;
    }
    get PreMealRangeLabel() {
        return this._premealRangeScreen.OpenButton;
    }
    get PreMealRangeInfo() {
        return this._premealRangeScreen.InfoLabel;
    }
    get WorkoutRangeLabel() {
        return this._workoutRangeScreen.OpenButton;
    }
    get WorkoutRangeInfo() {
        return this._workoutRangeScreen.InfoLabel;
    }
    get BasalRateLabel() {
        return this._basalRatesScreen.OpenButton;
    }
    get BasalRateInfo() {
        return this._basalRatesScreen.InfoLabel;
    }
    get DeliveryLimitsLabel() {
        return this._deliveryLimitsScreen.OpenButton;
    }
    get DeliveryLimitsMaxBasalRateLabel() {
        return this._deliveryLimitsScreen.MaxBasalRateLabel;
    }
    get DeliveryLimitsMaxBolusLabel() {
        return this._deliveryLimitsScreen.MaxBolusLabel;
    }
    get DeliveryLimitsInfo() {
        return this._deliveryLimitsScreen.InfoLabel;
    }
    get InsulinModelLabel() {
        return this._insulinModelScreen.OpenButton;
    }
    get InsulinModelInfo() {
        return this._insulinModelScreen.InfoLabel;
    }
    get CarbRatiosLabel() {
        return this._carbRatioScreen.OpenButton;
    }
    get CarbRatiosInfo() {
        return this._carbRatioScreen.InfoLabel;
    }
    get InsulinSensitivitiesLabel() {
        return this._insulinSensitivitiesScreen.OpenButton;
    }
    get InsulinSensitivitiesInfo() {
        return this._insulinSensitivitiesScreen.InfoLabel;
    }

    async ReturnToHomeScreen() {
        await this.BackButton.tap();
        await match.accessible.Button(this.generalText.Done).tap();
    }
    async OpenInsulinSensitivitiesScreen() {
        await this.SwipeUpUntilVisible(this.InsulinSensitivitiesLabel);
        await this.InsulinSensitivitiesLabel.tap();
        return this._insulinSensitivitiesScreen;
    }
    async OpenCarbRatioScreen() {
        await this.SwipeUpUntilVisible(this.CarbRatiosLabel);
        await this.CarbRatiosLabel.tap();
        return this._carbRatioScreen;
    }
    async OpenInsulinModelScreen() {
        await this.SwipeUpUntilVisible(this.InsulinModelLabel);
        await this.InsulinModelLabel.tap();
        return this._insulinModelScreen;
    }
    async OpenDeliveryLimitsScreen() {
        await this.SwipeUpUntilVisible(this.DeliveryLimitsMaxBolusLabel);
        await this.DeliveryLimitsLabel.tap();
        return this._deliveryLimitsScreen;
    }
    async OpenBasalRateScreen() {
        await this.SwipeUpUntilVisible(this.BasalRateLabel);
        await this.BasalRateLabel.tap();
        return this._basalRatesScreen;
    }
    async OpenWorkoutRangeScreen() {
        await this.SwipeUpUntilVisible(this.WorkoutRangeLabel);
        await this.WorkoutRangeLabel.tap();
        return this._workoutRangeScreen;
    }
    async OpenPreMealRangeScreen() {
        await this.SwipeUpUntilVisible(this.PreMealRangeLabel);
        await this.PreMealRangeLabel.tap();
        return this._premealRangeScreen;
    }
    async OpenCorrectionRangeScreen() {
        await this.CorrectionRangeLabel.tap();
        return this._correctionRangeScreen;
    }
    async OpenSuspendThresholdScreen() {
        await this.SuspendThresholdLabel.tap();
        return this._suspendThresholdScreen;
    }
}
