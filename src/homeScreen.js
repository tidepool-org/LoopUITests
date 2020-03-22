const match = require('./match');
const { label } = require('./labels');

class HomeScreen {
    /**
     * @example home.ActiveCarbohydratesLabel().tap();
     */
    ActiveCarbohydratesLabel() {
        return match.accessible.Label(label.homeScreen.ActiveCarbohydrates);
    }
    /**
     * @example home.ActiveInsulinLabel().tap();
     */
    ActiveInsulinLabel() {
        return match.accessible.Label(label.homeScreen.ActiveInsulin);
    }
    InsulinDeliveryLabel() {
        return match.accessible.Label(label.homeScreen.InsulinDelivery);
    }
    GlucoseLabel() {
        return match.accessible.Label(label.homeScreen.Glucose);
    }
    SettingsButton() {
        return match.accessible.Button(label.settingsScreen.Settings);
    }
    OverridesButton() {
        return match.accessible.Button(label.overridesScreen.WorkoutTargets);
    }
    AddMealButton() {
        return match.accessible.Button(label.carbEntryScreen.AddMeal);
    }
    BolusButton() {
        return match.accessible.Button(label.bolusScreen.Bolus);
    }
    async OpenActiveCarbohydratesChart() {
        await this.ActiveCarbohydratesLabel().tap();
    }
    async OpenActiveInsulinChart() {
        await this.ActiveInsulinLabel().tap();
    }
    async OpenInsulinDeliveryChart() {
        await this.InsulinDeliveryLabel().tap();
    }
    async OpenGlucoseChart() {
        await this.GlucoseLabel().tap();
    }
    async CloseChart() {
        await match.accessible.BackButton(label.general.Status).tap();
    }
    async ExpectLoopNotYetRun() {
        await expect(match.loop.Icon()).toHaveLabel(label.homeScreen.LoopWaitingForFirstRun);
    }
    async TapLoopIcon() {
        await match.loop.Icon().tap();
    }
    async ExpectLoopStatusAlert(expectedAlertText) {
        await this.TapLoopIcon();
        await expect(match.accessible.AlertLabel(expectedAlertText)).toExist();
        await match.accessible.Button(label.general.OK).tap();
    }
    async ExpectNoLoopStatusAlert() {
        await this.TapLoopIcon();
        await expect(match.accessible.Alert()).toNotExist();
    }
}

module.exports = { HomeScreen };
