const base = require('../base/index');
const match = require('../match');

const CorrectionRangeScreen = require('./correctionRangeScreen');
const DeliveryLimitsScreen = require('./deliveryLimitsScreen');
const BasalRatesScreen = require('./basalRatesScreen');
const InsulinModelScreen = require('./insulinModelScreen');
const SuspendThresholdScreen = require('./suspendThresholdScreen');
const CarbRatioScreen = require('./carbRatioScreen');

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
    async OpenCorrectionRangeScreen() {
        await this.CorrectionRangeLabel().tap();
        return this.CorrectionRangeScreen;
    }
    CorrectionRangeInfo() {
        return match.accessible.TextLabel(this.screenText.CorrectionRangeInfo);
    }
    BasalRateLabel() {
        return this.basalRatesScreen.OpenButton();
    }
    async OpenBasalRateScreen() {
        await this.BasalRateLabel().tap();
        return this.basalRatesScreen;
    }
    BasalRateInfo() {
        return match.accessible.TextLabel(this.screenText.BasalRateInfo);
    }

    DeliveryLimitsLabel() {
        return this.deliveryLimitsScreen.OpenButton();
    }
    async OpenDeliveryLimitsScreen() {
        await this.DeliveryLimitsLabel().tap();
        return this.deliveryLimitsScreen;
    }
    DeliveryLimitsInfo() {
        return match.accessible.TextLabel(this.screenText.DeliveryLimitsInfo);
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
