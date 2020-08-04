const match = require('../match');

const GlucoseScreen = require('./glucoseScreen');
const ActiveInsulinScreen = require('./activeInsulinScreen');
const InsulinDeliveryScreen = require('./insulinDeliveryScreen');
const ActiveCarbohydratesScreen = require('./activeCarbohydratesScreen');
const Header = require('./header');
const SettingsScreen = require('../settings/index');
const CarbEntryScreen = require('../carbEntry/index');
const BolusScreen = require('../bolus/index');
const CustomPresetScreen = require('../customPreset/index');

const Devices = require('../devices/index');

class HomeScreen {
    constructor(language, settingsScreenDefaults) {
        this.glucoseScreen = new GlucoseScreen(language);
        this.activeInsulinScreen = new ActiveInsulinScreen(language);
        this.insulinDeliveryScreen = new InsulinDeliveryScreen(language);
        this.activeCarbohydratesScreen = new ActiveCarbohydratesScreen(language);
        this.settingsScreen = new SettingsScreen(language, new Devices(language, false), settingsScreenDefaults);
        this.bolusScreen = new BolusScreen(language);
        this.carbEntryScreen = new CarbEntryScreen(language);
        this.header = new Header(language, new Devices(language, true));
        this.customPresetScreen = new CustomPresetScreen(language);
        this.language = language;
    }
    HeaderSection() {
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
    CustomPresetButton() {
        return this.customPresetScreen.OpenButton();
    }
    AddMealButton() {
        return this.carbEntryScreen.OpenButton();
    }
    BolusButton() {
        return this.bolusScreen.OpenButton();
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
        await this.settingsScreen.Open();
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
    async OpenCustomPresetScreen() {
        await this.customPresetScreen.Open();;
        return this.customPresetScreen;
    }
}

module.exports = HomeScreen;
