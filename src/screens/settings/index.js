const match = require('../../match');

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
        });
        this._devices = devices;
        this._therapyScreen = new TherapyScreen(language, config);
        this._supportScreen = new SupportScreen(language);
    }
    get Devices() {
        return this._devices;
    }
    get LoopSwitchButton() {
        return match.accessible.SwitchButton(this.screenText.ClosedLoop);
    }
    get TherapySettingsLabel() {
        return this._therapyScreen.OpenButton;
    }
    get SupportHeader() {
        return match.accessible.Header(this.screenText.Support);
    }
    get SupportLabel() {
        return this._supportScreen.OpenButton;
    }
    get ConfigurationHeader() {
        return match.accessible.Header(this.screenText.Configuration);
    }
    async ClosedLoop() {
        const isOn = await this.IsButtonOn(this.LoopSwitchButton);
        if (!isOn) {
            await this.LoopSwitchButton.longPress();
        }
    }
    async OpenLoop() {
        const isOn = await this.IsButtonOn(this.LoopSwitchButton);
        if (isOn) {
            await this.LoopSwitchButton.longPress();
        }
    }
    get TherapySettingsScreen() {
        return this._therapyScreen;
    }
    async OpenTherapySettings() {
        await this._therapyScreen.OpenButton.tap();
        return this.TherapySettingsScreen;
    }
    async OpenSupport() {
        await this.SwipeUpUntilVisible(this.SupportLabel);
        await this._supportScreen.OpenButton.tap();
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
    async OpenGlucoseSafetyLimitScreen() {
        return this._therapyScreen.OpenGlucoseSafetyLimitScreen();
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
        await limits.SaveButton.tap();
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
        await correction.PlusButton.tap();
        await correction.ApplyOne(correctionRange);
        await correction.AddButton.tap();
        await correction.SaveButton.tap();
        await correction.Authenticate();
    }
}

module.exports = SettingsScreen;
