const match = require('./match');
const { Label, StatusLabel } = require('./labels');

class Status {
    async OpenActiveCarbohydratesChart() {
        await match.accessible.Label(StatusLabel.ActiveCarbohydrates).tap();
    }
    async OpenActiveInsulinChart() {
        await match.accessible.Label(StatusLabel.ActiveInsulin).tap();
    }
    async OpenInsulinDeliveryChart() {
        await match.accessible.Label(StatusLabel.InsulinDelivery).tap();
    }
    async OpenGlucoseChart() {
        await match.accessible.Label(StatusLabel.ActiveCarbohydrates).tap();
    }
    async CloseChart() {
        await match.accessible.BackButton(Label.Status).tap();
    }
    async ExpectLoopNotYetRun() {
        await expect(match.loop.Icon()).toHaveLabel(StatusLabel.LoopWaitingForFirstRun);
    }
    async TapLoopIcon() {
        await waitFor(match.loop.Icon()).toBeVisible().withTimeout(2000);
        await match.loop.Icon().tap();
    }
    async ExpectLoopStatusAlert(expectedAlertText) {
        await this.TapLoopIcon();
        await waitFor(match.accessible.AlertLabel(expectedAlertText)).toExist().withTimeout(2000);
        await match.accessible.Button(Label.OK).tap();
    }
}

module.exports = { Status };
