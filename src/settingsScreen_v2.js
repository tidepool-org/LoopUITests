const match = require('./match');
const { settingsSubScreen } = require('./settingScreen/index');

class SettingsScreenv2 {
    constructor(language) {
        this.language = language;
    }
    async Open() {
        await match.accessible.ItemWithLabel(this.language.settingsScreen.NewSettings).atIndex(1).tap();
    }
    async Close() {
        await this.DoneButton().tap();
    }
    async OpenTherapySettingsScreen() {
        await this.TherapySettingsLabel().tap();
    }
    DoneButton() {
        return match.accessible.ButtonBarButtonWithLabel(this.language.general.Done);
    }
    TherapySettingsLabel() {
        return match.accessible.ItemWithLabel('Therapy Settings');
    }
    async ScrollToBottom() {
        try {
            await expect(this.ServicesHeader()).toBeVisible();
        } catch (err) {
            await match.ScrollableView().atIndex(1).swipe('up');
        }
    }
    async ScrollToTop() {
        try {
            await expect(this.PumpHeader()).toBeVisible();
        } catch (err) {
            await match.ScrollableView().atIndex(1).swipe('down');
        }
    }
    async SetClosedLoop() {
        await this.ScrollToTop();
        const attributes = await this.ClosedLoopButton().getAttributes();
        if (attributes.elements[0].value == '0') {
            await this.ClosedLoopButton().tap();
        }
    }
    async SetOpenLoop() {
        await this.ScrollToTop();
        const attributes = await this.ClosedLoopButton().getAttributes();
        if (attributes.elements[0].value == '1') {
            await this.ClosedLoopButton().tap();
        }
    }
}

module.exports = {
    SettingsScreenv2
};
