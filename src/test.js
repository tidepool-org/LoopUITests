/* eslint-disable no-undef */
const StatusScreen = require('./status/index').Screen;
const { screenName } = require('./properties');
const Utilities = require('./utilities');

async function _warmup(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

class Test {
  /**
   * @summary test setup configuration
   * @param {object} setup
   * @param {object} setup.language required
   * @param {object} setup.screenDefaults required
   *
   * @param {boolean} setup.reuseApp optional
   * @param {object} setup.warmupPeriod optional
   * @param {numeber} setup.warmupPeriod.milliseconds optional
   *
   * @param {object} setup.scenario optional
   * @param {boolean} setup.enableTherapySettings optional
   *
   * @param {object} setup.authentication optional
   * @param {boolean} setup.authentication.faceid
   *
   * @param {object} setup.simulators optional
   * @param {boolean} setup.simulators.cgm
   * @param {boolean} setup.simulators.pump
   *
   * @param {boolean} setup.enableClosedLoop optional
   *
   * @param {object} setup.cgmData optional
   * @param {object} setup.cgmData.model
   * @param {atring} setup.cgmData.model.name
   * @param {array} setup.cgmData.model.bgValues
   * @param {object} setup.cgmData.frequency
   * @param {boolean} setup.cgmData.frequency.seconds
   * @param {boolean} setup.cgmData.frequency.minutes
   * @param {object} setup.cgmData.history
   * @param {string} setup.cgmData.history.name
   * @param {number} setup.cgmData.history.backfillHours
   */
  setup(setup) {
    this._language = setup.language;
    this._limits = setup.limits;
    this._warmupPeriod = setup.warmupPeriod;
    this._screenDefaults = setup.screenDefaults;
    this._scenario = setup.scenario;
    this._therapySettings = setup.enableTherapySettings;
    this._authenticate = setup.authentication;
    this._simulators = setup.simulators;
    this._closedLoop = setup.enableClosedLoop;
    this._cgmData = setup.cgmData;
    this._startScreen = screenName.status;
    return this;
  }

  async _setupCGMData() {
    if (this._cgmData) {
      let cgmScreen = await this.OpenCGMScreen();
      await cgmScreen.Apply(this._cgmData);
    }
  }

  async _setStartScreen() {
    if (this._startScreen) {
      switch (this._startScreen) {
        case screenName.settings:
          await this.OpenSettingsScreen();
          break;
        case screenName.bolus:
          await this.OpenBolusScreen();
          break;
        case screenName.carbEntry:
          await this.OpenCarbEntryScreen();
          break;
        default:
          break;
      }
    }
  }

  async _launchLoop() {
    let loopAppPermissions = { notifications: 'YES', health: 'YES' };
    let biometricEnrollment = false;
    if (this._authenticate) {
      biometricEnrollment = true;
      loopAppPermissions.faceid = 'YES';
    }
    await device.launchApp({ permissions: loopAppPermissions, launchArgs: { detoxDebugVisibility: 'YES' } });
    await device.setBiometricEnrollment(biometricEnrollment);
  }

  _filterSettings(values, types) {
    const filtered = values;
    if (types) {
      for (const settingType of types) {
        delete filtered[settingType];
      }
    }
    return filtered;
  }

  async prepare() {
    if (!this._language) {
      throw 'language is required!';
    }
    if (!this._screenDefaults) {
      throw 'screenDefaults are required!';
    }
    this.statusScreen = new StatusScreen(this._language, this._screenDefaults);
    this.LoopUtilities = new Utilities(this);
    await this._launchLoop();
    if (this._therapySettings) {
      await this.LoopUtilities.bypassTidepoolOnboarding();
      await this.LoopUtilities.loadTherapySettings();
    }
    await this._setSimulators();
    if (this._scenario) {
      await this.LoopUtilities.loadScenario(this._scenario);
    }
    await this._holdForWarmup();
    await this._setLoopMode();
    await this._setStartScreen();
  }

  async closeAndRelaunch() {
    await device.sendToHome();
    await device.launchApp({ newInstance: false });
  }

  async _setLoopMode() {
    if (this._closedLoop) {
      await this.LoopUtilities.closeLoop();
    }
  }

  async _setSimulators() {
    if (this._simulators) {
      if (this._simulators.cgm) {
        await this.LoopUtilities.addCGM();
        await this._setupCGMData();
      }
      if (this._simulators.pump) {
        await this.LoopUtilities.addUnconfiguredPump();
      }
    }
  }

  async _holdForWarmup() {
    if (this._warmupPeriod) {
      await _warmup(this._warmupPeriod.milliseconds);
    }
  }

  getLimitsForSetting(settingType) {
    return this._limits[settingType];
  }

  async OpenPumpScreen() {
    let screen = await this.statusScreen.HeaderSection.Devices.OpenPumpScreen();
    return screen;
  }

  async OpenCGMScreen() {
    let screen = await this.statusScreen.HeaderSection.Devices.OpenCGMScreen();
    return screen;
  }

  async OpenSettingsScreen() {
    return this.statusScreen.OpenSettingsScreen();
  }

  get SettingsScreen() {
    return this.statusScreen.SettingsScreen;
  }

  async OpenTherapySettingsScreen() {
    let settings = await this.OpenSettingsScreen();
    return settings.OpenTherapySettings();
  }

  get TherapySettingsScreen() {
    return this.SettingsScreen.TherapySettingsScreen;
  }

  async OpenCarbEntryScreen() {
    return this.statusScreen.OpenCarbEntryScreen(this.LoopUtilities.inClosedLoopMode);
  }

  async OpenBolusScreen() {
    return this.statusScreen.OpenBolusScreen(this.LoopUtilities.inClosedLoopMode);
  }

  async OpenCustomPresetScreen() {
    return this.statusScreen.OpenCustomPresetScreen();
  }

  async OpenStatusScreen() {
    return this.statusScreen;
  }

  get CGMData() {
    return this._cgmData;
  }

  get inClosedLoopMode() {
    return this.LoopUtilities.inClosedLoopMode;
  }
}

module.exports = {
  Test,
};
