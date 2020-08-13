const match = require('../match');
const CorrectionRangeScreen = require('./correctionRangeScreen');
const DeliveryLimitsScreen = require('./deliveryLimitsScreen');

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
        this.deliveryLimitsScreen = new DeliveryLimitsScreen(language, config.deliveryLimit);
        this.correctionRangeScreen = new CorrectionRangeScreen(language, config.correctionRange);
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
        await this._closeNewSettings();
        await match.accessible.ButtonBarButton(this.generalText.Done).tap();
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
        return this.deliveryLimitsScreen.Open();
    }
    async OpenCorrectionRangeScreen() {
        await this._closeNewSettings();
        return this.correctionRangeScreen.Open();
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
