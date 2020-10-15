/* eslint-disable no-undef */
const match = require('./match');
const exec = require('child_process').exec;

module.exports = class Utilities {
    constructor(testApp) {
        this._testApp = testApp;
        this._language = testApp._language;
    }
    async _loadDeviceScenariosFromDisk() {
        let deviceId = device.id;
        const _loadDeviceScenariosFromDiskShellScript = exec(`${__dirname}/../scripts/load_scenarios.sh ${deviceId}`);
        _loadDeviceScenariosFromDiskShellScript.stdout.on('data', () => {
            return null;
        });
        _loadDeviceScenariosFromDiskShellScript.stderr.on('data', (data) => {
            throw Error(data);
        });
    }
    async loadScenario(scenarioName) {
        await this._loadDeviceScenariosFromDisk();
        await device.shake();
        await expect(match.accessible.TextLabel(scenarioName)).toExist();
        await match.accessible.TextLabel(scenarioName).tap();
        await match.accessible.ButtonBarButton('Load').tap();
    }
    async closeLoop() {
        let settingsScreen = await this._testApp.OpenSettingsScreen();
        await settingsScreen.ClosedLoop();
        await settingsScreen.BackButton.tap();
    }
    async openLoop() {
        let settingsScreen = await this._testApp.OpenSettingsScreen();
        await settingsScreen.OpenLoop();
        await settingsScreen.BackButton.tap();
    }
    async advanceScenario(scenarioName, cycles) {
        await device.shake();
        await expect(match.accessible.TextLabel(scenarioName)).toExist();
        await match.accessible.TextLabel(scenarioName).swipe('left');
        await match.accessible.SwipeButton('Advance ⏭').tap();
        await match.UITextField().typeText(cycles);
        await match.accessible.Button(this._language.general.OK).tap();
    }
    async deliverBolus(bolusUnits) {
        let bolusScreen = await this._testApp.OpenBolusScreen();
        await bolusScreen.SetBolusAmount(bolusUnits);
        await bolusScreen.Deliver();
        await bolusScreen.Authenticate();
    }
    async addCarbohydratesAndDeliverBolus(carbohydratesAmount) {
        let carbEntryScreen = await this._testApp.OpenCarbEntryScreen();
        await carbEntryScreen.SetCarbs(carbohydratesAmount);
        let bolusScreen = await carbEntryScreen.ContinueToBolus();
        await bolusScreen.SaveAndDeliverButton.tap();
        await bolusScreen.Authenticate();
    }
    async addCarbohydrates(carbohydratesAmount) {
        let carbEntryScreen = await this._testApp.OpenCarbEntryScreen();
        await carbEntryScreen.SetCarbs(carbohydratesAmount);
        let bolusScreen = await carbEntryScreen.ContinueToBolus();
        await bolusScreen.SaveWithoutBolusButton.tap();
        await bolusScreen.Authenticate();
    }
    async updateInsulinReservoir(remainingUnits) {
        let pumpScreen = await this._testApp.OpenPumpScreen();
        await pumpScreen.Apply({ reservoirRemaining: remainingUnits });
        await pumpScreen.BackButton.tap();
    }
    async updatePumpBattery(percentRemaining) {
        let pumpScreen = await this._testApp.OpenPumpScreen();
        await pumpScreen.Apply({ batteryRemaining: percentRemaining });
        await pumpScreen.BackButton.tap();
    }
    async loadTherapySettings() {
        await device.shake();
        await match.accessible.TextLabel('Mock Therapy Settings').tap();
    }
    async addConfiguredPump() {
        await this.addUnconfiguredPump();
        await this.loadTherapySettings();
    }
    async addUnconfiguredPump() {
        let statusScreen = await this._testApp.OpenStatusScreen();
        await statusScreen.HeaderSection.Devices.AddPump();
    }
    async addCGM() {
        let statusScreen = await this._testApp.OpenStatusScreen();
        await statusScreen.HeaderSection.Devices.AddCGM();
    }
}
