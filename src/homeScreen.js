const match = require('./match');
const { Label, HomeLabel, TempOverrideLabel, SettingsLabel, CarbsLabel, BolusLabel } = require('./labels');

class HomeScreen {
    /**
     * @example home.ActiveCarbohydratesLabel().tap();
     */
    ActiveCarbohydratesLabel() {
        return match.accessible.Label(HomeLabel.ActiveCarbohydrates);
    }
    /**
     * @example home.ActiveInsulinLabel().tap();
     */
    ActiveInsulinLabel() {
        return match.accessible.Label(HomeLabel.ActiveInsulin);
    }
    InsulinDeliveryLabel() {
        return match.accessible.Label(HomeLabel.InsulinDelivery);
    }
    GlucoseLabel() {
        return match.accessible.Label(HomeLabel.Glucose);
    }
    SettingsButton() {
        return match.accessible.Button(SettingsLabel.Settings);
    }
    OverridesButton() {
        return match.accessible.Button(TempOverrideLabel.WorkoutTargets);
    }
    AddMealButton() {
        return match.accessible.Button(CarbsLabel.AddMeal);
    }
    BolusButton() {
        return match.accessible.Button(BolusLabel.Bolus);
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
