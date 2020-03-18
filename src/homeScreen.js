const match = require('./match');
const { Label, HomeLabel } = require('./labels');

class HomeScreen {
    async OpenActiveCarbohydratesChart() {
        await match.accessible.Label(HomeLabel.ActiveCarbohydrates).tap();
    }
    async OpenActiveInsulinChart() {
        await match.accessible.Label(HomeLabel.ActiveInsulin).tap();
    }
    async OpenInsulinDeliveryChart() {
        await match.accessible.Label(HomeLabel.InsulinDelivery).tap();
    }
    async OpenGlucoseChart() {
        await match.accessible.Label(HomeLabel.ActiveCarbohydrates).tap();
    }
    async CloseChart() {
        await match.accessible.BackButton(Label.Status).tap();
    }
    async ExpectLoopNotYetRun() {
        await expect(match.loop.Icon()).toHaveLabel(HomeLabel.LoopWaitingForFirstRun);
    }
    async TapLoopIcon() {
        await match.loop.Icon().tap();
    }
    async ExpectLoopStatusAlert(expectedAlertText) {
        await this.TapLoopIcon();
        await expect(match.accessible.AlertLabel(expectedAlertText)).toExist();
        await match.accessible.Button(Label.OK).tap();
    }
    async ExpectNoLoopStatusAlert() {
        await this.TapLoopIcon();
        await expect(match.accessible.Alert()).toNotExist();
    }
}

module.exports = { HomeScreen };
