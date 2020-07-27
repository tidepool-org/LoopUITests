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
    async OpenTherapySettingsScreen() {
        await this.TherapySettingsLabel().tap();
    }
    async AddPump() {
        await match.accessible.Button(this.screenText.AddPump).tap();
        await match.accessible.Button(this.screenText.Simulator).tap();
        await match.accessible.Button(this.generalText.Continue).tap();
    }
    async OpenPumpScreen() {
        await match.accessible.Id(this.screenText.SimulatorPump).tap();
        return this.pumpSimulatorScreen;
    }
    async AddCGM() {
        await match.accessible.Button(this.screenText.AddCGM).tap();
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
        return match.accessible.ClickableLabel('chevron.right');
    }
    async OpenTherapySettings() {
        this.TherapySettingsLabel().tap();
    }
    SupportHeader() {
        return match.accessible.Header('Support');
    }
    SupportLabel() {
        return match.accessible.ClickableLabel('Support');
    }
    async OpenSupport() {
        this.SupportLabel().tap();
    }
    async CloseSupport() {
        match.accessible.BackButton('Settings').tap();
    }
}

module.exports = {
    SettingsScreen
};
