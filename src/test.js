const { HomeScreen } = require('./home/index');
const exec = require('child_process').exec;
const match = require('./match');
const { screenName, settingType } = require('./properties');

class Test {
    withLanguage(language) {
        this.language = language;
        return this;
    }
    withLimits(limits) {
        this.limits = limits;
        return this;
    }
    withScreenDefaults(screenDefaults) {
        this.screenDefaults = screenDefaults;
        return this;
    }
    withScenario(scenario) {
        this.scenario = scenario;
        return this;
    }
    withStartScreen(startScreen) {
        this.startScreen = startScreen;
        return this;
    }
    withSettingsToApply(settingsToApply) {
        this.settingsToApply = settingsToApply;
        return this;
    }
    withSettingDefault(settingDefault) {
        this.settingDefault = settingDefault;
        return this;
    }
    withSettingsFilter(filter) {
        this.filter = filter;
        return this;
    }
    /**
     *
     * @param {object} simulators
     * @param simulators.cgm
     * @param simulators.pump
     */
    withSimulators(simulators) {
        this.simulators = simulators;
        return this;
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

        await device.launchApp({
            newInstance: true,
            permissions: { notifications: 'YES', health: 'YES' },
        });

        if (this.scenario) {
            await _loadDeviceScenariosFromDisk(device.deviceId);
            await _loadScenario(this.scenario);
            if (this.settingsToApply) {
                this.settingsToApply = this._filterSettings(this.settingsToApply, [settingType.CGMSimulatorSettings, settingType.AddCGMSimulator, settingType.AddPumpSimulator]);
            }
        }

        if (this.settingsToApply) {
            this.settingsScreen = await this.OpenSettingsScreen();
            if (this.filter) {
                this.settingsToApply = this._filterSettings(this.settingsToApply, this.filter)
            }
            await this.settingsScreen.Apply(this.settingsToApply);
        } else if (this.simulators) {
            this.settingsScreen = await this.OpenSettingsScreen();
            if (this.simulators.cgm) {
                await this.settingsScreen.AddCGMSimulator();
            }
            if (this.simulators.pump) {
                await this.settingsScreen.AddPumpSimulator();
            }
        }
        if (this.startScreen) {
            await this._setStartScreen(this.startScreen);
        }
    }

    async removeData() {
        var screen = await this.OpenSettingsScreen();
        await screen.RemoveCGMData();
        await screen.RemovePumpData();
        await screen.Close();
    }

    async advanceScenario(cycles) {
        await device.shake();
        await expect(match.accessible.TextLabel(this.scenario)).toExist();
        await match.accessible.TextLabel(this.scenario).swipe('left');
        await match.accessible.SwipeButton('Advance ⏭').tap();
        await match.UITextField().typeText(cycles);
        await match.accessible.Button(this.language.general.OK).tap();
    }

    async OpenSettingsScreen() {
        this.settingsOpen = true;
        return this.homeScreen.OpenSettingsScreen();
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
