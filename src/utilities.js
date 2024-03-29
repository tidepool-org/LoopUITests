/* eslint-disable no-undef */
const exec = require('child_process').exec;
const match = require('./match');

module.exports = class Utilities {
  constructor(testApp) {
    this._testApp = testApp;
    this._language = testApp._language;
    this._looping = false;
  }

  async _loadDeviceScenariosFromDisk() {
    let deviceId = device.id;
    const _loadDeviceScenariosFromDiskShellScript = exec(
      `${__dirname}/../scripts/load_scenarios.sh ${deviceId}`,
    );
    _loadDeviceScenariosFromDiskShellScript.stdout.on('data', () => null);
    _loadDeviceScenariosFromDiskShellScript.stderr.on('data', (data) => {
      throw Error(data);
    });
  }

  async _bringUpDebugMenu() {
      await device.shake();
  }

  async loadScenario(scenarioName) {
    await this._loadDeviceScenariosFromDisk();
    await this._bringUpDebugMenu();
    await expect(match.accessible.TextLabel(scenarioName)).toExist();
    await match.accessible.TextLabel(scenarioName).tap();
    await match.accessible.ButtonBarButton('Load').tap();
  }

  get inClosedLoopMode() {
    return this._looping;
  }

  async closeLoop() {
    let settingsScreen = await this._testApp.OpenSettingsScreen();
    await settingsScreen.ClosedLoop();
    this._looping = true;
    await settingsScreen.CloseModal();
  }

  async openLoop() {
    let settingsScreen = await this._testApp.OpenSettingsScreen();
    await settingsScreen.OpenLoop();
    this._looping = false;
    await settingsScreen.CloseModal();
  }

  async advanceScenario(scenarioName, cycles) {
    await this._bringUpDebugMenu();
    await expect(match.accessible.TextLabel(scenarioName)).toExist();
    await match.accessible.TextLabel(scenarioName).swipe('left');
    await match.accessible.SwipeButton('Advance ⏭').tap();
    await match.UITextField().typeText(cycles);
    await match.accessible.Button(this._language.general.OK).tap();
  }

  async deliverBolus(bolusUnits) {
    let bolusScreen = await this._testApp.OpenBolusScreen(this._looping);
    await bolusScreen.SetBolusAmount(bolusUnits);
    await bolusScreen.Deliver();
    await bolusScreen.Authenticate();
  }

  async addCarbohydratesAndDeliverBolus(carbohydratesAmount) {
    let carbEntryScreen = await this._testApp.OpenCarbEntryScreen();
    await carbEntryScreen.SetCarbs(carbohydratesAmount);
    let bolusScreen = await carbEntryScreen.ContinueToBolus();
    await bolusScreen.SaveAndDeliverButton.tap({ x: 20, y: 20 });
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
    await pumpScreen.OpenPumpControls();
    await pumpScreen.Apply({ reservoirRemaining: remainingUnits });
    await pumpScreen.BackButton.tap();
    await pumpScreen.DoneButton.tap();
  }

  async updatePumpBattery(percentRemaining) {
    let pumpScreen = await this._testApp.OpenPumpScreen();
    await pumpScreen.OpenPumpControls();
    await pumpScreen.Apply({ batteryRemaining: percentRemaining });
    await pumpScreen.BackButton.tap();
    await pumpScreen.DoneButton.tap();
  }

  async loadTherapySettings() {
    await this._bringUpDebugMenu();
    await match.accessible.Button('Mock Therapy Settings').tap();
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

  async bypassTidepoolOnboarding() {
    await match.accessible.Image('Tidepool Loop Welcome, page 1 of 7').longPress(4000);
    await match.accessible.AlertButton('Yes').tap();
  }
};
