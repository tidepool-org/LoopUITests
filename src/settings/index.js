const match = require('../match');
// const { BasalRatesScreen } = require('./basalRatesScreen');
// const { CarbRatioScreen } = require('./carbRatioScreen');
// const { CorrectionRangeScreen } = require('./correctionRangeScreen');
// const { DeliveryLimitsScreen } = require('./deliveryLimitsScreen');
// const { InsulinSensitivitiesScreen } = require('./insulinSensitivitiesScreen');
// const { SuspendThresholdScreen } = require('./suspendThresholdScreen');
// const { IssueReportScreen } = require('./issueReportScreen');
// const { InsulinModelScreen } = require('./insulinModelScreen');

const AlertScreen = require('./alertScreen');
const SupportScreen = require('./supportScreen');
const TherapyScreen = require('./therapyScreen');
const base = require('../base/index');

class SettingsScreen extends base.Screen {
    constructor(language, devices) {
        super({
            screenText: language.settingsScreen,
            generalText: language.general,
            open: {
                isBtn: true,
                label: language.settingsScreen.NewSettings,
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
        this.therapyScreen = new TherapyScreen(language);
        this.supportScreen = new SupportScreen(language);
    }
    Devices() {
        return this.devices;
    }
    /**
     * @override
     */
    BackButtonControl() {
        return match.accessible.ButtonBarButton(this.generalText.Done);
    }
    /**
     * @override
     */
    OpenButtonControl() {
        return match.accessible.ClickableLabel(this.screenText.NewSettings).atIndex(2);
    }
    /**
     * @summary hack while we have two settings pages
     */
    async BackToHome() {
        await match.accessible.Button(this.generalText.Done).atIndex(2).tap();
        await match.accessible.ButtonBarButton(this.generalText.Done).tap();
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
        return this.therapyScreen.OpenButtonControl();
    }
    async OpenTherapySettings() {
        await this.therapyScreen.OpenAction();
        return this.therapyScreen;
    }
    SupportHeader() {
        return match.accessible.Header('Support');
    }
    SupportLabel() {
        return this.supportScreen.OpenButtonControl();
    }
    ConfigurationHeader() {
        return match.accessible.Header('Configuration');
    }
    async OpenSupport() {
        await this.ScrollToBottomAction();
        await this.supportScreen.OpenAction();
        return this.supportScreen;
    }
    AlertPermissonsLabel() {
        return this.alertScreen.OpenButtonControl();
    }
    async OpenAlerts() {
        await this.alertScreen.OpenAction();
        return this.alertScreen;
    }
}

module.exports = SettingsScreen;
