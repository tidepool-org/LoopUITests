const match = require('./match');
const { settingsSubScreen } = require('./settingScreen/index');

const { base } = require('./base/index');

class SettingsScreenv2 extends base.Screen {
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
    }
    OpenButton() {
        return match.accessible.ClickableLabel(this.screenText.NewSettings).atIndex(2);
    }
    async OpenTherapySettingsScreen() {
        await this.TherapySettingsLabel().tap();
    }
    async AddPump() {
        await match.accessible.Button('Add Pump\nTap here to set up a pump').tap();
        await match.accessible.Button(this.screenText.Simulator).tap();
        await match.accessible.Button(this.generalText.Continue).tap();
    }
    async AddCGM() {
        await match.accessible.Button('Add CGM\nTap here to set up a CGM').tap();
        await match.accessible.Button(this.screenText.Simulator).tap();
    }
    _closedLoopButton() {
        return match.accessible.Button('Closed Loop').atIndex(4);
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
}

module.exports = {
    SettingsScreenv2
};
