const HomeScreen = require('./home/index');
const exec = require('child_process').exec;
const match = require('./match');
const { screenName, settingType } = require('./properties');

class Test {
    /**
     * @summary test requirements
     * @param {object} required
     * @param {object} required.language
     * @param {object} required.screenDefaults
     */
    setRequired(required) {
        this.language = required.language;
        this.screenDefaults = required.screenDefaults;
        return this;
    }
    addLimits(limits) {
        this.limits = limits;
        return this;
    }
    addScenario(scenario) {
        this.scenario = scenario;
        return this;
    }
    addSettingsToApply(settingsToApply) {
        this.settingsToApply = settingsToApply;
        return this;
    }
    addSettingDefault(settingDefault) {
        this.settingDefault = settingDefault;
        return this;
    }
    addSettingsFilter(filter) {
        this.filter = filter;
        return this;
    }
    addTherapySettings() {
        this.therapySettings = true;
        return this;
    }
    /**
     *
     * @param {object} authenticationType
     * @param {boolean} authenticationType.faceid optional
     * @param {boolean} authenticationType.fingerid optional
     */
    allowAuthentication(authenticationType) {
        this.authenticate = authenticationType;
        return this;
    }
    /**
     *
     * @param {object} simulators
     * @param simulators.cgm
     * @param simulators.pump
     */
    addSimulators(simulators) {
        this.simulators = simulators;
        return this;
    }
    /**
     *
     * @param {object} cgmData
     *
     * @param {object} cgmData.model
     * @param {atring} cgmData.model.name
     * @param {array} cgmData.model.bgValues
     *
     * @param {object} cgmData.frequency
     * @param {boolean} cgmData.frequency.seconds
     * @param {boolean} cgmData.frequency.minutes
     *
     * @param {object} cgmData.history
     * @param {string} cgmData.history.name
     * @param {number} cgmData.history.backfillHours
     */
    addCGMData(cgmData) {
        this.cgmData = cgmData;
        return this;
    }
    async _setupCGMData() {
        let cgmScreen = await this.openCGMScreen();
        await cgmScreen.Apply(this.cgmData);
    }
    async _loadDeviceScenariosFromDisk(deviceId) {
        const _loadDeviceScenariosFromDiskShellScript = exec(`${__dirname}/../scripts/load_scenarios.sh ${deviceId}`);
        _loadDeviceScenariosFromDiskShellScript.stdout.on('data', () => {
            return null;
        });
        _loadDeviceScenariosFromDiskShellScript.stderr.on('data', (data) => {
            throw Error(data);
        });
    }
    async _loadScenario(scenarioName) {
        await device.shake();
        await expect(match.accessible.TextLabel(scenarioName)).toExist();
        await match.accessible.TextLabel(scenarioName).tap();
        await match.accessible.ButtonBarButton('Load').tap();
    }
    async _setStartScreen(start) {
        if (start != screenName.settings && this.settingsOpen) {
            await this.settingsScreen.Close();
        }
        switch (start) {
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
    _filterSettings(values, types) {
        const filtered = values;
        if (types) {
            for (const type of types) {
                delete filtered[type];
            }
        }
        return filtered;
    }
    async loadTherapySettings() {
        await device.shake();
        await match.accessible.TextLabel('Mock Therapy Settings').tap();
    }
    async prepare() {
        if (!this.language) {
            throw 'language is required!';
        }
        if (!this.screenDefaults) {
            throw 'screenDefaults is required!';
        }
        if (!this.startScreen) {
            if (this.settingsToApply || this.simulators) {
                this.startScreen = screenName.home;
            }
        }
        this.homeScreen = new HomeScreen(this.language, this.screenDefaults);

        var loopAppPermissions = { notifications: 'YES', health: 'YES' };

        if (this.authenticate) {
            if (this.authenticate.fingerid) {
                loopAppPermissions.fingerid = 'YES';
            } else {
                loopAppPermissions.faceid = 'YES';
            }
        }

        await device.launchApp({
            newInstance: true,
            permissions: loopAppPermissions,
        });

        await device.setBiometricEnrollment(this.authenticate);

        if (this.therapySettings) {
            await this.loadTherapySettings();
        }

        if (this.scenario) {
            await this._loadDeviceScenariosFromDisk(device.id);
            await this._loadScenario(this.scenario);
            if (this.settingsToApply) {
                this.settingsToApply = this._filterSettings(this.settingsToApply, [settingType.CGMSimulatorSettings, settingType.AddCGMSimulator, settingType.AddPumpSimulator]);
            }
        }
        var cgmAdded = false;
        if (this.settingsToApply) {
            this.settingsScreen = await this.OpenSettingsScreen();
            if (this.filter) {
                this.settingsToApply = this._filterSettings(this.settingsToApply, this.filter)
            }
            await this.settingsScreen.Apply(this.settingsToApply);
        } else if (this.simulators) {
            if (this.simulators.cgm) {
                await this.addCGM();
                cgmAdded = true;
            }
            if (this.simulators.pump) {
                await this.addUnconfiguredPump();
            }
        }
        if (this.cgmData) {
            if (!cgmAdded) {
                await this.addCGM();
            }
            await this._setupCGMData();
        }
        if (this.startScreen) {
            await this._setStartScreen(this.startScreen);
        }
    }
    async advanceScenario(cycles) {
        await device.shake();
        await expect(match.accessible.TextLabel(this.scenario)).toExist();
        await match.accessible.TextLabel(this.scenario).swipe('left');
        await match.accessible.SwipeButton('Advance ⏭').tap();
        await match.UITextField().typeText(cycles);
        await match.accessible.Button(this.language.general.OK).tap();
    }
    /**
     * @summary will load the mocked therapy settings
     */
    async addConfiguredPump() {
        await this.addUnconfiguredPump();
        await this.loadTherapySettings();
    }
    async addUnconfiguredPump() {
        await this.homeScreen.HeaderSection().Devices().AddPump();
    }
    async addCGM() {
        await this.homeScreen.HeaderSection().Devices().AddCGM();
    }
    async addConfiguredCGM() {
        await this.addCGM();
        let cgmScreen = await this.openCGMScreen();
        await cgmScreen.Apply(this.cgmData);
    }
    async openPumpScreen() {
        var screen = await this.homeScreen.HeaderSection().Devices().OpenPumpScreen();
        return screen;
    }
    async openCGMScreen() {
        var screen = await this.homeScreen.HeaderSection().Devices().OpenCGMScreen();
        return screen;
    }
    async OpenSettingsScreen() {
        this.settingsOpen = true;
        return this.homeScreen.OpenSettingsScreen();
    }
    async OpenTherapySettingsScreen() {
        var settings = await this.OpenSettingsScreen();
        return settings.OpenTherapySettings();
    }
    async OpenCarbEntryScreen() {
        return this.homeScreen.OpenCarbEntryScreen();
    }
    async OpenBolusScreen() {
        return this.homeScreen.OpenBolusScreen();
    }
    async OpenBolusScreen() {
        return this.homeScreen.OpenBolusScreen();
    }
    async OpenCustomPresetScreen() {
        return this.homeScreen.OpenCustomPresetScreen();
    }
    async OpenHomeScreen() {
        return this.homeScreen;
    }
}

module.exports = {
    Test
};
