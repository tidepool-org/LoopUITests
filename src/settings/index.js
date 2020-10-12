const match = require('../match');

const SupportScreen = require('./supportScreen');
const TherapyScreen = require('./therapyScreen');
const base = require('../base/index');

class SettingsScreen extends base.Screen {
    constructor(language, devices, config) {
        super({
            screenText: language.settingsScreen,
            generalText: language.general,
            open: {
                isBtn: true,
                label: language.settingsScreen.Settings,
            },
            header: {
                backLabel: language.general.Done,
            },
            scroll: {
                visibleBottomLabel: language.settingsScreen.Supportv2,
                visibleTopLabel: language.settingsScreen.ClosedLoop,
            },
        });
        this.Devices = devices;
        this._therapyScreen = new TherapyScreen(language, config);
        this._supportScreen = new SupportScreen(language);
    }
    /**
     * @override
     */
    BackButton() {
        return match.accessible.Button(this.generalText.Done);
    }
    _closedLoopButton() {
        return match.accessible.SwitchButton(this.screenText.ClosedLoop);
    }
    async ClosedLoop() {
        var btn = this._closedLoopButton()
        var isOn = await this.IsOn(btn);
        if (isOn == false) {
            await btn.longPress();
        }
    }
    async OpenLoop() {
        var btn = this._closedLoopButton()
        var isOn = await this.IsOn(btn);
        if (isOn == true) {
            await btn.longPress();
        }
    }
    TherapySettingsLabel() {
        return this._therapyScreen.OpenButton();
    }
    async OpenTherapySettings() {
        await this._therapyScreen.Open();
        return this._therapyScreen;
    }
    SupportHeader() {
        return match.accessible.Header(this.screenText.Support);
    }
    SupportLabel() {
        return this._supportScreen.OpenButton();
    }
    ConfigurationHeader() {
        return match.accessible.Header(this.screenText.Configuration);
    }
    async OpenSupport() {
        await this.SwipeUpUntilVisible(this.SupportLabel());
        await this._supportScreen.Open();
        return this._supportScreen;
    }
    async OpenDeliveryLimitsScreen() {
        return this._therapyScreen.OpenDeliveryLimitsScreen();
    }
    async OpenCorrectionRangeScreen() {
        return this._therapyScreen.OpenCorrectionRangeScreen();
    }
    async OpenInsulinSensitivitiesScreen() {
        return this._therapyScreen.OpenInsulinSensitivitiesScreen();
    }
    async OpenSuspendThresholdScreen() {
        return this._therapyScreen.OpenSuspendThresholdScreen();
    }
    async OpenSuspendThresholdScreen() {
        return this._therapyScreen.OpenSuspendThresholdScreen();
    }
    async OpenCarbRatioScreen() {
        return this._therapyScreen.OpenCarbRatioScreen();
    }
    async OpenBasalRateScreen() {
        return this._therapyScreen.OpenBasalRateScreen();
    }
    async setDeliveryLimits(deliveryLimits) {
        var limits = await this._therapyScreen.OpenDeliveryLimitsScreen();
        await limits.OpenBasalRatePicker();
        await limits.ApplyBasal(deliveryLimits.basal);
        await limits.OpenBasalRatePicker();
        await limits.OpenBolusPicker();
        await limits.ApplyBolus(deliveryLimits.bolus);
        await limits.OpenBolusPicker();
        await limits.SaveAndClose();
        await limits.Authenticate();
    }
    /**
     * @param {object} correctionRange
     * @param {object} correctionRange.expected
     * @param {number} correctionRange.expected.max
     * @param {number} correctionRange.expected.min
     */
    async setCorrectionRange(correctionRange) {
        var correction = await this._therapyScreen.OpenCorrectionRangeScreen();
        await correction.Plus();
        await correction.ApplyOne(correctionRange);
        await correction.Add();
        await correction.SaveAndClose();
        await correction.Authenticate();
    }
}

module.exports = SettingsScreen;
