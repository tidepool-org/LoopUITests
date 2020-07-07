const { HomeScreen } = require('./homeScreen');
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
        await expect(match.accessible.Label(scenarioName)).toExist();
        await match.accessible.Label(scenarioName).tap();
        await match.accessible.ButtonBarButton('Load').tap();
    }
    async _setStartScreen(start) {
        switch (start) {
            case screenName.settings:
                break;
            case screenName.home:
                await this.settingsScreen.Close();
                break;
            case screenName.bolus:
                await this.settingsScreen.Close();
                await this.OpenBolusScreen();
                break;
            case screenName.carbEntry:
                await this.settingsScreen.Close();
                await this.OpenCarbEntryScreen();
                break;
            default:
                await this.settingsScreen.Close();
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

        this.settingsScreen = await this.OpenSettingsScreen();

        if (this.settingsToApply) {
            await this.OpenSettingsScreen();
            if (this.filter) {
                this.settingsToApply = this._filterSettings(this.settingsToApply, this.filter)
            }
            await this.settingsScreen.Apply(this.settingsToApply);
        } else if (this.simulators) {
            await this.OpenSettingsScreen();
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
        await expect(match.accessible.Label(this.scenario)).toExist();
        await match.accessible.Label(this.scenario).swipe('left');
        await match.accessible.SwipeButton('Advance ⏭').tap();
        await match.UITextField().typeText(cycles);
        await match.accessible.Button(this.language.general.OK).tap();
    }

    async OpenSettingsScreen() {
        return this.homeScreen.OpenSettingsScreen();
    }

    async OpenCarbEntryScreen() {
        return this.homeScreen.OpenCarbEntryScreen();
    }

    async OpenBolusScreen() {
        return this.homeScreen.OpenBolusScreen();
    }
}

module.exports = {
    Test
};
