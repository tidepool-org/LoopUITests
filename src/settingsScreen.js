const match = require('./match');
const { settingsSubScreen } = require('./settingScreen/index');

const { base } = require('./base/index');

class SettingsScreen extends base.Screen {
    constructor(language) {
        super({
            openClickableLabel: language.settingsScreen.NewSettings,
            screenText: language.settingsScreen,
            generalText: language.general,
            backLabel: language.general.Done,
            scroll: {
                visibleBottomLabel: language.settingsScreen.Supportv2,
                visibleTopLabel: language.settingsScreen.ClosedLoop,
            },
        });
        this.cgmSimulatorScreen = new settingsSubScreen.CGMSimulatorScreen(language);
        this.pumpSimulatorScreen = new settingsSubScreen.PumpSimulatorScreen(language);
        this.alertScreen = new settingsSubScreen.AlertScreen(language);
        this.therapyScreen = new settingsSubScreen.TherapyScreen(language);
        this.supportScreen = new settingsSubScreen.SupportScreen(language);
    }
    /**
     * @override
     */
    BackButton() {
        return match.accessible.ButtonBarButton(this.generalText.Done);
    }
    /**
     * @summary hack while we have two settings pages
     */
    async BackToHome() {
        await match.accessible.Button(this.generalText.Done).atIndex(2).tap();
        await match.accessible.ButtonBarButton(this.generalText.Done).tap();
    }
    OpenButton() {
        return match.accessible.ClickableLabel(this.screenText.NewSettings).atIndex(2);
    }
    AddPumpButton() {
        return match.accessible.Button(this.screenText.AddPump);
    }
    async AddPump() {
        await this.AddPumpButton().tap();
        await match.accessible.Button(this.screenText.Simulator).tap();
        await match.accessible.Button(this.generalText.Continue).tap();
    }
    async OpenPumpScreen() {
        await match.accessible.Id(this.screenText.SimulatorPump).tap();
        return this.pumpSimulatorScreen;
    }
    AddCGMButton() {
        return match.accessible.Button(this.screenText.AddCGM);
    }
    async AddCGM() {
        await this.AddCGMButton().tap();
        await match.accessible.Button(this.screenText.Simulator).tap();
    }
    async OpenCGMScreen() {
        await match.accessible.ClickableLabel(this.screenText.Simulator).atIndex(1).tap();
        return this.cgmSimulatorScreen;
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
        return match.accessible.Header('Support');
    }
    SupportLabel() {
        return this.supportScreen.OpenButton();
    }
    ConfigurationHeader() {
        return match.accessible.Header('Configuration');
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
}

module.exports = {
    SettingsScreen
};
