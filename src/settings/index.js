const match = require('../match');

const AlertScreen = require('./alertScreen');
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
                backLabel: language.general.Close,
            },
            scroll: {
                visibleBottomLabel: language.settingsScreen.Supportv2,
                visibleTopLabel: language.settingsScreen.ClosedLoop,
            },
        });
        this.devices = devices;
        this.alertScreen = new AlertScreen(language);
        this.therapyScreen = new TherapyScreen(language, config);
        this.supportScreen = new SupportScreen(language);
    }
    Devices() {
        return this.devices;
    }
    /**
     * @override
     */
    BackButton() {
        return match.accessible.ButtonBarButton(this.generalText.Done);
    }
    /**
     * @override
     */
    OpenButton() {
        return match.accessible.ClickableLabel(this.screenText.Settings).atIndex(2);
    }
    /**
     * @summary hack while we have two settings pages
     */
    async BackToHome() {
        try {
            await this._closeNewSettings();
        } catch (err) {
            //pass through
        } finally {
            await match.accessible.ButtonBarButton(this.generalText.Done).tap();
        }
    }
    async _closeNewSettings() {
        await match.accessible.Button(this.generalText.Done).atIndex(2).tap();
    }
    _closedLoopButton() {
        return match.accessible.Button(this.screenText.ClosedLoop).atIndex(4);
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
        return this.therapyScreen.OpenButton();
    }
    async OpenTherapySettings() {
        await this.therapyScreen.Open();
        return this.therapyScreen;
    }
    SupportHeader() {
        return match.accessible.Header(this.screenText.Support);
    }
    SupportLabel() {
        return this.supportScreen.OpenButton();
    }
    ConfigurationHeader() {
        return match.accessible.Header(this.screenText.Configuration);
    }
    async OpenSupport() {
        await this.ScrollToBottom();
        await this.supportScreen.Open();
        return this.supportScreen;
    }
    AlertPermissonsLabel() {
        return this.alertScreen.OpenButton();
    }
    async OpenAlerts() {
        await this.alertScreen.Open();
        return this.alertScreen;
    }
    async OpenDeliveryLimitsScreen() {
        await this._closeNewSettings();
        await this.SwipeUp();
        return this.therapyScreen.OpenDeliveryLimitsScreen();
    }
    async OpenCorrectionRangeScreen() {
        await this._closeNewSettings();
        return this.therapyScreen.OpenCorrectionRangeScreen();
    }
    async OpenInsulinSensitivitiesScreen() {
        await this._closeNewSettings();
        await this.SwipeUp();
        return this.therapyScreen.OpenInsulinSensitivitiesScreen();
    }
    async OpenSuspendThresholdScreen() {
        await this._closeNewSettings();
        await this.SwipeUp();
        return this.therapyScreen.OpenSuspendThresholdScreen();
    }
    async OpenSuspendThresholdScreen() {
        await this._closeNewSettings();
        await this.SwipeUp();
        return this.therapyScreen.OpenSuspendThresholdScreen();
    }
    async OpenCarbRatioScreen() {
        await this._closeNewSettings();
        await this.SwipeUp();
        return this.therapyScreen.OpenCarbRatioScreen();
    }
    async OpenBasalRateScreen() {
        await this._closeNewSettings();
        await this.SwipeUp();
        return this.therapyScreen.OpenBasalRateScreen();
    }

    _newSettingsLabel() {
        return match.accessible.ClickableLabel(this.screenText.Settings).atIndex(0);
    }
    async setDeliveryLimits(deliveryLimits) {
        var limits = await this.OpenDeliveryLimitsScreen();
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
        var correction = await this.OpenCorrectionRangeScreen();
        await correction.Plus();
        await correction.ApplyOne(correctionRange);
        await correction.Add();
        await correction.SaveAndClose();
        await correction.Authenticate();
    }
}

module.exports = SettingsScreen;
