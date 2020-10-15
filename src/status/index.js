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

class StatusScreen {
    constructor(language, settingsScreenDefaults) {
        this._glucoseScreen = new GlucoseScreen(language);
        this._activeInsulinScreen = new ActiveInsulinScreen(language);
        this._insulinDeliveryScreen = new InsulinDeliveryScreen(language);
        this._activeCarbohydratesScreen = new ActiveCarbohydratesScreen(language);
        this._settingsScreen = new SettingsScreen(language, new Devices(language, false), settingsScreenDefaults);
        this._bolusScreen = new BolusScreen(language);
        this._carbEntryScreen = new CarbEntryScreen(language);
        this._customPresetScreen = new CustomPresetScreen(language);
        this._headerSection = new Header(language, new Devices(language, true));
    }
    get HeaderSection() {
        return this._headerSection;
    }
    get ActiveCarbohydratesLabel() {
        return this._activeCarbohydratesScreen.OpenButton;
    }
    get ActiveInsulinLabel() {
        return this._activeInsulinScreen.OpenButton;
    }
    get InsulinDeliveryLabel() {
        return this._insulinDeliveryScreen.OpenButton;
    }
    get GlucoseLabel() {
        return this._glucoseScreen.OpenButton;
    }
    get SettingsButton() {
        return this._settingsScreen.OpenButton;
    }
    get CustomPresetButton() {
        return this._customPresetScreen.OpenButton;
    }
    get AddMealButton() {
        return this._carbEntryScreen.OpenButton;
    }
    get BolusButton() {
        return this._bolusScreen.OpenButton;
    }
    Alert(label) {
        return match.accessible.AlertLabel(label);
    }
    async OpenActiveCarbohydratesChart() {
        await this.ActiveCarbohydratesLabel.tap();
        return this._activeCarbohydratesScreen;
    }
    async OpenActiveInsulinChart() {
        await this.ActiveInsulinLabel.tap();
        return this._activeInsulinScreen;
    }
    async OpenInsulinDeliveryChart() {
        await this.InsulinDeliveryLabel.tap();
        return this._insulinDeliveryScreen;
    }
    async OpenGlucoseChart() {
        await this.GlucoseLabel.tap();
        return this._glucoseScreen;
    }
    async OpenSettingsScreen() {
        await this.SettingsButton.tap();
        return this._settingsScreen;
    }
    async OpenCarbEntryScreen() {
        await this.AddMealButton.tap();
        return this._carbEntryScreen;
    }
    async OpenBolusScreen() {
        await this.BolusButton.tap();
        return this._bolusScreen;
    }
    async OpenCustomPresetScreen() {
        await this.CustomPresetButton.tap();
        return this._customPresetScreen;
    }
}

module.exports = StatusScreen;
