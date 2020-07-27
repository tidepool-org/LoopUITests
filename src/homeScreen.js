const match = require('./match');

const { home } = require('./homeScreen/index');
const { SettingsScreen } = require('./settingsScreen');

const { SettingsScreenv2 } = require('./settingsScreen_v2');
const { CarbEntryScreen } = require('./carbEntryScreen');
const { BolusScreen } = require('./bolusScreen');

class HomeScreen {
    constructor(language, settingsScreenDefaults) {
        this.glucoseScreen = new home.GlucoseScreen(language);
        this.activeInsulinScreen = new home.ActiveInsulinScreen(language);
        this.insulinDeliveryScreen = new home.InsulinDeliveryScreen(language);
        this.activeCarbohydratesScreen = new home.ActiveCarbohydratesScreen(language);
        this.settingsScreen = new SettingsScreen(language, settingsScreenDefaults);
        this.settingsScreenv2 = new SettingsScreenv2(language);
        this.bolusScreen = new BolusScreen(language);
        this.carbEntryScreen = new CarbEntryScreen(language);
        this.header = new home.Header(language);

        this.language = language;
    }
    Header() {
        return this.header;
    }
    ActiveCarbohydratesLabel() {
        return this.activeCarbohydratesScreen.OpenButton();
    }
    ActiveInsulinLabel() {
        return this.activeInsulinScreen.OpenButton();
    }
    InsulinDeliveryLabel() {
        return this.insulinDeliveryScreen.OpenButton();
    }
    GlucoseLabel() {
        return this.glucoseScreen.OpenButton();
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
        await this.settingsScreenv2.Open();
        console.log('about to return ...');
        return this.settingsScreenv2;
    }
    async OpenCarbEntryScreen() {
        await this.AddMealButton().tap();
        return this.carbEntryScreen;
    }
    async OpenBolusScreen() {
        await this.BolusButton().tap();
        return this.bolusScreen;
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
