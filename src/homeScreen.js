const match = require('./match');

const { home } = require('./homeScreen/index');
const { SettingsScreen } = require('./settingsScreen');
const { CarbEntryScreen } = require('./carbEntryScreen');
const { BolusScreen } = require('./bolusScreen');

class HomeScreen {
    constructor(language, settingsScreenDefaults) {

        this.glucoseScreen = new home.GlucoseScreen(language);
        this.activeInsulinScreen = new home.ActiveInsulinScreen(language);
        this.insulinDeliveryScreen = new home.InsulinDeliveryScreen(language);
        this.activeCarbohydratesScreen = new home.ActiveCarbohydratesScreen(language);
        this.settingsScreen = new SettingsScreen(language, settingsScreenDefaults);
        this.bolusScreen = new BolusScreen(language);
        this.carbEntryScreen = new CarbEntryScreen(language);
        this.header = new home.Header(language);

        this.language = language;
    }
    Header() {
        return this.header;
    }
    ActiveCarbohydratesLabel() {
        return match.accessible.Label(this.language.homeScreen.ActiveCarbohydrates);
    }
    ActiveInsulinLabel() {
        return match.accessible.Label(this.language.homeScreen.ActiveInsulin);
    }
    InsulinDeliveryLabel() {
        return match.accessible.Label(this.language.homeScreen.InsulinDelivery);
    }
    GlucoseLabel() {
        return match.accessible.Label(this.language.homeScreen.Glucose);
    }
    SettingsButton() {
        return match.accessible.Button(this.language.settingsScreen.Settings);
    }
    OverridesButton() {
        return match.accessible.Button(this.language.overridesScreen.WorkoutTargets);
    }
    AddMealButton() {
        return match.accessible.Button(this.language.carbEntryScreen.AddMeal);
    }
    BolusButton() {
        return match.accessible.Button(this.language.bolusScreen.Header);
    }
    async OpenActiveCarbohydratesChart() {
        await this.ActiveCarbohydratesLabel().tap();
        return this.activeCarbohydratesScreen;
    }
    async OpenActiveInsulinChart() {
        await this.ActiveInsulinLabel().tap();
        return this.activeInsulinScreen;
    }
    async OpenInsulinDeliveryChart() {
        await this.InsulinDeliveryLabel().tap();
        return this.insulinDeliveryScreen;
    }
    async OpenGlucoseChart() {
        await this.GlucoseLabel().tap();
        return this.glucoseScreen;
    }
    async OpenSettingsScreen() {
        await this.SettingsButton().tap();
        return this.settingsScreen;
    }
    async OpenCarbEntryScreen() {
        await this.AddMealButton().tap();
        return this.carbEntryScreen;
    }
    async OpenBolusScreen() {
        await this.BolusButton().tap();
        return this.bolusScreen;
    }
    async CloseChart() {
        await match.accessible.BackButton(this.language.general.Status).tap();
    }
    async ExpectLoopNotYetRun() {
        await expect(match.loop.Icon()).toHaveLabel(this.language.homeScreen.LoopWaitingForFirstRun);
    }
    async TapLoopIcon() {
        await match.loop.Icon().tap();
    }
    async ExpectLoopStatusCarbsAlert() {
        await this.TapLoopIcon();
        await expect(match.accessible.AlertLabel(this.language.general.Alert.MissingCarbEffects)).toExist();
        await match.accessible.Button(this.language.general.OK).tap();
    }
    async ExpectLoopStatusInsulinAlert() {
        await this.TapLoopIcon();
        await expect(match.accessible.AlertLabel(this.language.general.Alert.MissingInsulinEffects)).toExist();
        await match.accessible.Button(this.language.general.OK).tap();
    }
    async ExpectLoopStatusConfigurationAlert() {
        await this.TapLoopIcon();
        await expect(match.accessible.AlertLabel(this.language.general.Alert.ConfigurationError)).toExist();
        await match.accessible.Button(this.language.general.OK).tap();
    }
    async ExpectLoopStatusGlucoseDataAlert() {
        await this.TapLoopIcon();
        await expect(match.accessible.AlertLabel(this.language.general.Alert.MissingGlucoseData)).toExist();
        await match.accessible.Button(this.language.general.OK).tap();
    }
    async ExpectSuccessfulLoop() {
        await this.TapLoopIcon();
        await expect(match.accessible.Alert()).toNotExist();
    }
}

module.exports = { HomeScreen };
